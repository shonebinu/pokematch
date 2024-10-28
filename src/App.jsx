import { useEffect, useState } from "react";
import PokemonList from "./components/PokemonList";
import { getRandomPokemonsUpToLimit, randomIntFromInterval } from "./utils";
import PokeballImage from "./assets/pokeball.png";

function App() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchPokemonData = async (offset = 0, limit = 30) => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
        );
        const data = await response.json();
        const pokemons = data?.results;

        const detailedPokemonData = [];

        for (let i = 0; i < pokemons.length; i += 3) {
          // Skipping 3 elements to skip upgraded pokemons
          const poke = pokemons[i];

          const pokeResponse = await fetch(poke.url);
          const pokeData = await pokeResponse.json();

          const pokeImage = pokeData?.sprites?.front_default;

          detailedPokemonData.push({ name: poke.name, image: pokeImage });
        }

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
    <main className="flex flex-col items-center gap-6 p-4">
      <aside className="flex flex-col gap-5 items-center">
        <div className="flex items-center gap-2">
          <img src={PokeballImage} alt="Pokeball picture" />
          <h1 className="font-bold text-4xl">
            <span className="text-yellow-300">Poké</span>
            Match
          </h1>
        </div>

        <div className="flex gap-5 backdrop-blur rounded px-5">
          <p className="text-3xl">SCORE: 5</p>
          <p className="text-3xl">HIGH SCORE: 7</p>
        </div>

        <div>
          <p className="text-4xl backdrop-blur rounded px-3">0 / 5</p>
        </div>
      </aside>

      <PokemonList pokemonList={getRandomPokemonsUpToLimit(pokemonData, 5)} />
    </main>
  );
}

export default App;
