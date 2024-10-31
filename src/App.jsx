import { useState, useEffect } from "react";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import { shufflePokemonData, randomIntFromInterval } from "./utils";
import StartModal from "./components/StartModal";
import EndModal from "./components/EndModal";
import { fetchPokemonData } from "./pokemonApi";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [cardsLimit, setCardsLimit] = useState({ count: 0 });
  const [flip, setFlip] = useState(true);
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [score, setScore] = useState(0);
  const [loadedImages, setLoadedImages] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);

  const highScore = localStorage.getItem("highScore") ?? 0;
  if (highScore < score && score <= cardsLimit.count) {
    localStorage.setItem("highScore", score);
  }

  const handleFlip = (pokemonName) => {
    if (!selectedPokemons.includes(pokemonName)) {
      const newScore = score + 1;
      if (newScore <= cardsLimit.count) {
        setFlip(true);
        setSelectedPokemons([...selectedPokemons, pokemonName]);
        setPokemonData(shufflePokemonData(pokemonData));
        setScore(newScore);
        setTimeout(() => setFlip(false), 500);

        if (newScore === cardsLimit.count) setGameEnd("win");
      }
    } else {
      setGameEnd("lose");
    }
  };

  useEffect(() => {
    if (loadedImages >= cardsLimit.count && cardsLimit.count !== 0)
      setFlip(false);
  }, [loadedImages, cardsLimit]);

  useEffect(() => {
    const pokemonsCountLimit = cardsLimit.count * 3; // in 3 pokes, skips 2 and keeps 1 to avoid upgraded poke
    let mounted = true;

    const loadPokemon = async () => {
      setPokemonData(new Array(cardsLimit.count).fill(""));
      setFlip(true);

      if (mounted && cardsLimit.count > 0) {
        try {
          const data = await fetchPokemonData(
            randomIntFromInterval(0, 1000),
            pokemonsCountLimit
          );

          if (mounted) {
            setPokemonData(data);
          }
        } catch (error) {
          console.error("Failed to load Pokemon: ", error);
        }
      }
    };

    loadPokemon();

    return () => {
      mounted = false;
    };
  }, [cardsLimit]);

  return (
    <main className="flex flex-col items-center gap-6 p-4">
      <Header
        score={score}
        highScore={highScore}
        cardsCount={cardsLimit.count}
      />
      <PokemonList
        pokemons={pokemonData.slice(0, cardsLimit.count)}
        flip={flip}
        handleFlip={handleFlip}
        setLoadedImages={setLoadedImages}
      />
      <StartModal setCardsLimit={setCardsLimit} />
      {gameEnd && (
        <EndModal
          endStatus={gameEnd}
          score={score}
          cardsLimit={cardsLimit.count}
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
