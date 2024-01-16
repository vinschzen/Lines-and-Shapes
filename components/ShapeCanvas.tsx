import React from 'react';
import Image from 'next/image';

interface ShapeCanvasProps {
    shape: React.ReactNode; 
}

const ShapeCanvas: React.FC<ShapeCanvasProps> = ({ shape }) => (
  <div className="shape-canvas">
    {shape}
    <Image
        src="/assets/canvas.svg"
        alt="Canvas SVG"
        width={200}
        height={200}
      />
  </div>
);

export default ShapeCanvas;
