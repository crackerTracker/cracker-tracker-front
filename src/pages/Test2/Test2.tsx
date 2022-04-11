import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from './Test2.styles';

import { ReactComponent as RainbowSVGComponent } from 'img/icons/rainbow.svg';
import RainbowSVG from 'img/icons/rainbow.svg';

const Test2 = () => {
  return (
    <div>
      <div>
        <Link to="/test1">Перейти к /test1</Link>
      </div>
      <Image />
      <RainbowSVGComponent height={100} width={100} />
      <img src={RainbowSVG} height={100} width={100} alt="Радуга" />
      <Image src={RainbowSVG} />
    </div>
  );
};

export default Test2;
