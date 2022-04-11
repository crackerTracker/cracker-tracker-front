import React, { useEffect } from 'react';
import TestComponent from 'components/TestComponent';
import { useTestStore } from 'stores/hooks';
import { observer } from 'mobx-react-lite';
import { Link as StyledLink } from './Test.styles';
import { Link } from 'react-router-dom';
import { images } from 'img/common';

import styles from './Test.module.scss';

const Test: React.FC = () => {
  const testStore = useTestStore();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const setName = () => {
      timer = setTimeout(() => {
        testStore.setName(`Dima${Math.round(Math.random() * 10)}`);
        setName();
      }, 1000);
    };

    setName();

    return () => {
      clearTimeout(timer);
    };
  }, [testStore]);

  return (
    <div className={styles.container}>
      Test Page
      <TestComponent />
      <StyledLink href="https://google.com">{testStore.fullName}</StyledLink>
      <div>
        <Link to="/test2">Перейти к /test2</Link>
      </div>
      <img src={images.duck} alt="Утка" />
    </div>
  );
};

export default observer(Test);
