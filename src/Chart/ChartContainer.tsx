// @ts-ignore
import axios from 'axios';
import React from 'react';
import Canvas from "./Canvas"
import { convertData } from "./Helpers"
import { binanceApi, corsProxy } from "../constants"
import Spinner from "../Spinner/Spinner"
const ChartContainer: React.FC = () => {
  const [data, setData] = React.useState<unknown>([])
  const [prevMonthStamp] = React.useState<number>(() => {
    const d: Date = new Date();
    d.setMonth(d.getMonth() - 20);//timestamp of x months ago
    d.setHours(0, 0, 0, 0);
    return (Number(d) / 1000 | 0) * 1000
  })


  React.useEffect(() => {
    let url = binanceApi
    let proxyUrl = corsProxy
    axios({
      method: 'get',
      url: proxyUrl + url
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
    return <Spinner />
  }

}
export default ChartContainer;
