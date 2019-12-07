import React, { useEffect } from 'react';
import { NumericInput } from '@blueprintjs/core';
import {
  cattyToCattyAndTael,
  cattyAndTaelToCatty
} from '../utilities/unitConvertor';

const tableMiddle = {
  verticalAlign: 'middle'
};

const CattyQuantityInput = (props: {
  value: number;
  onValueChange?: (value: number) => void;
}) => {
  const { value, onValueChange } = props;

  const [data, setData] = React.useState(cattyToCattyAndTael(value));
  useEffect(() => {
    setData(cattyToCattyAndTael(value));
  }, [value]);
  useEffect(() => {
    if (onValueChange) {
      onValueChange(cattyAndTaelToCatty(data.catty, data.tael));
    }
  }, [data.catty, data.tael]);
  return (
    <div style={{ display: 'flex' }}>
      <NumericInput
        fill
        value={data.catty}
        onValueChange={newValue => {
          setData({
            ...data,
            catty: newValue
          });
        }}
      />
      <div style={{ ...tableMiddle, margin: 'auto 5px' }}>斤</div>
      <NumericInput
        fill
        value={data.tael}
        onValueChange={newValue => {
          setData({
            ...data,
            tael: newValue
          });
        }}
      />
      <div style={{ ...tableMiddle, margin: 'auto 5px' }}>兩</div>
    </div>
  );
};

const QuantityInput = (props: {
  unit: string;
  value: number;
  onValueChange: (value: number) => void;
}) => {
  const { unit, value, onValueChange } = props;
  switch (unit) {
    case '斤':
      return (
        <CattyQuantityInput
          value={value}
          onValueChange={newValue => {
            onValueChange(newValue);
          }}
        />
      );
    default:
      return (
        <NumericInput
          fill
          value={value}
          onValueChange={newValue => {
            onValueChange(newValue);
          }}
        />
      );
  }
};
export default QuantityInput;
