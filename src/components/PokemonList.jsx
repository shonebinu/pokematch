import PokemonItem from "./PokemonItem";

function PokemonList({ pokemons, flip, handleFlip, setLoadedImages }) {
  return (
    <section className="grid grid-cols-5 gap-4 w-2/3">
      {pokemons.map((pokemon, i) => (
        <PokemonItem
          key={pokemon.image ?? i}
          pokemon={pokemon}
          flip={flip}
          handleFlip={handleFlip}
          setLoadedImages={setLoadedImages}
        />
      ))}
    </section>
  );
}

export default PokemonList;
