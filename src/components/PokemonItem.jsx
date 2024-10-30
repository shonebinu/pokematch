import PokeballImage from "../assets/pokeball.png";

function PokemonItem({ pokemon, flip, handleFlip, setLoadedImages }) {
  const pokemonCry = new Audio(pokemon.cry);
  pokemonCry.volume = 0.02;
  return (
    <div
      className={`backdrop-blur bg-black/15 flex-1 p-2 rounded cursor-pointer
            transform hover:scale-105 hover:-rotate-1 transition-transform duration-500 ease-in-out shadow-lg ${
              flip ? "aspect-[5.2/6]" : ""
            }`}
      onClick={() => {
        if (!flip) {
          pokemonCry.play();
          handleFlip(pokemon.name);
        }
      }}
    >
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className={`w-full ${flip ? "invisible absolute" : ""}`}
        onLoad={() => pokemon.image && setLoadedImages((count) => count + 1)}
      />
      {!flip && (
        <p className="font-bold text-xl pb-2 text-center font-cardsans">
          {pokemon.name}
        </p>
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
