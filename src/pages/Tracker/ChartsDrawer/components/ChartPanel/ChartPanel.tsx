import * as React from 'react';
import Chart from './components/Chart';
import Control from './components/Contol';

const ChartPanel: React.FC = () => {
  return (
    <div>
      <Control />
      <Chart />
    </div>
  );
};

export default React.memo(ChartPanel);
