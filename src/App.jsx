import { useState, useEffect } from "react";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import { shufflePokemonData, randomIntFromInterval } from "./utils";
import StartModal from "./components/StartModal";
import EndModal from "./components/EndModal";

const fetchPokemonData = async (
  pokemonsOffset = 0,
  pokemonsLimit = 30,
  setPokemonData
) => {
  try {
    console.log("fetch");
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${pokemonsOffset}&limit=${pokemonsLimit}`
    );
    const data = await response.json();
    const pokemons = data?.results;
    const detailedPokemonData = await Promise.all(
      pokemons
        .filter((_, index) => index % 3 === 0) // skip 2 in b/w to avoid upgraded pokemons
        .map(async (poke) => {
          const pokeResponse = await fetch(poke.url);
          const pokeData = await pokeResponse.json();
          return {
            name: poke.name,
            image: pokeData?.sprites?.front_default,
            cry: pokeData?.cries?.latest,
          };
        })
    );
    setPokemonData(detailedPokemonData);
  } catch (error) {
    setPokemonData(`Error: ${error.message}`);
  }
};

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [cardsLimit, setCardsLimit] = useState(0);

  const [score, setScore] = useState(0);
  const [flip, setFlip] = useState(true);
  const [selectedPokemons, setSelectedPokemons] = useState([]);

  const [loadedImages, setLoadedImages] = useState(0);

  const [gameEnd, setGameEnd] = useState(false);

  let highScore = localStorage.getItem("highScore") ?? 0;
  if (highScore < score && score <= cardsLimit) {
    highScore = score;
    localStorage.setItem("highScore", score);
  }

  const handleFlip = (pokemonName) => {
    if (!selectedPokemons.includes(pokemonName)) {
      const newScore = score + 1;
      if (newScore <= cardsLimit) {
        setFlip(true);
        setSelectedPokemons([...selectedPokemons, pokemonName]);
        setPokemonData(shufflePokemonData(pokemonData));
        setScore(newScore);
        setTimeout(() => setFlip(false), 700);

        if (newScore === cardsLimit) setGameEnd("win");
      }
    } else {
      setGameEnd("lose");
    }
  };

  useEffect(() => {
    if (loadedImages >= cardsLimit && cardsLimit !== 0) setFlip(false);
  }, [loadedImages, cardsLimit]);

  useEffect(() => {
    const pokemonsCountLimit = cardsLimit * 3; // in 3 pokes, skips 2 and keeps 1 to avoid upgraded poke

    let mounted = true;

    setPokemonData(new Array(cardsLimit).fill(""));
    setFlip(true);

    if (mounted && cardsLimit > 0) {
      fetchPokemonData(
        randomIntFromInterval(0, 1000),
        pokemonsCountLimit,
        setPokemonData
      );
    }

    return () => {
      mounted = false;
    };
  }, [cardsLimit]);

  return (
    <main className="flex flex-col items-center gap-6 p-4">
      <Header score={score} highScore={highScore} cardsCount={cardsLimit} />
      <PokemonList
        pokemons={pokemonData.slice(0, cardsLimit)}
        flip={flip}
        handleFlip={handleFlip}
        setLoadedImages={setLoadedImages}
      />
      <StartModal setCardsLimit={setCardsLimit} />
      {gameEnd && (
        <EndModal
          endStatus={gameEnd}
          score={score}
          cardsLimit={cardsLimit}
          setCardsLimit={setCardsLimit}
          setScore={setScore}
          setSelectedPokemons={setSelectedPokemons}
          setGameEnd={setGameEnd}
        />
      )}
    </main>
  );
}

export default App;
