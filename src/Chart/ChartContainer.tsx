import React from 'react';

type IState = {
    data?: string;
}

type IProps = {
    randomProp: string;
    rp: string;
}

const ChartContainer : React.FunctionComponent<IState & IProps> = ({randomProp, rp}) => {
  return (
    <p>Hello world</p>
  );
}

export default ChartContainer;
