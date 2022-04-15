import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { binanceApi, corsProxy } from '../Constants/constants';
import { calcPrevMonthsTS } from '../Components/Chart/Helpers';

export const useFetchChart = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = React.useState<unknown>([]);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    const url: string = binanceApi;
    const proxyUrl: string = corsProxy;
    const prevMonthStamp: number = calcPrevMonthsTS(20);

    setIsLoading(true);
    axios({
      method: 'get',
      url: proxyUrl + url,
    }).then((res) => {
      setData(res.data.filter((i: number[]) => i[0] >= prevMonthStamp));
      setIsLoading(false);
    }).catch((err) => {
      setServerError(err);
      console.log(err);
      setIsLoading(false);
    });
  }, []);


  return { isLoading, data, serverError };
};
