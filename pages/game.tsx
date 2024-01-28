import Link from "next/link";
import React, { useEffect, useState } from 'react';
import Layout from "../components/Layout";
import ReactDOM from 'react-dom';
import Image from 'next/image';

import CircularButton from '../components/CircularButton';
import GuessesContainer from '../components/GuessesContainer';
import ShapeCanvas from '../components/ShapeCanvas';

import style from '../styles/animation.module.css';

const IndexPage = () => {
  const [guesses, setGuesses] = useState<React.ReactElement[]>([]);
  const [symbols, setSymbols] = useState<React.ReactNode[]>([]);
  const [buttonStates, setButtonStates] = useState<boolean[]>(new Array(8).fill(false));
  const [isTimeoutActive, setIsTimeoutActive] = useState(false);
  const [level, setLevel] = useState(1);

  const symbolsArray = [
    (
      <svg name="square" key={0} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FF7171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      </svg>
    ),
    (
      <svg name="triangle" key={1} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2DE786" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 21 19 3 19"/>
      </svg>
    ),
    (
      <svg name="small-circle" key={2} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#AE7AFB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8"></circle>
      </svg>
    ),
    (
      <svg name="vertical-line" key={3} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFB711" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22"></line>
      </svg>
    ),
    (
      <svg name="diamond" key={4} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FF79D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(45 0 0)">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      </svg>
    ),
    (
      <svg name="four-dots" key={5} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#53F1F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="1"></circle>
        <circle cx="18" cy="6" r="1"></circle>
        <circle cx="6" cy="18" r="1"></circle>
        <circle cx="18" cy="18" r="1"></circle>
      </svg>
    ),
    (
      <svg name="big-circle" key={6} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFA451" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="11"></circle>
      </svg>
    ),
    (
      <svg name="x" key={7} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4EBBFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="20" y1="4" x2="4" y2="20"></line>
        <line x1="4" y1="4" x2="20" y2="20"></line>
      </svg>
    ),
  ];

  const handleButtonClick = (index: number) => {    
    const param = symbolsArray[index];
    var checkGuess = true;

    guesses.forEach(element => {
      if (element.props.name == param.props.name) {
        checkGuess = false;
      }
    });

    if (guesses.length < symbols.length && checkGuess) {
      const audio = new Audio('/assets/sfx/click.mp3');
      audio.volume = 0.3;
      audio.play();

      setGuesses((prevGuesses) => [...prevGuesses, param]);
      const newButtonStates = [...buttonStates];
      newButtonStates[index] = true;
      setButtonStates(newButtonStates);
    }
  };
  
  useEffect(() => {
    const isEqual = areArraysEqual(guesses, symbols);
    if (isEqual && guesses.length > 0)
    {
      
      const audio = new Audio('/assets/sfx/correct.mp3');
      audio.volume = 0.3;
      audio.play();

      const timeoutId = setTimeout(() => {
        setIsTimeoutActive(false);

        const result: number[] = [];
        const newSymbols: React.ReactNode[] = [];

        const amount: number = Math.floor(Math.random() * 3) + 2;

        while (result.length < amount ) {
          const randomNum = Math.floor(Math.random() * 8) ;
          if (!result.includes(randomNum)) {
            result.push(randomNum);
          }
        }

        result.forEach(element => {
          newSymbols.push( React.cloneElement(symbolsArray[element], { stroke: "rgb(150, 150, 150)" })  )
        });

        setSymbols(newSymbols);
        setGuesses([]);
        setButtonStates(new Array(8).fill(false));
        setLevel(prevLevel => prevLevel + 1);

      }, 1500);

      setIsTimeoutActive(true);
    }
  }, [guesses, symbols]);

  const handleGuessClick = (index: number) => {
    if (!isTimeoutActive) {
      for (let i = 0; i < symbolsArray.length; i++) {
        if (symbolsArray[i].props.name ==  guesses[index].props.name ) {
          const newButtonStates = [...buttonStates];
          newButtonStates[i] = false;
          setButtonStates(newButtonStates);
        }
      }

      const audio = new Audio('/assets/sfx/unselect.wav');
      audio.volume = 0.4;
      audio.play();

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

      const result: number[] = [];
      const newSymbols: React.ReactNode[] = [];

      const amount: number = Math.floor(Math.random() * 3) + 2;

      while (result.length < amount ) {
        const randomNum = Math.floor(Math.random() * 8) ;
        
        if (!result.includes(randomNum)) {
          result.push(randomNum);
        }
      }

      result.forEach(element => {
        newSymbols.push( React.cloneElement( symbolsArray[element], { stroke: "rgb(150, 150, 150)" })  )
      });

      setSymbols(newSymbols);
      setGuesses([]);

    }, []); 

    return (
      <div className="overlay-container">
        {symbols}
        {guesses}
      </div>
    );
  };

  const resetButton = () => {
  };

  return (
    <Layout title={ "Level " + level } className={style.game}>
        <Image
          src="/assets/bg.svg"
          alt="Canvas SVG"
          width={200}
          height={200}
          className="background"
        />
        
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
            <CircularButton key={index} clicked={ buttonStates[index] } symbol={( getSymbolByIndex(index) as JSX.Element).props.name } onButtonClick={() => handleButtonClick(index) } />
          ))}
        </div>
    </Layout>
  );
};


export default IndexPage;
