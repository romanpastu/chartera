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
      mT: 0,
      height: 100,
    },
    {
      mT: 35,
      height: 100,
    },
    {
      mT: 70,
      height: 100,
    },
  ]);

  
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas: any = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //Our first draw
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    //total price range
    let high = 1000;
    let low = 0;
    //accumulatedWidth
    let accumulatedWith = 0;
    let candleWidth = 30
    //Our draw come here
    data.map((i: any, index) => {
      if (index > 0) {
        accumulatedWith += candleWidth;
      }

      console.log((accumulatedWith+i.width)/2)
      drawCandle(context, accumulatedWith, i.mT, candleWidth, 100, "red");
      drawLine(context, index > 0 ? accumulatedWith+(candleWidth/2) : (accumulatedWith+candleWidth)/2, i.mT, 1, 140, "red");
    });
  }, [drawCandle, drawLine]);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
