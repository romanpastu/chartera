
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Chart from '../Chart/Chart';
import { convertData } from './Helpers';
import Spinner from '../Spinner/Spinner';
import { useFetchChart } from '../../Hooks/fetch';

const ChartContainer: React.FC<RouteComponentProps> = ({ history }) => {
  const { data, serverError } = useFetchChart();

  if (serverError) {
    history.push('/error');
  }

  if (Array.isArray(data) && data?.length > 0) {
    return (
      <Chart dataProp={convertData(data)} />
    );
  }
  return <Spinner />;
};
export default ChartContainer;
