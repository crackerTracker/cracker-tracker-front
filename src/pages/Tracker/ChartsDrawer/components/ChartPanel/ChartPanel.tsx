import * as React from 'react';
import { Chart, Control } from './components';

const ChartPanel: React.FC = () => {
  return (
    <>
      <Control />
      <Chart />
    </>
  );
};

export default React.memo(ChartPanel);
