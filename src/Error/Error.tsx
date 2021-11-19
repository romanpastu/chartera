import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const Error: React.FC<RouteComponentProps> = function ({ history }) {
  return (
    <>
      <p>Error loading the site</p>
      <button onClick={() => history.push('/')}>Go back</button>
    </>
  );
};

export default Error;
