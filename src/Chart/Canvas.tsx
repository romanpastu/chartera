import { useRef, useEffect, useState } from "react";

const drawCandle = (
  ctx: any,
  mL: any,
  mT: any,
  width: any,
  height: any,
  color: string
) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  //margin left, margin top, width, height
  ctx.rect(mL, mT, width, height);
  ctx.fill();
};

const drawLine = (
  ctx: any,
  mL: any,
  mT: any,
  width: any,
  height: any,
  color: string
) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.rect(mL, mT, 1, height);
  ctx.fill();
};

const Canvas = (props: any) => {
  const [data, setData] = useState([
    {
      low: 1000,
      high: 2000,
      open: 2000,
      close: 1900,
      x: 1,
    },
    {
      low: 800,
      high: 2100,
      open: 1900,
      close: 800,
      x: 2,
    },
    {
      low: 400,
      high: 800,
      open: 800,
      close: 600,
      x: 3,
    },
    {
      low: 450,
      high: 1300,
      open: 600,
      close: 1000,
      x: 4,
    },
  ]);
  /*
  To get the height necessary to push down the candle body
  */
  const calcTopBody = (
    prevClose: any,
    open: any,
    close: any,
    heightCubicles: any,
    high: any
  ) => {
    //case : first candle
    if (prevClose == undefined) {
      if (open - close > 0) {
        return (high - open) * heightCubicles;
      } else {
        return (high - close) * heightCubicles;
      }
    } else {
      if (open - close > 0) {
        return (high - prevClose) * heightCubicles;
      } else {
        return (high - prevClose - open) * heightCubicles;
      }
    }
  };

  /*
  Gets the candle color
  */
  const getColor = (open: any, close: any) => {
    if (open - close > 0) {
      return "red";
    } else {
      return "green";
    }
  };

  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas: any = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //size

    //Gets the highest hit value
    let maxHigh = Math.max.apply(
      Math,
      data.map((o) => {
        return o.high;
      })
    );
    //Gets the lowest hit value
    let minLow = Math.min.apply(
      Math,
      data.map((o) => {
        return o.low;
      })
    );

    /*
    The size of each unit of height 
    To get sized based on   (price1-price2)*heightCubicles
    */
    let heightCubicles = context.canvas.height / (maxHigh - minLow); //cada unidad de precio equivale a unidad * heightcubicles en escala de canvas

    //Fills the whole screen with black
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    //Width is accumulated to distribute the candles horizontally
    let accumulatedWith = 0;
    let candleWidth = 30;

    //Our draw come here
    data.map((i: any, index) => {
      //Width is accumulated only after the first candle has been drawn
      if (index > 0) {
        accumulatedWith += candleWidth;
      }

      /*To draw the body of the candle*/
      drawCandle(
        context,
        accumulatedWith,
        calcTopBody(
          data[index - 1]?.close,
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

    });
  }, [drawCandle, drawLine]);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
