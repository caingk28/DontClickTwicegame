import React from 'react';

function Card({ player, onClick, isFlipped, difficulty }) {
  const getCardClassName = () => {
    const baseClass = "bg-white rounded-lg overflow-hidden shadow-md cursor-pointer transition duration-300 ease-in-out hover:shadow-lg relative";
    switch(difficulty) {
      case 'easy':
        return `${baseClass} h-40 sm:h-48 md:h-64`;
      case 'medium':
        return `${baseClass} h-32 sm:h-40 md:h-48`;
      case 'hard':
        return `${baseClass} h-24 sm:h-32 md:h-36 lg:h-40`;
      default:
        return `${baseClass} h-40 sm:h-48 md:h-64`;
    }
  };

  const getImageClassName = () => {
    if (difficulty === 'hard') {
      return "w-full h-full object-cover";
    }
    return "w-3/4 h-3/4 object-contain mx-auto";
  };

  const getNameClassName = () => {
    switch(difficulty) {
      case 'easy':
        return "text-sm sm:text-base md:text-lg font-semibold text-center";
      case 'medium':
        return "text-xs sm:text-sm md:text-base font-semibold text-center";
      case 'hard':
        return "text-xs font-semibold text-center absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 py-1";
      default:
        return "text-sm sm:text-base md:text-lg font-semibold text-center";
    }
  };

  return (
    <div 
      onClick={onClick} 
      className={`${getCardClassName()} ${difficulty === 'hard' ? 'p-0' : 'p-2'} flex flex-col items-center justify-center`}
    >
      <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        <div className="absolute w-full h-full backface-hidden">
          <img 
            src={player.image} 
            alt={player.name} 
            className={getImageClassName()}
          />
          <p className={getNameClassName()}>{player.name}</p>
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-purple-700 flex items-center justify-center">
          <img 
            src="/images/pl-logo.png" 
            alt="Premier League Logo" 
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;