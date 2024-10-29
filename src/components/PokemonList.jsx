import { useState, useEffect } from "react";
import PokemonItem from "./PokemonItem";
import { getRandomPokemonsUpToLimit, randomIntFromInterval } from "../utils";

function PokemonList({ cardsCount }) {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchPokemonData = async (pokemonsOffset = 0, pokemonsLimit = 30) => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${pokemonsOffset}&limit=${pokemonsLimit}`
        );
        const data = await response.json();
        const pokemons = data?.results;

        const detailedPokemonData = await Promise.all(
          pokemons
            .filter((_, index) => index % 3 === 0) // Skip every 3 element to skip upgraded pokemons
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

    if (mounted) fetchPokemonData(randomIntFromInterval(0, 1000), 30);

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="flex gap-4 w-2/3">
      {getRandomPokemonsUpToLimit(pokemonData, cardsCount).map((pokemon) => (
        <PokemonItem key={pokemon.image} pokemon={pokemon} />
      ))}
    </section>
  );
}

export default PokemonList;
