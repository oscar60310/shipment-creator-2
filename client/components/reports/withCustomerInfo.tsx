import React from 'react';
import { ReportGeneratorProps } from './reportModel';
import dayjs from 'dayjs';

const WithCustomerInfo = (
  props: ReportGeneratorProps & { children: any; total: number }
) => {
  const { month, children, customer, total } = props;
  return (
    <>
      <h2 style={{ textAlign: 'center', width: '100%' }}>
        {month.getFullYear()} 年 {month.getMonth() + 1} 月月結單
      </h2>
      <h2 style={{ textAlign: 'center', width: '100%' }}>{customer.name}</h2>
      {children}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>列印日期: {dayjs().format('YYYY-MM-DD HH:mm:ss')}</div>
        <h3>總金額: {total.toFixed(0)}</h3>
      </div>
    </>
  );
};

export default WithCustomerInfo;
