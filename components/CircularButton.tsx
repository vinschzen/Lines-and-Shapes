import React, { useState } from 'react';
import Image from 'next/image';

interface CircularButtonProps {
  symbol: string;
  clicked: boolean;
  onButtonClick: () => void;
}

const CircularButton: React.FC<CircularButtonProps> = ({ symbol, clicked, onButtonClick }) => {
  const imagePath = clicked ? `/assets/buttons/btn_${symbol}_clicked.png` : `/assets/buttons/btn_${symbol}.png`;

  const handleClick = () => {
    onButtonClick();
  };

  // const reset = () => {
  //   setClicked(false);
  // };

  return (
    <div className="circular-button" onClick={handleClick}>
      <Image
        src={imagePath}
        alt='button'
        width={100}
        height={100}
      />
    </div>
  );
};

export default CircularButton;
