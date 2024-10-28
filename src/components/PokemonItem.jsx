function PokemonItem({ pokemon }) {
  return (
    <div
      className="backdrop-blur bg-black/15 flex-1 p-2 flex flex-col gap-2 justify-between items-center aspect-[5/6] rounded cursor-pointer
            transform hover:scale-105 hover:-rotate-1 transition-transform duration-500 ease-in-out shadow-lg"
    >
      <img src={pokemon.image} alt={pokemon.name} className="w-full" />
      <p className="font-bold text-xl pb-2 text-center font-cardsans">
        {pokemon.name}
      </p>
    </div>
  );
}

export default PokemonItem;
