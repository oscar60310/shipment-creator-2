import React from 'react';
import { orderDetail_order_orderItem } from '../../generated/orderDetail';

const verticalCenter = {
  verticalAlign: 'middle'
};

const ReadOnlyOrderItem = (props: {
  data: Partial<orderDetail_order_orderItem>;
}) => {
  const { data } = props;
  return (
    <tr>
      <td style={verticalCenter}>{data.product.name}</td>
      <td style={verticalCenter}>{data.product && data.product.unit}</td>
      <td style={verticalCenter}>{data.price}</td>
      <td style={verticalCenter}>{data.quantity}</td>
      <td style={verticalCenter}>
        {data.price && data.quantity && (data.price * data.quantity).toFixed(2)}
      </td>
      <td></td>
    </tr>
  );
};

export default ReadOnlyOrderItem;
