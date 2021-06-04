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
      low: 1000,
      high: 2000,
      open: 1300,
      close: 1900
    },
    {
      mT: 35,
      height: 100,
      low: 1300,
      high: 2100,
      open: 1900,
      close: 800,
    },
    {
      mT: 70,
      height: 100,
      low: 400,
      high: 800,
      open: 800,
      close: 600
    },
  ]);

  
  const canvasRef = useRef(null);
  useEffect(() => {
    
    const canvas: any = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //size
    let high = data.sort((a,b)=>b.high-a.high)[0].high;
    let low = data.sort((a,b)=>a.low-b.low)[0].low;
    let heightCubicles = context.canvas.height/(high-low)  //cada unidad de precio equivale a unidad * heightcubicles en escala de canvas
    console.log(high, low)
    console.log(heightCubicles)
    console.log((high-low))
    console.log((high-low)*heightCubicles)
    console.log()
    //Our first draw
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    //total price range
    
    //accumulatedWidth
    let accumulatedWith = 0;
    let candleWidth = 30
    //Our draw come here
    data.map((i: any, index) => {
      if (index > 0) {
        accumulatedWith += candleWidth;
      }

      drawCandle(context, accumulatedWith, i.mT, candleWidth, 100, "red");
      drawLine(context, index > 0 ? accumulatedWith+(candleWidth/2) : (accumulatedWith+candleWidth)/2, i.mT, 1, (i.high-i.low)*heightCubicles, "red");
    });
  }, [drawCandle, drawLine]);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
