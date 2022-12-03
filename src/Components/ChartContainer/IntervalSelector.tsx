import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

export const IntervalSelector = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const options = [
    '1m',
    '5m',
    '15m',
    '1h',
    '4h',
    '12h',
    '1d',
    '3d',
    '1w'
  ];
  const history = useHistory();
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentInterval = searchParams.get('interval');

    if (selectedValue) {
      searchParams.set('interval', selectedValue);
    } else if (currentInterval) {
      // keep the existing interval if it's set
      searchParams.set('interval', currentInterval);
      setSelectedValue(currentInterval);
    } else {
      // default to '1d' if no interval is set
      searchParams.set('interval', '1d');
      setSelectedValue('1d');
    }

    history.replace({
      search: searchParams.toString()
    });
  }, [selectedValue]);
  return (
    <>
      <select
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          background: 'lightGray',
          opacity: 0.3
        }}
        value={selectedValue}
        onChange={(e) => {
          setSelectedValue(e.target.value);
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};
