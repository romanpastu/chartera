// @ts-ignore
import axios from 'axios';
import React from 'react';
import Canvas from "./Canvas"
import { priceArray, test } from "./mockData"
type IState = {
    data?: string;
}

type IProps = {
    
    
}

const ChartContainer : React.FunctionComponent<IState & IProps> = ({}) => {
  const [data, setData] = React.useState([])
  const [prevMonthStamp, setPrevMonthStamp] = React.useState<any>()
  React.useEffect(() => {
    var d : any = new Date();
    d.setMonth(d.getMonth() - 2);
    d.setHours(0, 0, 0, 0);
    setPrevMonthStamp((d/1000|0)*1000); //timestamp of a month ago
  }, [])

  React.useEffect(() => {
    console.log("dataupdated")
    console.log(data)
  }, [data])

  React.useEffect(() => {
    axios({
      method: 'get',
      url: 'http://binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d'
    }).then( res => {
      console.log(res)
      setData(priceArray.filter((i: number[]) => i[0] >= prevMonthStamp))
    }).catch(err => {
      console.log(err)
    })
  }, [prevMonthStamp])

  const convertData = (data: any) => {
    return data.map((x: any, index: any) => {
      return{
        low: x[3],
        high: x[2],
        open: x[1],
        close: x[4],
        x: index
      }
    })
  }

  if(data.length > 0){
    return (
      <Canvas data={convertData(data)} />
    );
  }else{
    return null
  }
  
}

export default ChartContainer;
