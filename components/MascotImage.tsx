import React, { useEffect, useState } from 'react';
import path from 'path';
import Image from 'next/image';

const getMascotImage = () => {
  const mascotNames = ["bigcircle", "diamond", "fourdots", "smallcircle", "square", "triangle", "vertical"];
  const index = Math.floor(Math.random() * mascotNames.length);

  const path = "/assets/mascot/" + mascotNames[index] + ".svg";

  return path;
};

const MascotImage: React.FC = () => {
    const mascotImagePath = getMascotImage();
  
    return (
        <link rel="icon" href={mascotImagePath} />
    );
  };
  
  export default MascotImage;
