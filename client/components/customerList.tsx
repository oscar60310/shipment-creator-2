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
import { customers, customers_customers } from '../generated/customers';
import {
  updateCustomerVariables,
  updateCustomer
} from '../generated/updateCustomer';
import CustomDialog from './customDialog';
import { createCustomer } from '../generated/createCustomer';
import {
  GET_CUSTOMERS,
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER
} from '../queries/customer';

const CustomerCard = (props: {
  data: customers_customers;
  onDelete: (id: string) => void;
}) => {
  const [data, setData] = useState(props.data);
  useEffect(() => setData(props.data), [props.data]);
  const [update, { loading: updateLoading }] = useMutation<
    updateCustomer,
    updateCustomerVariables
  >(UPDATE_CUSTOMER);
  const [deleteCustomer, { loading: deleteLoading }] = useMutation<
    updateCustomer,
    updateCustomerVariables
  >(UPDATE_CUSTOMER, {
    variables: { id: data.id, data: { enable: false } },
    onCompleted: () => {
      props.onDelete(data.id);
    }
  });

  return (
    <Card elevation={Elevation.TWO}>
      <div>編號: {data.displayId}</div>
      <ControlGroup fill vertical={false}>
        <FormGroup label="名稱" labelFor={`Customer-${data.id}-name`}>
          <InputGroup
            id={`Customer-${data.id}-name`}
            placeholder="XX餐廳"
            defaultValue={data.name}
            onChange={e => setData({ ...data, name: e.target.value })}
          />
        </FormGroup>
        <FormGroup
          label="地址"
          labelFor={`Customer-${data.id}-address`}
          style={{ flexBasis: 60, flexShrink: 0 }}
        >
          <InputGroup
            id={`Customer-${data.id}-address`}
            placeholder="台南市中西區xxx"
            defaultValue={data.address}
            onChange={e => setData({ ...data, address: e.target.value })}
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
                data: pick(data, 'address', 'name')
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
            deleteCustomer();
          }}
        >
          刪除
        </Button>
      </ButtonGroup>
    </Card>
  );
};
const CustomerList = () => {
  const { data, client } = useQuery<customers>(GET_CUSTOMERS);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [creationData, setCreationData] = useState({
    name: '',
    address: ''
  });

  const [create, { loading: createLoading, error: createError }] = useMutation<
    createCustomer
  >(CREATE_CUSTOMER, {
    onCompleted: ({ createCustomer }) => {
      client.writeData({
        data: { customers: [...data.customers, createCustomer] }
      });
      setCreateDialogOpen(false);
      setCreationData({ name: '', address: '' });
    }
  });

  const removeCustomer = id =>
    client.writeData({
      data: { customers: data.customers.filter(customer => customer.id !== id) }
    });
  const createForm = (
    <>
      <FormGroup label="名稱" labelFor="name-input">
        <InputGroup
          id="name-input"
          placeholder="XX餐廳"
          onChange={e =>
            setCreationData({ ...creationData, name: e.target.value })
          }
          defaultValue=""
        />
      </FormGroup>
      <ControlGroup fill={true} vertical={false}>
        <FormGroup label="地址" labelFor="address-input">
          <InputGroup
            id="address-input"
            placeholder="台南市中西區XXXX"
            defaultValue=""
            onChange={e =>
              setCreationData({ ...creationData, address: e.target.value })
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
      <h2 className="bp3-heading">客戶列表</h2>
      <Button icon="plus" onClick={() => setCreateDialogOpen(true)}>
        新增
      </Button>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data &&
          data.customers.map(customer => (
            <div
              key={customer.id}
              style={{ margin: 5, width: 'calc(100% - 10px)' }}
            >
              <CustomerCard
                data={customer}
                key={customer.id}
                onDelete={removeCustomer}
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
        title="建立客戶"
      />
    </div>
  );
};

export default CustomerList;
