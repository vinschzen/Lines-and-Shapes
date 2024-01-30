import React, { useState } from 'react';
import Image from 'next/image';

import style from '../styles/animation.module.css';

type Props = { 
    onClick?: () => void; 
}

const HowToPlay: React.FC<Props> = ({ onClick }) => {
    const [hide, setHide] = useState(false);

    const handleClick = () => {
        // setHide(true);
    };

    return (
        !hide && (
            <div onClick={onClick}>
                <Image
                    src="/assets/main/tutorial.svg"
                    alt="Tutorial SVG"
                    width={200}
                    height={200}
                    className={style.overlay}
                />
            </div>
        )
    );
};

export default HowToPlay;
