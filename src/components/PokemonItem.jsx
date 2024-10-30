import PokeballImage from "../assets/pokeball.png";

function PokemonItem({ pokemon, flip, handleFlip }) {
  return (
    <div
      className="backdrop-blur bg-black/15 flex-1 p-2 aspect-[5/6] rounded cursor-pointer
            transform hover:scale-105 hover:-rotate-1 transition-transform duration-500 ease-in-out shadow-lg"
    >
      {!flip && (
        <div
          className="flex flex-col justify-between w-full h-full"
          onClick={() => {
            const pokemonCry = new Audio(pokemon.cry);
            pokemonCry.volume = 0.02;
            pokemonCry.play();
            handleFlip(pokemon.name);
          }}
        >
          <img src={pokemon.image} alt={pokemon.name} className="w-full" />
          <p className="font-bold text-xl pb-2 text-center font-cardsans">
            {pokemon.name}
          </p>
        </div>
      )}

      {flip && (
        <div className="flex justify-center items-center h-full">
          <img src={PokeballImage} alt="Pokeball image" />
        </div>
      )}
    </div>
  );
}

export default PokemonItem;
