import { useRef, useEffect } from "react";

function EndModal({
  endStatus,
  score,
  cardsLimit,
  setCardsLimit,
  setScore,
  setSelectedPokemons,
  setGameEnd,
}) {
  const dialogRef = useRef(null);

  const handleClick = (limit) => {
    setCardsLimit(limit);
    setScore(0);
    setSelectedPokemons([]);
    setGameEnd(false);
    dialogRef.current.close();
  };

  const statusData = {};

  if (endStatus === "win") {
    statusData.title = "You Won !";
  } else if (endStatus === "lose") {
    statusData.title = "You Lose !";
  }

  statusData.score = `${score} / ${cardsLimit}`;

  useEffect(() => {
    if (dialogRef.current) dialogRef.current.showModal();
  }, []);

  return (
    <dialog ref={dialogRef} className="p-0 bg-transparent">
      <div className="flex flex-col justify-center items-center gap-3 p-8 rounded text-white backdrop-blur bg-black/15">
        <div className="flex flex-col items-center">
          <h3 className="text-3xl">{statusData.title}</h3>
          <h3 className="text-2xl">{statusData.score}</h3>
        </div>
        <p className="text-lg">Select a mode to play again:</p>
        <div className="flex gap-4 text-xl">
          <button
            className="border rounded py-1 px-3 hover:scale-105 transition"
            onFocus={(e) => e.target.blur()}
            onClick={() => handleClick(5)}
          >
            Rookie
          </button>
          <button
            className="border rounded py-1 px-3 hover:scale-105 transition"
            onClick={() => handleClick(10)}
          >
            Veteran
          </button>
        </div>
        <a
          href="https://github.com/shonebinu/pokematch"
          target="_blank"
          className="text-blue-300 underline"
        >
          Github Repo
        </a>
      </div>
    </dialog>
  );
}

export default EndModal;
