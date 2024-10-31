import { useRef, useEffect } from "react";

function GameDialog({ children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }

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
      <div className="flex flex-col justify-center items-center gap-5 px-10 py-14 rounded text-white backdrop-blur bg-black/15 border">
        {children}
      </div>
    </dialog>
  );
}

export default GameDialog;
