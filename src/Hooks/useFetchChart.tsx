import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BINANCE_API_KLINES, DEFAULT_INTERVAL, DEFAULT_SYMBOL } from '../Constants/constants';
import { calcPrevMonthsTS } from '../Components/ChartContainer/Helpers';
import { useLocation } from 'react-router-dom';

export const useFetchChart = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = React.useState<unknown>([]);
  const [serverError, setServerError] = useState(null);
  const { search } = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(search);
    const symbol: string = params.get('symbol') || DEFAULT_SYMBOL;
    const interval: string = params.get('interval') || DEFAULT_INTERVAL;
    const url: string = BINANCE_API_KLINES;
    const newParams = new URLSearchParams();
    newParams.append('symbol', symbol);
    newParams.append('interval', interval);
    // const proxyUrl: string = corsProxy;
    const prevMonthStamp: number = calcPrevMonthsTS(20);

    setIsLoading(true);
    axios({
      method: 'get',
      url: url + `?${newParams}`
    }).then((res) => {
      setData(res.data.filter((i: number[]) => i[0] >= prevMonthStamp));
      setIsLoading(false);
    }).catch((err) => {
      setServerError(err);
      console.log(err);
      setIsLoading(false);
    });
  }, [search]);

  return { isLoading, data, serverError };
};
