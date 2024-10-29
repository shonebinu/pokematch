import PokeballImage from "../assets/pokeball.png";

function Header({ score, highScore, cardsCount }) {
  return (
    <aside className="flex flex-col gap-5 items-center">
      <div className="flex items-center gap-2">
        <img src={PokeballImage} alt="Pokeball picture" />
        <h1 className="font-bold text-4xl">
          <span className="text-yellow-300">Poké</span>Match
        </h1>
      </div>

      <div className="backdrop-blur rounded px-5">
        <p className="text-3xl">
          HIGH SCORE: <span>{highScore}</span>
        </p>
      </div>

      <div>
        <p className="text-4xl backdrop-blur rounded px-3">
          {score} / {cardsCount}
        </p>
      </div>
    </aside>
  );
}

export default Header;
