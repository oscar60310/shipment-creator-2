import React from 'react';
import { ReportGeneratorProps } from './reportModel';
import { GET_SYSTEM_INFO } from '../../queries/info';
import dayjs from 'dayjs';
import { useQuery } from '@apollo/react-hooks';
import { systemInfo } from '../../generated/systemInfo';
import { Spinner } from '@blueprintjs/core';

const WithCustomerInfo = (
  props: ReportGeneratorProps & { children: any; total: number }
) => {
  const { month, children, customer, total } = props;
  const { data: config, loading } = useQuery<systemInfo>(GET_SYSTEM_INFO);
  if (loading) return <Spinner />;

  return (
    <>
      <h2 style={{ textAlign: 'center', width: '100%' }}>
        <span>{config.systemInfo.companyName}</span>
        <span style={{ margin: 5 }}>
          {month.getFullYear()} 年 {month.getMonth() + 1} 月
        </span>
        <span>月結單</span>
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
