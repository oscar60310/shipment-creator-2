import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { Select } from '@blueprintjs/select';
import { MenuItem, Button } from '@blueprintjs/core';

const MONTH_DISPLAY = 5;

export interface TimeRange {
  gt: Date;
  lt: Date;
}

interface MonthOptions {
  display: string;
  value: TimeRange;
}

const list: MonthOptions[] = [];

for (let monthBefore = 0; monthBefore < MONTH_DISPLAY; monthBefore++) {
  const targetTime = dayjs().add(-1 * monthBefore, 'M');
  list.push({
    display: targetTime.format('YYYY 年 MM 月'),
    value: {
      gt: targetTime.startOf('M').toDate(),
      lt: targetTime.endOf('M').toDate()
    }
  });
}
const MonthSelect = Select.ofType<MonthOptions>();

export const renderMonthMenuItem = (
  item: MonthOptions,
  { handleClick, modifiers }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={item.display}
      onClick={handleClick}
      text={item.display}
    />
  );
};

const MonthPicker = (props: { onSelect: (range: TimeRange) => void }) => {
  const [targetMonth, setTargetMonth] = React.useState(list[0]);
  useEffect(() => props.onSelect(targetMonth.value), [targetMonth]);
  return (
    <MonthSelect
      items={list}
      itemRenderer={renderMonthMenuItem}
      onItemSelect={item => {
        setTargetMonth(item);
      }}
      filterable={false}
    >
      <Button
        text={targetMonth ? targetMonth.display : ''}
        rightIcon="double-caret-vertical"
        style={{ width: '100%' }}
      />
    </MonthSelect>
  );
};

export default MonthPicker;
