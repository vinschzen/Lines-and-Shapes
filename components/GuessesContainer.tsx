import React from 'react';

interface GuessesContainerProps {
    shape: React.ReactNode; 
}

const ShapeCanvas: React.FC<GuessesContainerProps> = ({ shape }) => (
  <div className="guess">
    {shape}
  </div>
);

export default ShapeCanvas;
