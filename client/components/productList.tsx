import React, { useState, useEffect } from 'react';
import {
  Button,
  ControlGroup,
  InputGroup,
  FormGroup,
  Card,
  Elevation,
  ButtonGroup,
  Callout
} from '@blueprintjs/core';
import { pick } from 'lodash';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  CREATE_PRODUCT
} from '../queries/product';
import { products_products, products } from '../generated/products';
import {
  updateProductVariables,
  updateProduct
} from '../generated/updateProduct';
import CustomDialog from './customDialog';
import { createProduct } from '../generated/createProduct';

const ProductCard = (props: {
  data: products_products;
  onDelete: (id: string) => void;
}) => {
  const [data, setData] = useState(props.data);
  useEffect(() => setData(props.data), [props.data]);
  const [update, { loading: updateLoading }] = useMutation<
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
            update({
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
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [creationData, setCreationData] = useState({
    name: '',
    price: 0,
    unit: ''
  });

  const [create, { loading: createLoading, error: createError }] = useMutation<
    createProduct
  >(CREATE_PRODUCT, {
    onCompleted: ({ createProduct }) => {
      client.writeData({
        data: { products: [...data.products, createProduct] }
      });
      setCreateDialogOpen(false);
      setCreationData({ name: '', price: 0, unit: '' });
    }
  });

  const removeProduct = id =>
    client.writeData({
      data: { products: data.products.filter(product => product.id !== id) }
    });
  const createForm = (
    <>
      <FormGroup label="名稱" labelFor="name-input">
        <InputGroup
          id="name-input"
          placeholder="白菜"
          onChange={e =>
            setCreationData({ ...creationData, name: e.target.value })
          }
          defaultValue=""
        />
      </FormGroup>
      <ControlGroup fill={true} vertical={false}>
        <FormGroup label="單位" labelFor="unit-input">
          <InputGroup
            id="unit-input"
            placeholder="斤"
            defaultValue=""
            onChange={e =>
              setCreationData({ ...creationData, unit: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup label="參考價格" labelFor="price-input">
          <InputGroup
            id="price-input"
            defaultValue="0"
            type="number"
            onChange={e =>
              setCreationData({
                ...creationData,
                price: Number(e.target.value)
              })
            }
          />
        </FormGroup>
      </ControlGroup>
      {createError && (
        <Callout intent="danger" title="建立失敗">
          {createError.message}
        </Callout>
      )}
    </>
  );
  return (
    <div style={{ overflow: 'auto', height: '100%' }}>
      <h2 className="bp3-heading">商品列表</h2>
      <Button icon="plus" onClick={() => setCreateDialogOpen(true)}>
        新增
      </Button>
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
      <CustomDialog
        isOpen={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        footer={
          <Button
            minimal
            loading={createLoading}
            onClick={() => {
              create({ variables: { data: creationData } });
            }}
          >
            建立
          </Button>
        }
        content={createForm}
        title="建立產品"
      />
    </div>
  );
};

export default ProductList;
