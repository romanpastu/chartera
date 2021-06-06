// @ts-ignore
import axios from 'axios';
import React from 'react';
import Canvas from "./Canvas"
import { convertData } from "./Helpers"
type IState = {
}

type IProps = {  
}

const ChartContainer : React.FunctionComponent<IState & IProps> = () => {
  const [data, setData] = React.useState<unknown>([])
  const [prevMonthStamp, setPrevMonthStamp] = React.useState<number>()
  React.useEffect(() => {
    var d : any = new Date();
    d.setMonth(d.getMonth() - 2);
    d.setHours(0, 0, 0, 0);
    setPrevMonthStamp((d/1000|0)*1000); //timestamp of a month ago
  }, [])


  React.useEffect(() => {
    axios({
      method: 'get',
      url: 'http://binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d'
    }).then( res => {
      if(prevMonthStamp){
        setData(res.data.filter((i: number[]) => i[0] >= prevMonthStamp))
      }
    }).catch(err => {
      console.log(err)
    })
  }, [prevMonthStamp])


  if(Array.isArray(data) && data?.length > 0){
    return (
      <Canvas data={convertData(data)} />
    );
  }else{
    return null
  }
  
}

export default ChartContainer;
