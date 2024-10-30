import { useState, useEffect } from "react";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import { shufflePokemonData, randomIntFromInterval } from "./utils";
import StartModal from "./components/StartModal";

const fetchPokemonData = async (
  pokemonsOffset = 0,
  pokemonsLimit = 30,
  setPokemonData
) => {
  try {
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
  const [flip, setFlip] = useState(false);
  const [selectedPokemons, setSelectedPokemons] = useState([]);

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
      } else {
        setGameEnd("win");
      }
    } else {
      setGameEnd("lose");
    }
  };

  useEffect(() => {
    const pokemonsCountLimit = cardsLimit * 4; // in 3 pokes, skips 2 and keeps 1 to avoid upgraded poke + 1

    let mounted = true;

    if (mounted) {
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
      />
      <StartModal setCardsLimit={setCardsLimit} />
    </main>
  );
}

export default App;
