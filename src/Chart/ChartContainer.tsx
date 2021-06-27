// @ts-ignore
import axios from 'axios';
import React from 'react';
import Canvas from "./Canvas"
import { convertData } from "./Helpers"


const ChartContainer: React.FC = () => {
  const [data, setData] = React.useState<unknown>([])
  const [prevMonthStamp, setPrevMonthStamp] = React.useState<number>()

  React.useEffect(() => {
    var d: any = new Date();
    d.setMonth(d.getMonth() - 30);//timestamp of x months ago
    d.setHours(0, 0, 0, 0);
    setPrevMonthStamp((d / 1000 | 0) * 1000); 
  }, [])


  React.useEffect(() => {
    axios({
      method: 'get',
      url: 'https://binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d'
    }).then(res => {
      if (prevMonthStamp) {
        setData(res.data.filter((i: number[]) => i[0] >= prevMonthStamp))
      }
    }).catch(err => {
      console.log(err)
    })
  }, [prevMonthStamp])


  if (Array.isArray(data) && data?.length > 0) {
    return (
      <Canvas data={convertData(data)} />
    );
  } else {
    return null
  }

}
export default ChartContainer;
