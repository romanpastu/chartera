import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BINANCE_API_PAIRS } from '../Constants/constants';

type Symbol = {
    symbol: string;
    status: string;
    baseAsset: string;
    baseAssetPrecision: number;
    quoteAsset: string;
    quotePrecision: number;
    quoteAssetPrecision: number;
    baseCommissionPrecision: number;
    quoteCommissionPrecision: number;
    orderTypes: string[];
    icebergAllowed: boolean;
    ocoAllowed: boolean;
    quoteOrderQtyMarketAllowed: boolean;
    isSpotTradingAllowed: boolean;
    isMarginTradingAllowed: boolean;
    filters: any[];
    permissions: string[];
};

export const useFetchPairs = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Symbol[]>([]);
  const [serverError, setServerError] = useState(null);
  const { search } = useLocation();
  useEffect(() => {
    const url: string = BINANCE_API_PAIRS;

    setIsLoading(true);
    axios({
      method: 'get',
      url: url
    }).then((res) => {
      setData(res.data.symbols);
      setIsLoading(false);
    }).catch((err) => {
      setServerError(err);
      console.log(err);
      setIsLoading(false);
    });
  }, [search]);

  return { isLoading, data, serverError };
};
