import { useQuery } from '@apollo/react-hooks';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import React, { FunctionComponent } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { products, products_products } from '../generated/products';
import { GET_PRODUCTS } from '../queries/product';

const ProductSelect = Select.ofType<products_products>();

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
      text={`[${item.displayId}] ${item.name}`}
    />
  );
};

const ItemSortTable: FunctionComponent = () => {
  const { data: productList } = useQuery<products>(GET_PRODUCTS);

  const [selectedProduct, setSelectedProduct] = React.useState<
    products_products[]
  >([]);

  return (
    <>
      <ProductSelect
        items={
          productList?.products.filter(
            product =>
              selectedProduct.findIndex(
                selectedProduct => selectedProduct.id === product.id
              ) === -1
          ) || []
        }
        itemRenderer={renderProductMenuItem}
        onItemSelect={item => {
          setSelectedProduct([...selectedProduct, item]);
        }}
      >
        <Button text="請選擇要加入的產品" rightIcon="caret-down" />
      </ProductSelect>

      <table
        className="bp3-html-table bp3-interactive bp3-html-table-striped"
        style={{ width: '100%' }}
      >
        <thead>
          <tr>
            <th>產品編號</th>
            <th>名稱</th>
            <th>移除</th>
          </tr>
        </thead>

        <ReactSortable
          list={selectedProduct}
          setList={setSelectedProduct}
          tag="tbody"
        >
          {selectedProduct.map(product => (
            <tr key={product.id}>
              <td>{product.displayId}</td>
              <td>{product.name}</td>
              <td>
                <Button
                  icon="remove"
                  onClick={() => {
                    setSelectedProduct(
                      selectedProduct.filter(
                        selectedProduct => selectedProduct.id !== product.id
                      )
                    );
                  }}
                />
              </td>
            </tr>
          ))}
        </ReactSortable>
      </table>
    </>
  );
};

export default ItemSortTable;
