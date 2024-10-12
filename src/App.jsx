import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Scoreboard from './components/Scoreboard';
import GameBoard from './components/GameBoard';
import GameEndScreen from './components/GameEndScreen';
import premierLeaguePlayers from './premierLeaguePlayers.json';
import './App.css';

function shufflePlayers(players) {
  return [...players].sort(() => Math.random() - 0.5);
}

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedPlayers, setClickedPlayers] = useState(new Set());
  const [gameStatus, setGameStatus] = useState('playing');
  const [difficulty, setDifficulty] = useState('easy');
  const [players, setPlayers] = useState(() => getPlayersByDifficulty());

  function getPlayersByDifficulty() {
    const allPlayers = shufflePlayers(premierLeaguePlayers);
    switch(difficulty) {
      case 'easy': return allPlayers.slice(0, 4);
      case 'medium': return allPlayers.slice(0, 8);
      case 'hard': return allPlayers;
      default: return allPlayers.slice(0, 4);
    }
  }

  const getWinScore = () => {
    switch(difficulty) {
      case 'easy': return 4;
      case 'medium': return 8;
      case 'hard': return 14;
      default: return 4;
    }
  };

  const handleCardClick = (playerId) => {
    if (gameStatus !== 'playing') return;

    if (clickedPlayers.has(playerId)) {
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
      setGameStatus('lost');
    } else {
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      setClickedPlayers(new Set(clickedPlayers).add(playerId));
      
      if (newScore === getWinScore()) {
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        setGameStatus('won');
      } else {
        setPlayers(shufflePlayers(players));
      }
    }
  };

  const resetGame = () => {
    setCurrentScore(0);
    setClickedPlayers(new Set());
    setGameStatus('playing');
    setPlayers(getPlayersByDifficulty());
  };

  useEffect(() => {
    resetGame();
  }, [difficulty]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 py-2 sm:py-4 md:py-8 flex flex-col">
      <div className="container mx-auto px-2 sm:px-4 max-w-4xl flex-grow flex flex-col">
        <Header difficulty={difficulty} setDifficulty={setDifficulty} />
        <Scoreboard currentScore={currentScore} bestScore={bestScore} />
        <div className="flex-grow overflow-hidden">
          <GameBoard 
            players={players}
            onCardClick={handleCardClick}
            difficulty={difficulty}
          />
        </div>
        <AnimatePresence>
          {gameStatus !== 'playing' && (
            <GameEndScreen 
              gameStatus={gameStatus}
              currentScore={currentScore}
              bestScore={bestScore}
              onPlayAgain={resetGame}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;