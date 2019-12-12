import React from 'react';
import { Divider, FormGroup, RadioGroup, Radio } from '@blueprintjs/core';
import MonthPicker from '../../utilities/monthPicker';
import CustomerSelector from '../../utilities/customerSelect';

enum ReportType {
  DETAIL = 'DETAIL',
  PRODUCT_AND_PRICE = 'PRODUCT_AND_PRICE',
  PRODUCT = 'PRODUCT'
}

const Reports = () => {
  const [reportType, setReportType] = React.useState(ReportType.DETAIL);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 className="bp3-heading">報表</h2>
      <div style={{ display: 'flex' }}>
        <FormGroup label="客戶" style={{ marginRight: 10 }}>
          <CustomerSelector />
        </FormGroup>
        <FormGroup label="月份" style={{ marginRight: 10 }}>
          <MonthPicker onSelect={console.log} />
        </FormGroup>
        <RadioGroup
          label="報表種類"
          selectedValue={reportType}
          onChange={(e: any) => setReportType(e.target.value)}
          inline
        >
          <Radio label="詳細資料" value={ReportType.DETAIL} />
          <Radio label="產品 + 價格" value={ReportType.PRODUCT_AND_PRICE} />
          <Radio label="產品" value={ReportType.PRODUCT} />
        </RadioGroup>
      </div>
      <Divider />
    </div>
  );
};

export default Reports;
