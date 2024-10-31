import { useRef, useEffect } from "react";
import PokeballImage from "../assets/pokeball.png";

function StartModal({ setCardsLimit }) {
  const dialogRef = useRef(null);

  const handleClick = (limit) => {
    setCardsLimit({ count: limit });
    dialogRef.current.close();
  };

  useEffect(() => {
    if (dialogRef.current) dialogRef.current.showModal();

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <dialog ref={dialogRef} className="p-0 bg-transparent">
      <div className="flex flex-col justify-center items-center gap-5 px-20 py-14 rounded text-white backdrop-blur bg-black/15 border">
        <h2 className="text-2xl text-center">
          Welcome to
          <span className="text-3xl flex items-center">
            <img src={PokeballImage} alt="Pokeball image" />
            <span className="text-yellow-300 pl-1">Poké</span>Match
          </span>
        </h2>
        <p className="text-lg">Select a difficulty mode:</p>
        <div className="flex gap-4 text-xl flex-wrap justify-center">
          <button
            className="border rounded py-1 px-3 hover:scale-105 transition"
            onClick={() => handleClick(5)}
            onFocus={(e) => e.target.blur()}
          >
            Rookie
          </button>
          <button
            className="border rounded py-1 px-3 hover:scale-105 transition"
            onClick={() => handleClick(10)}
          >
            Veteran
          </button>
          <button
            className="border rounded py-1 px-3 hover:scale-105 transition"
            onClick={() => handleClick(15)}
          >
            Expert
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

export default StartModal;
