import PokemonItem from "./PokemonItem";

function PokemonList({ pokemonList }) {
  return (
    <section className="flex gap-4 w-2/3">
      {pokemonList.map((pokemon) => (
        <PokemonItem key={pokemon.image} pokemon={pokemon} />
      ))}
    </section>
  );
}

export default PokemonList;
