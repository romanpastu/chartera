export type DataObj = {
  low: number,
  high: number,
  open: number,
  close: number,
  openTime: number,
  volume: number
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

export const calcPrevMonthsTS = (months: number) => {
  const d: Date = new Date();
  d.setMonth(d.getMonth() - months);// timestamp of x months ago
  d.setHours(0, 0, 0, 0);
  return (Number(d) / 1000 | 0) * 1000;
};
