import React from 'react';

function Header({ difficulty, setDifficulty }) {
  return (
    <header className="text-center py-3 sm:py-6 bg-gradient-to-r from-purple-800 to-purple-900 rounded-lg shadow-md mb-4 sm:mb-8">
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-white">Premier League Memory Game</h1>
      <div className="mb-2 sm:mb-4">
        <label htmlFor="difficulty" className="mr-2 text-purple-200">Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-1 sm:p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-100 text-purple-800"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="extraHard">Extra Hard</option>
        </select>
      </div>
    </header>
  );
}

export default Header;