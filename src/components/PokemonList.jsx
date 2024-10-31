import PokemonItem from "./PokemonItem";

function PokemonList({ pokemons, flip, handleFlip, setLoadedImages }) {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full md:w-2/3">
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
