import { useRef, useEffect } from "react";

function StartModal({ setCardsLimit }) {
  const dialogRef = useRef(null);

  const handleClick = (limit) => {
    setCardsLimit(limit);
    dialogRef.current.close();
  };

  useEffect(() => {
    if (dialogRef.current) dialogRef.current.showModal();
  }, []);

  return (
    <dialog ref={dialogRef} className="p-0 bg-transparent">
      <div className="flex flex-col justify-center items-center gap-3 p-8 rounded text-white backdrop-blur bg-black/15">
        <h2 className="text-2xl">
          Welcome to <span className="underline">PokéMatch</span>
        </h2>
        <p className="text-lg">Select a difficulty level:</p>
        <div className="flex gap-4 text-xl">
          <button
            className="border rounded py-1 px-3"
            onClick={() => handleClick(5)}
            onFocus={(e) => e.target.blur()}
          >
            Rookie
          </button>
          <button
            className="border rounded py-1 px-3"
            onClick={() => handleClick(10)}
          >
            Veteran
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default StartModal;
