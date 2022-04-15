import React from 'react';
import './Spinner.css';

const Spinner: React.FC = function () {
  return (
    <div className="center">
      <div className="wave" />
      <div className="wave" />
      <div className="wave" />
      <div className="wave" />
      <div className="wave" />
      <div className="wave" />
      <div className="wave" />
      <div className="wave" />
      <div className="wave" />
      <div className="wave" />
    </div>
  );
};

export default Spinner;
