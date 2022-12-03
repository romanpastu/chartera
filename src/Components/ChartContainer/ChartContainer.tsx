
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Chart from '../Chart/Chart';
import { convertData } from './Helpers';
import Spinner from '../Spinner/Spinner';
import { useFetchChart } from '../../Hooks/fetch';
import { IntervalSelector } from './IntervalSelector';

const ChartContainer: React.FC<RouteComponentProps> = ({ history }) => {
  const { data, serverError, isLoading } = useFetchChart();
  const isData = Array.isArray(data) && data?.length > 0;

  if (serverError) {
    history.push('/error');
  }

  if (isData && !isLoading) {
    return (
      <>
        <IntervalSelector />
        <Chart dataProp={convertData(data)} />
      </>
    );
  }
  return <Spinner />;
};
export default ChartContainer;
