export const convertData = (data: (string | number)[][]) => {
    return data.map((x: (string | number)[], index: number) => {
        return{
          low: Number(x[3]),
          high: Number(x[2]),
          open: Number(x[1]),
          close: Number(x[4]),
        }
      })
}
