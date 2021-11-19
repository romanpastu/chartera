type DataObj = {
  low: number,
  high: number,
  open: number,
  close: number,
  openTime: number,
  volume: number
};

type ChartRefPoints = {
  highestVal? : number,
  lowestVal?: number,
  maxTime? : number,
  minTime? : number,
  maxVolume? : number,
  minVolume? : number
};

export const convertData = (data: (string | number)[][]) : Array<DataObj> => data.map((x: (string | number)[]) => ({
  low: Number(x[3]),
  high: Number(x[2]),
  open: Number(x[1]),
  close: Number(x[4]),
  openTime: Number(x[0]),
  volume: Number(x[5])
}));

export const getDate = (stamp: number) : string => {
  const date: Date = new Date(stamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const formattedTime = `${day}/${month}/${year}`;
  return formattedTime;
};

export const getChartRefPoints = (data : DataObj[]) => {
  const obj : ChartRefPoints = {};
  obj.highestVal = Math.max(...data.map((o: DataObj) => o.high));
  obj.lowestVal = Math.min(...data.map((o: DataObj) => o.low));
  obj.maxTime = Math.max(...data.map((o: DataObj) => o.openTime));
  obj.minTime = Math.min(...data.map((o: DataObj) => o.openTime));
  obj.maxVolume = Math.max(...data.map((o: DataObj) => o.volume));
  obj.minVolume = Math.min(...data.map((o: DataObj) => o.volume));
  return obj;
};
