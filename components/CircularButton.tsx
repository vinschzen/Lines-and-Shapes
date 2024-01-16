import React from 'react';
import Image from 'next/image';

interface CircularButtonProps {
  symbol: string; 
  onButtonClick: () => void;
}

const CircularButton: React.FC<CircularButtonProps> = ({ symbol, onButtonClick }) => {
  const path = "/assets/buttons/btn_" + symbol + ".svg";

  return (
    <div className="circular-button" onClick={ onButtonClick }>
      <Image
        src={path}
        alt="Button SVG"
        width={100}
        height={100}
      />
    </div>
  );
};


export default CircularButton;
