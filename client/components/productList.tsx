import React, { useState, useEffect } from 'react';
import {
  Button,
  ControlGroup,
  InputGroup,
  FormGroup,
  Card,
  Elevation,
  ButtonGroup
} from '@blueprintjs/core';
import { pick } from 'lodash';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_PRODUCTS, UPDATE_PRODUCT } from '../queries/product';
import { products_products, products } from '../generated/products';
import {
  updateProductVariables,
  updateProduct
} from '../generated/updateProduct';

const ProductCard = (props: {
  data: products_products;
  onDelete: (id: string) => void;
}) => {
  const [data, setData] = useState(props.data);
  useEffect(() => setData(props.data), [props.data]);
  const [updateProduct, { loading: updateLoading }] = useMutation<
    updateProduct,
    updateProductVariables
  >(UPDATE_PRODUCT);
  const [deleteProduct, { loading: deleteLoading }] = useMutation<
    updateProduct,
    updateProductVariables
  >(UPDATE_PRODUCT, {
    variables: { id: data.id, data: { enable: false } },
    onCompleted: () => {
      props.onDelete(data.id);
    }
  });

  return (
    <Card elevation={Elevation.TWO}>
      <div>編號: {data.displayId}</div>
      <ControlGroup fill vertical={false}>
        <FormGroup label="名稱" labelFor={`Item-${data.id}-name`}>
          <InputGroup
            id={`Item-${data.id}-name`}
            placeholder="胡蘿蔔"
            defaultValue={data.name}
            onChange={e => setData({ ...data, name: e.target.value })}
          />
        </FormGroup>
        <FormGroup
          label="單位"
          labelFor={`Item-${data.id}-unit`}
          style={{ flexBasis: 60, flexShrink: 0 }}
        >
          <InputGroup
            id={`Item-${data.id}-unit`}
            placeholder="斤"
            defaultValue={data.unit}
            onChange={e => setData({ ...data, unit: e.target.value })}
          />
        </FormGroup>
        <FormGroup
          label="參考價格"
          labelFor={`Item-${data.id}-price`}
          style={{ flexBasis: 60, flexShrink: 0 }}
        >
          <InputGroup
            id={`Item-${data.id}-price`}
            placeholder="100"
            defaultValue={data.price.toString()}
            type="number"
            onChange={e => setData({ ...data, price: Number(e.target.value) })}
          />
        </FormGroup>
      </ControlGroup>
      <ButtonGroup minimal={true}>
        <Button
          loading={updateLoading}
          intent="primary"
          onClick={() => {
            updateProduct({
              variables: {
                id: data.id,
                data: pick(data, 'price', 'name', 'unit')
              }
            });
          }}
        >
          更新
        </Button>
        <Button
          loading={deleteLoading}
          intent="danger"
          onClick={() => {
            deleteProduct();
          }}
        >
          刪除
        </Button>
      </ButtonGroup>
    </Card>
  );
};
const ProductList = () => {
  const { data, client } = useQuery<products>(GET_PRODUCTS);
  const removeProduct = id =>
    client.writeData({
      data: { products: data.products.filter(product => product.id !== id) }
    });
  return (
    <div>
      <h2 className="bp3-heading">商品列表</h2>
      <Button icon="plus">新增</Button>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data &&
          data.products.map(product => (
            <div
              key={product.id}
              style={{ margin: 5, width: 'calc(50% - 10px)' }}
            >
              <ProductCard
                data={product}
                key={product.id}
                onDelete={removeProduct}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
