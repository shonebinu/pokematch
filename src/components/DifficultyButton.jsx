function DifficultyButton({ difficulty, onClick, cardCount }) {
  return (
    <button
      className="border rounded py-1 px-3 hover:scale-105 transition"
      onClick={() => onClick(cardCount)}
    >
      {difficulty}
    </button>
  );
}

export default DifficultyButton;
