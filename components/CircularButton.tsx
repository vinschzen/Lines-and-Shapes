import React from 'react';

interface CircularButtonProps {
  symbol: React.ReactNode; 
  onButtonClick: () => void;
}

const CircularButton: React.FC<CircularButtonProps> = ({ symbol, onButtonClick }) => {
  return (
    <div className="circular-button" onClick={ onButtonClick }>
      {symbol}
    </div>
  );
};


export default CircularButton;
