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
      case 'hard': return allPlayers.slice(0, 14);
      case 'extraHard': return allPlayers.slice(0, 20);
      default: return allPlayers.slice(0, 4);
    }
  }

  const getWinScore = () => {
    switch(difficulty) {
      case 'easy': return 4;
      case 'medium': return 8;
      case 'hard': return 14;
      case 'extraHard': return 20;
      default: return 4;
    }
  };

  const handleCardClick = (playerId) => {
    if (gameStatus !== 'playing') return false;

    if (clickedPlayers.has(playerId)) {
      setGameStatus('lost');
      return false;
    }

    const newClickedPlayers = new Set(clickedPlayers).add(playerId);
    setClickedPlayers(newClickedPlayers);
    setCurrentScore(newClickedPlayers.size);

    if (newClickedPlayers.size > bestScore) {
      setBestScore(newClickedPlayers.size);
    }

    if (newClickedPlayers.size === getWinScore()) {
      setGameStatus('won');
    } else {
      setPlayers(shufflePlayers(players));
    }

    return true;
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
    <div className="App min-h-screen bg-purple-100 text-purple-900 p-4">
      <Header difficulty={difficulty} setDifficulty={setDifficulty} />
      <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      <GameBoard players={players} onCardClick={handleCardClick} difficulty={difficulty} />
      <AnimatePresence>
        {gameStatus !== 'playing' && (
          <GameEndScreen
            gameStatus={gameStatus}
            score={currentScore}
            onRestart={resetGame}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;