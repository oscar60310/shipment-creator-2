import React from 'react';
import { ReportGeneratorProps } from './reportModel';
import { Button } from '@blueprintjs/core';
import { useLazyQuery } from '@apollo/react-hooks';
import {
  productReport,
  productReportVariables,
  productReport_byProductReport
} from '../../generated/productReport';
import { GET_PRODUCT_REPORT } from '../../queries/report';
import { cattyDisplay } from '../../utilities/unitConvertor';

const ProductReportGenerator = (props: ReportGeneratorProps) => {
  const { customer, month } = props;
  const [query, { loading, data }] = useLazyQuery<
    productReport,
    productReportVariables
  >(GET_PRODUCT_REPORT, { fetchPolicy: 'network-only' });
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
      >
        建立報表
      </Button>
      {data && data.byProductReport && (
        <ProductReport data={data.byProductReport} />
      )}
    </div>
  );
};

const ProductReport = (props: { data: productReport_byProductReport[] }) => {
  const { data } = props;

  const row = (detail: productReport_byProductReport, index: number) => {
    return (
      <tr key={index}>
        <td>{detail.productName}</td>
        <td>{detail.unit}</td>
        <td>
          {detail.unit === '斤'
            ? cattyDisplay(detail.quantity)
            : detail.quantity}
        </td>
        <td>{detail.subTotal.toFixed(2)}</td>
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
          <th>產品</th>
          <th>單位</th>
          <th>數量</th>
          <th>小計</th>
        </tr>
      </thead>
      <tbody>{data.map(row)}</tbody>
    </table>
  );
};

export default ProductReportGenerator;
