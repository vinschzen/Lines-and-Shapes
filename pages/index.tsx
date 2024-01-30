import Link from "next/link";
import React, { useEffect, useState } from 'react';
import Layout from "../components/Layout";
import Image from 'next/image';
import { useRouter } from "next/router";

import HowToPlay from '../components/HowToPlay';

import style from '../styles/animation.module.css';

const MenuPage = () => {
  const [ styleState, setStyleState] = useState<string>(style.menu  );
  const [ showHelp, setShowHelp ] = useState<boolean>(false);

  const router = useRouter();

  const handleHelpClick = () => {
    setShowHelp(true);
  };

  const handleHelpClose = () => {
    setShowHelp(false);
  };
  
  const handleStartClick = () => {
    setStyleState(style.menuexit);

    const timeoutId = setTimeout(() => {
      router.push("/game");
    }, 500);
  };
  
  const handleAboutClick = () => {
    setStyleState(style.menuexit);

    const timeoutId = setTimeout(() => {
      router.push("/about");
    }, 500);
  };
  
  return (
    <Layout title="Lines and Shapes" className={ styleState }>
      {showHelp && <HowToPlay onClick={handleHelpClose} />}

      <Image
        src="/assets/main/title.svg"
        alt="Title SVG"
        width={200}
        height={200}
        className={style.about}
      />

      <Image onClick={handleHelpClick}
        src="/assets/main/help.svg"
        alt="Help SVG"
        width={100}
        height={100}
        className={style.mainbutton}
        style={{ left: '53.5vw', top: '20vh' }}
      />

      <Image onClick={handleStartClick}
        src="/assets/main/get_started.svg"
        alt="Start SVG"
        width={400}
        height={100}
        className={style.mainbutton}
        style={{ left: '39vw', top: '40vh' }}
      />

      <Image onClick={handleAboutClick}
        src="/assets/main/about_us.svg"
        alt="About SVG"
        width={230}
        height={100}
        className={style.mainbutton}
        style={{ left: '43.5vw', top: '53vh' }}
      />

    </Layout>
  );
};


export default MenuPage;
