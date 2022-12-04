
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Chart from '../Chart/Chart';
import { convertData } from './Helpers';
import Spinner from '../Spinner/Spinner';
import { useFetchChart } from '../../Hooks/useFetchChart';
import { IntervalSelector } from './IntervalSelector';
import { PairSelector } from './PairSelector';
import { useFetchPairs } from '../../Hooks/useFetchPairs';

const ChartContainer: React.FC<RouteComponentProps> = ({ history }) => {
  const { data, serverError, isLoading: isLoadingChart } = useFetchChart();
  const { data: pairsData, isLoading: isLoadingPairs } = useFetchPairs();
  const isData = Array.isArray(data) && data?.length > 0;
  const isPairs = pairsData && Array.isArray(pairsData);
  if (serverError) {
    history.push('/error');
  }

  if (isData && isPairs && !isLoadingChart && !isLoadingPairs) {
    return (
      <>
        <div style={
          {
            position: 'absolute',
            left: 0,
            top: 0
          }
        }>
          <IntervalSelector />
          <PairSelector pairs={pairsData?.filter(i => i.status === 'TRADING').map(i => i.symbol)}/>
        </div>
        <Chart dataProp={convertData(data)} />
      </>
    );
  }
  return <Spinner />;
};
export default ChartContainer;
