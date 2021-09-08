import { getDate } from "./Helpers"
import { ChartRightMargin } from "./constants";
/*
  To get the height necessary to push down the candle body
  */
export const calcTopBody = (
    prevClose: number,
    open: number,
    close: number,
    heightCubicles: number,
    high: number
): number => {
    //case : first candle
    if (prevClose === undefined) {
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

/*Draws the candles*/

export const drawCandle = (
    ctx: any,
    mL: number,
    mT: number,
    width: number,
    height: number,
    color: string
): void => {
    ctx.fillStyle = color;
    ctx.beginPath();
    //margin left, margin top, width, height
    ctx.rect(mL, mT, width, height);
    ctx.fill();
};
/*Draws the lines*/

export const drawLine = (
    ctx: any,
    mL: number,
    mT: number,
    width: number,
    height: number,
    color: string
): void => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(mL, mT, width, height);
    ctx.fill();
};

/*Draws the horizontal price lines*/

export const drawPriceLine = (ctx: any, highestVal: number, lowestVal: number, numberOfLines: number): void => {
    let heightPoints: number = ctx.canvas.height / (numberOfLines + 1);
    let priceList: Array<number> = []
    //Draws the lines
    for (let i : number = 0; i <= numberOfLines + 1; i++) {
        let price: number = (lowestVal) + ((heightPoints * i) * ((highestVal - lowestVal) / ctx.canvas.height))
        priceList.push(price)
        // console.log("price[" + i + "] " + (minLow + (prices * i)))
        ctx.beginPath();
        ctx.moveTo(0, (heightPoints * i));
        ctx.lineTo(ctx.canvas.width, (heightPoints * i));
        ctx.strokeStyle = "yellow"
        ctx.stroke();
    }

    priceList.reverse()
    drawPriceFonts(priceList, ctx, heightPoints)

}

/*Draws the prices fonts*/

const drawPriceFonts = (priceList: Array<number>, ctx: any, heightPoints: number): void => {
    priceList.forEach((i: number, index: number) => {
        ctx.font = "11px Arial"
        ctx.fillStyle = "orange";
        let price: string = Math.trunc(i).toString()
        let rightMargin: number;

        if (price.length === 5) {
            rightMargin = ctx.canvas.width - 35
        } else if (price.length === 4) {
            rightMargin = ctx.canvas.width - 29
        } else if (price.length === 3) {
            rightMargin = ctx.canvas.width - 24
        } else if (price.length === 2) {
            rightMargin = ctx.canvas.width - 23
        } else if (price.length === 6) {
            rightMargin = ctx.canvas.width - 40
        } else {
            rightMargin = ctx.canvas.width - 15
        }

        if (index === 0) {
            ctx.fillText(price, rightMargin, (heightPoints * index) + 12);
        } else {
            ctx.fillText(price, rightMargin, (heightPoints * index) - 5);
        }
    })
}


/*Draws the vertical time lines*/
export const drawTimeLine = (ctx: any, maxTime: number, minTime: number, numberOfLines: number, skippedDays: number): void => {
    let widthPoints: number = ctx.canvas.width / (numberOfLines + 1);
    let timeList: Array<number> = []

    //Draws the lines
    for (let i = 0; i <= numberOfLines + 1; i++) {
        let time: number = (minTime) + ((widthPoints * i) * ((maxTime - minTime) / ctx.canvas.width))
        timeList.push(time)
        ctx.beginPath();
        ctx.moveTo((widthPoints * i), 0)
        ctx.lineTo((widthPoints * i), ctx.canvas.height)
        ctx.strokeStyle = "yellow"
        ctx.stroke();
    }

    //Exceptional case - draws the current time line
    ctx.beginPath();
    ctx.setLineDash([5]);
    ctx.moveTo(ctx.canvas.width - (ChartRightMargin +2.5), 0)
    ctx.lineTo(ctx.canvas.width - (ChartRightMargin +2.5), ctx.canvas.height)
    ctx.strokeStyle = "white"
    ctx.stroke();

    //Draws the time fonts
    drawTimeFonts(timeList, ctx, widthPoints, skippedDays)
}

/* Draws the time fonts */
export const drawTimeFonts = (timeList: Array<number>, ctx: any, widthPoints: number, skippedDays: number): void => {
    timeList.forEach((i: number, index: number) => {
        ctx.font = "11px Arial"
        ctx.fillStyle = "orange";
        let time: number = i

        if (index !== timeList.length - 1) {
            //time + delay of X days based on the right margin
            ctx.fillText(getDate(time + (skippedDays * 86400 * 1000)), (widthPoints * index) + 5, ctx.canvas.height - 4)
        } else if (index === timeList.length - 1) {
            ctx.fillText(getDate(time), ((widthPoints * index) - ChartRightMargin), ctx.canvas.height - 20)
        }
    })
}

/* Draw volume candle */
export const drawVolumeCandle = (ctx: any , accumulatedWith: number, open: number, close: number, volume: number, maxVolume: number, candleWidth: number, height?: number): void => {
    ctx.fillStyle = getColor(open, close, 0.15);
    ctx.beginPath();
    ctx.rect(accumulatedWith, height ? height*(0.9-((volume*0.1)/maxVolume)) : 0, candleWidth, height ? height*(0.1+((volume*0.1)/maxVolume)) : 0);
    ctx.fill();
}


/*
Gets the candle color
*/
export const getColor = (open: number, close: number, opacity? :number) : string => {
    if (open - close > 0) {
        return opacity ?`rgb(255,0,0,${opacity.toString()})`: "rgb(255,0,0)";
    } else {
        return opacity ?`rgb(0,255,0,${opacity.toString()})`: "rgb(0,255,0)";
    }
};