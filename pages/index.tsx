import Link from "next/link";
import React, { useEffect, useState } from 'react';
import Layout from "../components/Layout";
import ReactDOM from 'react-dom';

import CircularButton from '../components/CircularButton';
import GuessesContainer from '../components/GuessesContainer';
import ShapeCanvas from '../components/ShapeCanvas';

const IndexPage = () => {
  const [guesses, setGuesses] = useState<React.ReactNode[]>([]);
  const [symbols, setSymbols] = useState<[React.ReactNode, React.ReactNode]>([null, null]);
  const [isTimeoutActive, setIsTimeoutActive] = useState(false);
  const [level, setLevel] = useState(1);

  const symbolsArray = [
    (
      <svg name="square" key={0} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(242, 164, 177)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      </svg>
    ),
    (
      <svg name="triangle" key={1} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(179, 235, 232)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 21 19 3 19"/>
      </svg>
    ),
    (
      <svg name="small-circle" key={2} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(160, 150, 210)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8"></circle>
      </svg>
    ),
    (
      <svg name="vertical-line" key={3} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(202, 230, 189)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22"></line>
      </svg>
    ),
    (
      <svg name="diamond" key={4} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(89, 125, 173)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(45 0 0)">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      </svg>
    ),
    (
      <svg name="four-dots" key={5} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(202, 230, 189)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="1"></circle>
        <circle cx="18" cy="6" r="1"></circle>
        <circle cx="6" cy="18" r="1"></circle>
        <circle cx="18" cy="18" r="1"></circle>
      </svg>
    ),
    (
      <svg name="big-circle" key={6} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(242, 164, 177)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="11"></circle>
      </svg>
    ),
    (
      <svg name="x" key={7} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(236, 238, 141)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="20" y1="4" x2="4" y2="20"></line>
        <line x1="4" y1="4" x2="20" y2="20"></line>
      </svg>
    ),
  ];

  const handleButtonClick = (index: number) => {    
    const param = symbolsArray[index];

    if (guesses.length < 2) {
      setGuesses((prevGuesses) => [...prevGuesses, param]);
    }
  };
  
  useEffect(() => {
    const isEqual = areArraysEqual(guesses, symbols);
    if (isEqual)
    {
      
      const audio = new Audio('/assets/sfx/correct.mp3');
      audio.play();

      const timeoutId = setTimeout(() => {
        setIsTimeoutActive(false);

        const getRandomInt = () => Math.floor(Math.random() * 8);

        const firstRandomInt = getRandomInt();
        let secondRandomInt;
  
        do {
          secondRandomInt = getRandomInt();
        } while (secondRandomInt === firstRandomInt);
  
        const firstSymbol = React.cloneElement(symbolsArray[firstRandomInt], { stroke: "rgb(150, 150, 150)" });
        const secondSymbol = React.cloneElement(symbolsArray[secondRandomInt], { stroke: "rgb(150, 150, 150)" });
  
        setSymbols([firstSymbol, secondSymbol]);
        setGuesses([]);
        setLevel(prevLevel => prevLevel + 1);

      }, 1500);

      setIsTimeoutActive(true);

      // clearTimeout(timeoutId);
  
     
    }
  }, [guesses, symbols]);

  const handleGuessClick = (index: number) => {
    if (!isTimeoutActive) {
      setGuesses((prevGuesses) => prevGuesses.filter((_, i) => i !== index));
    }
  };

  const getSymbolByIndex = (index: number): React.ReactNode => {
    return symbolsArray[index];
  };

  const areArraysEqual = (array1: React.ReactNode[], array2: React.ReactNode[]): boolean => {
    if (array1.length !== array2.length) {
      return false;
    }
  
    const names1 = array1.map((svg) => (svg as JSX.Element).props.name);
    const names2 = array2.map((svg) => (svg as JSX.Element).props.name);
  
    const sortedNames1 = names1.slice().sort();
    const sortedNames2 = names2.slice().sort();

  
    return sortedNames1.every((name, index) => name === sortedNames2[index]);
  };

  const randomizeCanvas = (): React.ReactNode => {
    useEffect(() => {
      const getRandomInt = () => Math.floor(Math.random() * 8);

      const firstRandomInt = getRandomInt();
      let secondRandomInt;

      do {
        secondRandomInt = getRandomInt();
      } while (secondRandomInt === firstRandomInt);

      const firstSymbol = React.cloneElement(symbolsArray[firstRandomInt], { stroke: "rgb(150, 150, 150)" });
      const secondSymbol = React.cloneElement(symbolsArray[secondRandomInt], { stroke: "rgb(150, 150, 150)" });

      // console.log(firstRandomInt, secondRandomInt)

      setSymbols([firstSymbol, secondSymbol]);
      setGuesses([]);

    }, []); 

    return (
      <div className="overlay-container">
        {symbols}
        {guesses}
      </div>
    );
  };

  return (
    <Layout title="Lines and Shapes">
      <h1>Lines and Shapes</h1>

      <h3>Level {level}</h3>

      <ShapeCanvas shape={randomizeCanvas()} />

      <div className="guesses-grid">
        {guesses.map((guess, index) => (
          <div className="guess" key={index} onClick={() => handleGuessClick(index)}>
            {guess}
          </div>
        ))}
      </div>

      <div className="button-grid">
        {[...Array(8)].map((_, index) => (
          <CircularButton key={index} symbol={getSymbolByIndex(index)} onButtonClick={() => handleButtonClick(index) } />
        ))}
      </div>
      
      <span>Clicks : </span>
      <span>Score : </span>
      <span>Total Score :</span>
    </Layout>
  );
};


export default IndexPage;