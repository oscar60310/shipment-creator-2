import React from 'react';
import { ReportGeneratorProps } from './reportModel';
import dayjs from 'dayjs';
import { Button } from '@blueprintjs/core';
import { useLazyQuery } from '@apollo/react-hooks';
import {
  detailReport,
  detailReportVariables,
  detailReport_monthlyDetailReport
} from '../../generated/detailReport';
import { GET_DETAIL_REPORT } from '../../queries/report';
import { cattyDisplay } from '../../utilities/unitConvertor';
import ReactToPrint from 'react-to-print';
import WithCustomerInfo from './withCustomerInfo';

const DetailReportGenerator = (props: ReportGeneratorProps) => {
  const { customer, month } = props;
  const [query, { loading, data }] = useLazyQuery<
    detailReport,
    detailReportVariables
  >(GET_DETAIL_REPORT, { fetchPolicy: 'network-only' });
  const reportRef = React.useRef();
  const getTotal = () => {
    if (!data || !data.monthlyDetailReport) return 0;
    return data.monthlyDetailReport.reduce(
      (subTotal, row) => subTotal + row.price * row.quantity,
      0
    );
  };
  return (
    <div>
      <Button
        disabled={!customer || !month}
        fill={false}
        intent="primary"
        loading={loading}
        onClick={() => {
          query({
            variables: {
              where: {
                customerId: customer.id,
                month
              }
            }
          });
        }}
        style={{ marginRight: 10 }}
      >
        建立報表
      </Button>
      <ReactToPrint
        trigger={() => (
          <Button
            disabled={!data || !data.monthlyDetailReport}
            intent="success"
          >
            列印
          </Button>
        )}
        content={() => reportRef.current}
      />

      {data && data.monthlyDetailReport && (
        <div ref={reportRef}>
          <WithCustomerInfo {...props} total={getTotal()}>
            <DetailReport data={data.monthlyDetailReport} />
          </WithCustomerInfo>
        </div>
      )}
    </div>
  );
};

const DetailReport = (props: { data: detailReport_monthlyDetailReport[] }) => {
  const { data } = props;

  const row = (detail: detailReport_monthlyDetailReport, index: number) => {
    return (
      <tr key={index}>
        <td>{detail.orderNumber}</td>
        <td>{dayjs(detail.orderTime).format('YYYY-MM-DD')}</td>
        <td>{detail.productName}</td>
        <td>{detail.unit}</td>
        <td>{detail.price}</td>
        <td>
          {detail.unit === '斤'
            ? cattyDisplay(detail.quantity)
            : detail.quantity}
        </td>
        <td>{(detail.quantity * detail.price).toFixed(2)}</td>
      </tr>
    );
  };
  return (
    <table
      className="bp3-html-table bp3-interactive bp3-html-table-striped"
      style={{ width: '100%' }}
    >
      <thead>
        <tr>
          <th>訂單編號</th>
          <th>日期</th>
          <th>產品</th>
          <th>單位</th>
          <th>單價</th>
          <th>數量</th>
          <th>小計</th>
        </tr>
      </thead>
      <tbody>{data.map(row)}</tbody>
    </table>
  );
};

export default DetailReportGenerator;
