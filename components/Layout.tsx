import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from 'next/image';

import MascotImage from '../components/MascotImage';

type Props = {
  children?: ReactNode;
  title?: string;
  className?: string;
};

const getMascotImage = () => {
  const mascotNames = ["bigcircle", "diamond", "fourdots", "smallcircle", "square", "triangle", "vertical", "x"];
  const index = Math.floor(Math.random() * mascotNames.length);

  const path = "/assets/mascot/" + mascotNames[index] + ".ico";

  return path;
};

const mascotPath = getMascotImage();

const Layout = ({ children, title = "This is the default title", className = ""}: Props) => (
  <div>
    <Head>
      <link rel="icon" href={mascotPath} />
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">Menu</Link> | <Link href="/game">Start</Link> | <Link href="/about">About</Link> |{" "}
      </nav>
    </header>
    <Image
        src="/assets/bg-menu.svg"
        alt="Canvas SVG"
        width={200}
        height={200}
        className="background"
      />
    <div className={className}>
    {children}
    </div>
    {/* <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer> */}
  </div>
);

export default Layout;
