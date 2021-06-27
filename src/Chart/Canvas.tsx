// @ts-ignore
import { useRef, useEffect, useState } from "react";
import { calcTopBody, drawCandle, drawLine, drawPriceLine, getColor, drawTimeLine } from "./CanvasHelpers"
import { ChartRightMargin, horizontalPriceLines, verticalPriceLines } from "./constants"
type dataObj = {
  low: number,
  high: number,
  open: number,
  close: number,
  openTime: number
}

interface IProps {
  data: Array<{
    low: number,
    high: number,
    open: number,
    close: number,
    openTime: number
  }>
}

const Canvas: React.FC<IProps> = (props) => {
  const [data, setData] = useState<Array<{
    low: number,
    high: number,
    open: number,
    close: number,
    openTime: number
  }>>();
  const [candleWidth, setCandleWidth] = useState<number>();

  const canvasRef = useRef(null);

  useEffect(() => {
    setData(props.data)
  }, [])

  useEffect(() => {
    const canvas: any = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (data) {
      setCandleWidth(canvas.width / data.length)
    }
  }, [data && data.length != 0])

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //Gets the highest hit value
    let maxHigh: number = Math.max(...props.data.map((o: any) => { return o.high; }));
    //Gets the lowest hit value
    let minLow: number = Math.min(...props.data.map((o: any) => { return o.low; }));
    //Gets the last time
    let maxTime: number = Math.max(...props.data.map((o: any) => { return o.openTime }))
    //Gets the lowest time
    let minTime: number = Math.min(...props.data.map((o: any) => { return o.openTime; }));
    /*
    The size of each unit of height 
    To get sized based on   (price1-price2)*heightCubicles
    */
    let heightCubicles: number = context.canvas.height / (maxHigh - minLow); //cada unidad de precio equivale a unidad * heightcubicles en escala de canvas
    let widthCubciles: number = context.canvas.width / (maxTime - minTime);
    //Fills the whole screen with black
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    //Width is accumulated to distribute the candles horizontally
    let accumulatedWith: number = 0;

    /*Draw horizontal lines*/
    if (data) drawPriceLine(context, maxHigh, minLow, heightCubicles, horizontalPriceLines)




    let candlesToIgnore = 0;
    if (candleWidth) candlesToIgnore = ChartRightMargin / candleWidth

    /*Draw timestamp lines*/
    drawTimeLine(context, maxTime, minTime, widthCubciles, verticalPriceLines, candlesToIgnore)
    
    //Draw the candles
    data && data.filter((i, index) => index >= candlesToIgnore).map((i: dataObj, index: number) => {

      //Width is accumulated only after the first candle has been drawn
      if (index > 0 && candleWidth) {
        accumulatedWith += candleWidth;
      }
      if (candleWidth) {
        /*To draw the body of the candle*/
        drawCandle(
          context,
          accumulatedWith,
          calcTopBody(
            props.data[index - (candlesToIgnore + 1)]?.close,
            i.open,
            i.close,
            heightCubicles,
            maxHigh
          ),
          candleWidth,
          Math.abs((i.open - i.close) * heightCubicles),
          getColor(i.open, i.close)
        );

        /*To draw the tail of the candle*/

        drawLine(context, accumulatedWith + (candleWidth / 2), (maxHigh - i.high) * heightCubicles, 1, (i.high - i.low) * heightCubicles, getColor(i.open, i.close));
      }

    })
  }, [candleWidth && data && data.length != 0])

  return <canvas ref={canvasRef} {...props} />;
}
export default Canvas;
