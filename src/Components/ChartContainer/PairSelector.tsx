import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { DEFAULT_SYMBOL } from '../../Constants/constants';

interface IPairSelector {
  pairs: string[];
}

export const PairSelector: React.FC<IPairSelector> = ({ pairs }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const options = pairs.sort();
  const history = useHistory();
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentInterval = searchParams.get('symbol');

    if (selectedValue) {
      searchParams.set('symbol', selectedValue);
    } else if (currentInterval) {
      // keep the existing interval if it's set
      searchParams.set('symbol', currentInterval);
      setSelectedValue(currentInterval);
    } else {
      // default to '1d' if no interval is set
      searchParams.set('symbol', DEFAULT_SYMBOL);
      setSelectedValue(DEFAULT_SYMBOL);
    }

    history.replace({
      search: searchParams.toString()
    });
  }, [selectedValue]);
  return (
    <>
      <select
        style={{
          background: 'lightGray',
          opacity: 0.3
        }}
        value={selectedValue}
        onChange={(e) => {
          setSelectedValue(e.target.value);
        }}
      >
        <input />
        {options?.length > 0 && options?.map((option: any) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};
