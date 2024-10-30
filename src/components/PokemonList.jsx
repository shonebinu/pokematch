import PokemonItem from "./PokemonItem";

function PokemonList({ pokemons, flip, handleFlip }) {
  return (
    <section className="grid grid-cols-5 gap-4 w-2/3">
      {pokemons.map((pokemon) => (
        <PokemonItem
          key={pokemon.image}
          pokemon={pokemon}
          flip={flip}
          handleFlip={handleFlip}
        />
      ))}
    </section>
  );
}

export default PokemonList;
