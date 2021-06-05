// @ts-ignore
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

const drawPriceLine = (ctx: any, maxHigh: any, minLow: any, heightCubicles: any, numberOfLines: any) => {
  let heightPoints = ctx.canvas.height / (numberOfLines + 1);
  let prices = (maxHigh - minLow) / (numberOfLines + 1)
  let priceList = []

  for (let i = 0; i <= numberOfLines + 1; i++) {
    let price = (minLow) + ((heightPoints * i) * ((maxHigh - minLow) / ctx.canvas.height))
    priceList.push(price)
    // console.log("price[" + i + "] " + (minLow + (prices * i)))
    ctx.beginPath();
    ctx.moveTo(0, (heightPoints * i));
    ctx.lineTo(ctx.canvas.width, (heightPoints * i));
    ctx.strokeStyle = "yellow"
    ctx.stroke();
  }
  priceList.reverse()

  for (let i = 0; i < priceList.length; i++) {
    console.log(priceList[i])
    ctx.font = "11px Ariel"
    ctx.fillText(priceList[i], ctx.canvas.width - 30, (heightPoints * i) - 5);
    ctx.fillStyle = "lightblue";
  }

}

const Canvas = (props: any) => {
  const [data, setData] = useState();

  
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
        return (high - close) * heightCubicles;
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
    setData(props.data)
    const canvas: any = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //size

    //Gets the highest hit value
    let maxHigh = Math.max.apply(
      Math,
      props.data.map((o: any) => {
        return o.high;
      })
    );
    //Gets the lowest hit value
    let minLow = Math.min.apply(
      Math,
      props.data.map((o: any) => {
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

    /*Draw horizontal lines*/
    drawPriceLine(context, maxHigh, minLow, heightCubicles, 13)
    //Our draw come here
    props.data.map((i: any, index: any) => {
      //Width is accumulated only after the first candle has been drawn
      if (index > 0) {
        accumulatedWith += candleWidth;
      }

      /*To draw the body of the candle*/
      drawCandle(
        context,
        accumulatedWith,
        calcTopBody(
          props.data[index - 1]?.close,
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
