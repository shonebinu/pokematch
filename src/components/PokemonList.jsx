import { useState } from "react";
import PokemonItem from "./PokemonItem";

function PokemonList({ pokemons }) {
  const [flip, setFlip] = useState(false);

  return (
    <section className="flex gap-4 w-2/3">
      {pokemons.map((pokemon) => (
        <PokemonItem
          key={pokemon.image}
          pokemon={pokemon}
          flip={flip}
          setFlip={setFlip}
        />
      ))}
    </section>
  );
}

export default PokemonList;
