import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { orderDetail_order_orderItem } from '../../generated/orderDetail';
import { products, products_products } from '../../generated/products';
import { GET_PRODUCTS } from '../../queries/product';
import { Select } from '@blueprintjs/select';
import { MenuItem, Button, Spinner, NumericInput } from '@blueprintjs/core';

const ProductSelect = Select.ofType<products_products>();
const verticalCenter = {
  verticalAlign: 'middle'
};

export const renderProductMenuItem = (
  item: products_products,
  { handleClick, modifiers }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={item.id}
      onClick={handleClick}
      text={item.name}
    />
  );
};

const OrderItem = (props: {
  data: Partial<orderDetail_order_orderItem>;
  onUpdate: (data: Partial<orderDetail_order_orderItem>) => void;
  onDelete: (data: Partial<orderDetail_order_orderItem>) => void;
}) => {
  const { data, onUpdate, onDelete } = props;
  const { data: productList, client } = useQuery<products>(GET_PRODUCTS);
  if (!productList || !productList.products)
    return (
      <tr>
        <td>
          <Spinner size={20} intent="primary" />
        </td>
      </tr>
    );
  return (
    <tr>
      <td>
        <ProductSelect
          items={productList.products}
          itemRenderer={renderProductMenuItem}
          onItemSelect={item => {
            onUpdate({ ...data, product: item, price: item.price });
          }}
          filterable={false}
        >
          <Button
            text={data.product ? data.product.name : '請選擇產品'}
            rightIcon="double-caret-vertical"
            style={{ width: '100%' }}
          />
        </ProductSelect>
      </td>
      <td style={verticalCenter}>{data.product && data.product.unit}</td>
      <td>
        <NumericInput
          value={data.price}
          onValueChange={value => {
            onUpdate({
              ...data,
              price: value
            });
          }}
        />
      </td>
      <td>
        <NumericInput
          value={data.quantity}
          onValueChange={value => {
            onUpdate({
              ...data,
              quantity: value
            });
          }}
        />
      </td>
      <td style={verticalCenter}>
        {data.price && data.quantity && (data.price * data.quantity).toFixed(2)}
      </td>
      <td>
        <Button intent="danger" icon="trash" onClick={() => onDelete(data)} />
      </td>
    </tr>
  );
};

export default OrderItem;
