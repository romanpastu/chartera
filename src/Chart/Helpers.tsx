export const convertData = (data: (string | number)[][]) => {
    return data.map((x: (string | number)[], index: number) => {
        return{
          low: x[3],
          high: x[2],
          open: x[1],
          close: x[4],
          x: index
        }
      })
}
