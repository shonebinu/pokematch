import { useState, useEffect } from "react";
import GameDialog from "./GameDialog";
import DifficultySelector from "./DifficultySelector";
import GitHubLink from "./GitHubLink";

function EndModal({
  score,
  cardsLimit,
  setCardsLimit,
  setScore,
  setSelectedPokemons,
  setGameEnd,
}) {
  const [showDialog, setShowDialog] = useState(true);

  const handleDifficultySelect = (limit) => {
    setCardsLimit({ count: limit });
    setScore(0);
    setSelectedPokemons([]);
    setGameEnd(false);
    setShowDialog(false); // Close the dialog after selecting a difficulty
  };

  const statusData = {
    title: score === cardsLimit ? "You Won!" : "You Lost!",
    score: `${score} / ${cardsLimit}`,
  };

  useEffect(() => {
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
    showDialog && (
      <GameDialog>
        <div className="flex flex-col items-center">
          <h3 className="text-3xl">{statusData.title}</h3>
          <h3 className="text-2xl">{statusData.score}</h3>
        </div>
        <p className="text-lg">Select a mode to play again:</p>
        <DifficultySelector onSelectDifficulty={handleDifficultySelect} />
        <GitHubLink />
      </GameDialog>
    )
  );
}

export default EndModal;
