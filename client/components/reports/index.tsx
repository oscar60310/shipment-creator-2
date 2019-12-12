import React, { useEffect, useState } from 'react';
import { Divider } from '@blueprintjs/core';
import MonthPicker from '../../utilities/monthPicker';

const Reports = () => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 className="bp3-heading">報表</h2>
      <MonthPicker onSelect={console.log} />
      <Divider />
    </div>
  );
};

export default Reports;
