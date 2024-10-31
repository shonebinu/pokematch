import DifficultyButton from "./DifficultyButton";

function DifficultySelector({ onSelectDifficulty }) {
  const difficulties = [
    { name: "Rookie", cards: 5 },
    { name: "Veteran", cards: 10 },
    { name: "Expert", cards: 15 },
  ];

  return (
    <div className="flex gap-4 text-xl flex-wrap justify-center">
      {difficulties.map((diff) => (
        <DifficultyButton
          key={diff.name}
          difficulty={diff.name}
          cardCount={diff.cards}
          onClick={onSelectDifficulty}
        />
      ))}
    </div>
  );
}

export default DifficultySelector;
