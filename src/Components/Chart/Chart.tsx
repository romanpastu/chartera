import React, { useRef, useEffect, useState } from 'react';
import {
  calcTopBody, drawCandle, drawLine, drawPriceLine, getColor, drawTimeLine, drawVolumeCandle, getChartRefPoints
} from './ChartHelpers';
import { BgColor, ChartRightMargin, FontColor, horizontalPriceLines, PriceLinesColor, verticalPriceLines } from './constants/constants';
import { DataObj } from '../ChartContainer/Helpers';

interface IProps {
  dataProp: Array<DataObj>,
  bgColor?: string,
  rightMarginProp?: number,
  horizontalPriceLinesProp?: number,
  verticalPriceLinesProp?: number,
  PriceLineColorProp?: string,
  fontColor?: string
}

const Chart: React.FC<IProps> = function ({ dataProp, bgColor = BgColor, rightMarginProp = ChartRightMargin, horizontalPriceLinesProp = horizontalPriceLines, verticalPriceLinesProp = verticalPriceLines, PriceLineColorProp = PriceLinesColor, fontColor = FontColor }: IProps) {
  const [data] = useState<Array<DataObj>>(dataProp);
  const [candleWidth, setCandleWidth] = useState<number>();

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (data && data.length !== 0) {
      setCandleWidth(canvas.width / data.length);
    }
  }, [data, canvasRef]);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const {
      // eslint-disable-next-line no-unused-vars
      highestVal, lowestVal, maxTime, minTime, maxVolume // minVolume
    } = getChartRefPoints(data);

    /*
    The size of each unit of height
    To get sized based on   (price1-price2)*heightCubicles
    */
    const heightCubicles: number = highestVal && lowestVal ? context.canvas.height / (highestVal - lowestVal) : 0; // each price unit equals to unit * heightcubicles in canvas scale
    // eslint-disable-next-line no-unused-vars
    // const widthCubciles: number = maxTime && minTime ? context.canvas.width / (maxTime - minTime) : 0;
    context.fillStyle = bgColor;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    // Width is accumulated to distribute the candles horizontally
    let accumulatedWith: number = 0;

    /* Draw horizontal lines */
    if (data && highestVal && lowestVal) drawPriceLine(context, highestVal, lowestVal, horizontalPriceLinesProp, PriceLineColorProp, fontColor);

    let candlesToIgnore: number = 0;
    if (candleWidth) candlesToIgnore = (rightMarginProp || ChartRightMargin) / candleWidth;

    /* Draw timestamp lines */
    if (maxTime && minTime) drawTimeLine(context, maxTime, minTime, verticalPriceLinesProp, candlesToIgnore, rightMarginProp, PriceLineColorProp, fontColor);

    // Draw the candles
    data && data.length > 0 && data.filter((i, index) => index >= candlesToIgnore).forEach((i: DataObj, index: number) => {
      // Width is accumulated only after the first candle has been drawn
      if (index > 0 && candleWidth) {
        accumulatedWith += candleWidth;
      }
      if (candleWidth && highestVal) {
        const bodyHeight: number = Math.abs((i.open - i.close) * heightCubicles);
        const tailHeight: number = (i.high - i.low) * heightCubicles;
        /* To draw the body of the candle */
        drawCandle(
          context,
          accumulatedWith,
          calcTopBody(
            data[index - (candlesToIgnore + 1)]?.close,
            i.open,
            i.close,
            heightCubicles,
            highestVal
          ),
          candleWidth,
          bodyHeight,
          getColor(i.open, i.close)
        );

        /* To draw the tail of the candle */
        const tailMarginLeft: number = accumulatedWith + (candleWidth / 2);
        const tailMarginTop: number = (highestVal - i.high) * heightCubicles;
        drawLine(context, tailMarginLeft, tailMarginTop, 1, tailHeight, getColor(i.open, i.close));
        /* draw the current price line */
        if (index === data.filter((i, index) => index >= candlesToIgnore).length - 1) drawLine(context, tailMarginLeft, 0, 0, 0, '', true);
        /* Draw volume candles */
        if (maxVolume) drawVolumeCandle(context, accumulatedWith, i.open, i.close, i.volume, maxVolume, candleWidth, canvas.height);
      }
    });
  }, [candleWidth, data, bgColor]);

  return <canvas ref={canvasRef} />;
};
export default Chart;
