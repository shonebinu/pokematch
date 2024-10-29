import { useState, useEffect } from "react";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import { shufflePokemonData, randomIntFromInterval } from "./utils";

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
  const cardsLimit = 5;
  const pokemonsCountLimit = cardsLimit * 4; // in 3 pokes, skips 2 and keeps 1 to avoid upgraded poke + 1 extra

  const [score, setScore] = useState(0);
  const [flip, setFlip] = useState(false);
  const [selectedPokemons, setSelectedPokemons] = useState([]);

  const handleFlip = (pokemonName) => {
    if (!selectedPokemons.includes(pokemonName)) {
      setFlip(true);
      setScore(score + 1);
      setSelectedPokemons([...selectedPokemons, pokemonName]);
      setPokemonData(shufflePokemonData(pokemonData));
      setTimeout(() => setFlip(false), 500);
    }
  };

  useEffect(() => {
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
  }, [pokemonsCountLimit]);

  return (
    <main className="flex flex-col items-center gap-6 p-4">
      <Header score={score} highScore={10} cardsCount={cardsLimit} />
      <PokemonList
        pokemons={pokemonData.slice(0, cardsLimit)}
        flip={flip}
        handleFlip={handleFlip}
      />
    </main>
  );
}

export default App;
