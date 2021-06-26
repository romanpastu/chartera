/*
  To get the height necessary to push down the candle body
  */
export const calcTopBody = (
    prevClose: number,
    open: number,
    close: number,
    heightCubicles: number,
    high: number
) => {
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
) => {
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
) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(mL, mT, 1, height);
    ctx.fill();
};

/*Draws the horizontal price lines*/

export const drawPriceLine = (ctx: any, maxHigh: number, minLow: number, heightCubicles: number, numberOfLines: number) => {
    let heightPoints: number = ctx.canvas.height / (numberOfLines + 1);
    let priceList: Array<number> = []
    //Draws the lines
    for (let i = 0; i <= numberOfLines + 1; i++) {
        let price: number = (minLow) + ((heightPoints * i) * ((maxHigh - minLow) / ctx.canvas.height))
        priceList.push(price)
        // console.log("price[" + i + "] " + (minLow + (prices * i)))
        ctx.beginPath();
        ctx.moveTo(0, (heightPoints * i));
        ctx.lineTo(ctx.canvas.width, (heightPoints * i));
        ctx.strokeStyle = "yellow"
        ctx.stroke();
    }
    priceList.reverse()

    //Draws the prices fonts
    priceList.map((i: number, index: number) => {
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

/*
Gets the candle color
*/
export const getColor = (open: number, close: number) => {
    if (open - close > 0) {
        return "red";
    } else {
        return "green";
    }
};