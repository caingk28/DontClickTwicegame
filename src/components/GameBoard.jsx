import React, { useState } from 'react';
import Card from './Card';

function GameBoard({ players, onCardClick, difficulty }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleCardClick = (playerId) => {
    if (isFlipping) return;
    setIsFlipping(true);
    setIsFlipped(true);
    onCardClick(playerId);

    // Reset the flipped state after a delay
    setTimeout(() => {
      setIsFlipped(false);
      setIsFlipping(false);
    }, 1000);
  };

  const getGridClassName = () => {
    const baseClass = "grid gap-2 sm:gap-4";
    switch(difficulty) {
      case 'easy':
        return `${baseClass} grid-cols-2 sm:grid-cols-2`;
      case 'medium':
        return `${baseClass} grid-cols-3 sm:grid-cols-4`;
      case 'hard':
        return `${baseClass} grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7`;
      default:
        return `${baseClass} grid-cols-2 sm:grid-cols-2`;
    }
  };

  if (!players || players.length === 0) {
    return <div>No players available</div>;
  }

  return (
    <div className={getGridClassName()}>
      {players.map((player) => (
        <Card 
          key={player.id} 
          player={player} 
          onClick={() => handleCardClick(player.id)}
          isFlipped={isFlipped}
          difficulty={difficulty}
        />
      ))}
    </div>
  );
}

export default GameBoard;