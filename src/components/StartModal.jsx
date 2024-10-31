import { useState } from "react";
import GameDialog from "./GameDialog";
import DifficultySelector from "./DifficultySelector";
import GitHubLink from "./GitHubLink";
import PokeballImage from "../assets/pokeball.png";

function StartModal({ setCardsLimit }) {
  const [showDialog, setShowDialog] = useState(true);

  const handleDifficultySelect = (limit) => {
    setCardsLimit({ count: limit });
    setShowDialog(false);
  };

  return (
    showDialog && (
      <GameDialog>
        <h2 className="text-2xl text-center">
          Welcome to
          <span className="text-3xl flex items-center">
            <img src={PokeballImage} alt="Pokeball" />
            <span className="text-yellow-300 pl-1">Poké</span>Match
          </span>
        </h2>
        <p className="text-lg">Select a difficulty mode:</p>
        <DifficultySelector onSelectDifficulty={handleDifficultySelect} />
        <GitHubLink />
      </GameDialog>
    )
  );
}

export default StartModal;
