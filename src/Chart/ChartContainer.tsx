import React from 'react';
import Canvas from "./Canvas"
type IState = {
    data?: string;
}

type IProps = {
    randomProp: string;
    rp: string;
}

const ChartContainer : React.FunctionComponent<IState & IProps> = ({randomProp, rp}) => {
  return (
    <Canvas />
  );
}

export default ChartContainer;
