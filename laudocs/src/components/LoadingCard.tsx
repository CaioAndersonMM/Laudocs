import React from 'react';

const LoadingCard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-2 mb-3 animate-pulse">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center ml-2">
          <div className="h-8 w-8 bg-gray-300 rounded-full mr-2"></div>
          <div className="h-4 bg-gray-300 rounded w-72 mb-1"></div>
        </div>
        <div className="h-6 w-10 bg-gray-300 rounded"></div>
      </div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center ml-2">
          <div className="h-8 w-8 bg-gray-300 rounded-full mr-2"></div>
          <div className="h-4 bg-gray-300 rounded w-52"></div>
        </div>
        <div className="h-6 w-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default LoadingCard;
