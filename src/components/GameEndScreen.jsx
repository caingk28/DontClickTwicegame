import React from 'react';
import { motion } from 'framer-motion';

const GameEndScreen = ({ gameStatus, currentScore, bestScore, onPlayAgain }) => {
  const isWin = gameStatus === 'won';

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-lg shadow-lg p-4 sm:p-8 max-w-sm sm:max-w-md w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className={`text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 ${isWin ? 'text-green-600' : 'text-red-600'}`}
          variants={itemVariants}
        >
          {isWin ? 'Congratulations! You Won!' : 'Game Over!'}
        </motion.h2>
        <motion.p className="text-lg sm:text-xl mb-2 sm:mb-4" variants={itemVariants}>
          Your Score: {currentScore}
        </motion.p>
        <motion.p className="text-lg sm:text-xl mb-4 sm:mb-6" variants={itemVariants}>
          Best Score: {bestScore}
        </motion.p>
        <motion.button 
          onClick={onPlayAgain}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Play Again
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default GameEndScreen;