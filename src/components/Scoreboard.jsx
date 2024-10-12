import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from './Particles';

function Scoreboard({ currentScore, bestScore }) {
  return (
    <div className="flex justify-between items-center mb-4 sm:mb-8 bg-white rounded-lg shadow-lg p-3 sm:p-6 relative overflow-hidden">
      <div className="text-center relative">
        <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-1 sm:mb-2">Current Score</h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScore}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="text-2xl sm:text-4xl font-extrabold text-blue-600"
          >
            {currentScore}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          {currentScore > 0 && <Particles key={currentScore} />}
        </AnimatePresence>
      </div>
      <div className="text-center relative">
        <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-1 sm:mb-2">Best Score</h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={bestScore}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="text-2xl sm:text-4xl font-extrabold text-green-600"
          >
            {bestScore}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          {bestScore > 0 && <Particles key={bestScore} color="#10B981" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Scoreboard;