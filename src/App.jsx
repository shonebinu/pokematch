import { useState, useEffect } from "react";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import { getRandomPokemonsUpToLimit, randomIntFromInterval } from "./utils";

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
    console.log(detailedPokemonData);
    setPokemonData(detailedPokemonData);
  } catch (error) {
    setPokemonData(`Error: ${error.message}`);
  }
};

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const cardLimit = 5;
  const pokemonsCountLimit = cardLimit * 4; // in 3 pokes, skips 2 and keeps 1 to avoid upgraded poke + 1 extra

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
      <Header score={3} highScore={10} cardsCount={5} />
      <PokemonList
        pokemons={getRandomPokemonsUpToLimit(pokemonData, cardLimit)}
      />
    </main>
  );
}

export default App;
