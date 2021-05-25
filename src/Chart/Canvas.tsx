import  { useRef, useEffect } from "react";

const draw = (ctx: any)  => {
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20, 0, 2*Math.PI)
    ctx.fill()
  }


const Canvas = (props: any) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas : any  = canvasRef.current;
    const context =  canvas.getContext("2d") 
    //Our first draw
    context.fillStyle = "#000000";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    //Our draw come here
    draw(context)
  }, [draw]);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
