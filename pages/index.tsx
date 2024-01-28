import Link from "next/link";
import React, { useEffect, useState } from 'react';
import Layout from "../components/Layout";
import Image from 'next/image';
import { useRouter } from "next/router";

import style from '../styles/animation.module.css';

const MenuPage = () => {
  const [ styleState, setStyleState] = useState<string>(style.menu  );

  const router = useRouter();
  
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
      <Image
        src="/assets/main/main-menu.svg"
        alt="About SVG"
        width={200}
        height={200}
        className={style.about}
      />

      <div className="btn-start" onClick={handleStartClick}>

      </div>

      <div className="btn-about" onClick={handleAboutClick}>

      </div>

    </Layout>
  );
};


export default MenuPage;
