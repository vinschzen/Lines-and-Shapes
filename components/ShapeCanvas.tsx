import React from 'react';

interface ShapeCanvasProps {
    shape: React.ReactNode; 
}

const ShapeCanvas: React.FC<ShapeCanvasProps> = ({ shape }) => (
  <div className="shape-canvas">
    {shape}
  </div>
);

export default ShapeCanvas;
