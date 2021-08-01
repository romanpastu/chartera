type DataConverted = {
  low: number,
  high: number,
  open: number,
  close: number,
  openTime: number,
  volume: number
}

export const convertData = (data: (string | number)[][]) : Array<DataConverted> => {
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
  let date: any = new Date(stamp)
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let formattedTime = day + '/' + month + '/' + year;
  return formattedTime
}