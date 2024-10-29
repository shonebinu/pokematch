import ReactCardFlip from "react-card-flip";
import PokeballImage from "../assets/pokeball.png";

function PokemonItem({ pokemon, flip, setFlip }) {
  return (
    <ReactCardFlip
      isFlipped={flip}
      containerClassName="backdrop-blur bg-black/15 flex-1 p-2 aspect-[5/6] rounded cursor-pointer
            transform hover:scale-105 hover:-rotate-1 transition-transform duration-500 ease-in-out shadow-lg"
    >
      <div
        className="flex flex-col justify-between"
        onClick={() => {
          setFlip(!flip);
        }}
      >
        <img src={pokemon.image} alt={pokemon.name} className="w-full" />
        <p className="font-bold text-xl pb-2 text-center font-cardsans">
          {pokemon.name}
        </p>
      </div>

      <div className="flex justify-center items-center h-full">
        <img src={PokeballImage} alt="Pokeball image" />
      </div>
    </ReactCardFlip>
  );
}

export default PokemonItem;
