import Link from "next/link";
import React, { useEffect, useState } from 'react';
import Layout from "../components/Layout";
import Image from 'next/image';

import style from '../styles/animation.module.css';

const AboutPage = () => {
  const [ styleState, setStyleState] = useState<string>(style.menu);

  return (
    <Layout title="About" className={ styleState }>
      <Image
        src="/assets/about/about-us.svg"
        alt="About SVG"
        width={200}
        height={200}
        className={style.about}
      />
    </Layout>
  );
};


export default AboutPage;
