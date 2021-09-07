type DataObj = {
  low: number,
  high: number,
  open: number,
  close: number,
  openTime: number,
  volume: number
}

type ChartRefPoints = {
 highestVal? : number,
 lowestVal?: number,
 maxTime? : number,
 minTime? : number,
 maxVolume? : number,
 minVolume? : number
}

export const convertData = (data: (string | number)[][]) : Array<DataObj> => {
  return data.map((x: (string | number)[]) => {
    return {
      low: Number(x[3]),
      high: Number(x[2]),
      open: Number(x[1]),
      close: Number(x[4]),
      openTime: Number(x[0]),
      volume: Number(x[5])
    }
  })
}

export const getDate = (stamp: number) : string => {
  let date: Date = new Date(stamp)
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let formattedTime = day + '/' + month + '/' + year;
  return formattedTime
}

export const getChartRefPoints = (data : DataObj[]) => {
  let obj : ChartRefPoints = {}
  obj["highestVal"]  = Math.max(...data.map((o: DataObj) => { return o.high; }));
  obj["lowestVal"] = Math.min(...data.map((o: DataObj) => { return o.low; }));
  obj["maxTime"] =  Math.max(...data.map((o: DataObj) => { return o.openTime }))
  obj["minTime"] = Math.min(...data.map((o: DataObj) => { return o.openTime; }));
  obj["maxVolume"] = Math.max(...data.map((o: DataObj) => { return o.volume; }));
  obj["minVolume"] = Math.min(...data.map((o: DataObj) => { return o.volume; }));
  return obj;
}