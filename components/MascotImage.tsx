import React, { useEffect, useState } from 'react';
import path from 'path';
import Image from 'next/image';
import Favicon from 'next/link';

const getMascotImage = () => {
  const mascotNames = ["bigcircle", "diamond", "fourdots", "smallcircle", "square", "triangle", "vertical", "x"];
  const index = Math.floor(Math.random() * mascotNames.length);

  const path = "/assets/mascot/" + mascotNames[index] + ".ico";

  return path;
};

const MascotImage: React.FC = () => {
    const mascotImagePath = getMascotImage();
  
    return (
        <Favicon rel="icon" href={mascotImagePath} />
    );
  };
  
  export default MascotImage;
