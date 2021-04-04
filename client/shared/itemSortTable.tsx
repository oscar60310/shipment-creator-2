import { useQuery } from '@apollo/react-hooks';
import { Button, MenuItem } from '@blueprintjs/core';
import { ItemPredicate, Select } from '@blueprintjs/select';
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

export const filterItem: ItemPredicate<products_products> = (
  query,
  item,
  _index,
  exactMatch
) => {
  const normalizedTitle = item.name.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMatch) {
    return normalizedTitle === normalizedQuery;
  } else {
    return (
      `${item.displayId}. ${normalizedTitle}`.indexOf(normalizedQuery) >= 0
    );
  }
};

interface Props {
  productSort: products_products[];
  onUpdate: (newValue: products_products[]) => void;
}

const ItemSortTable: FunctionComponent<Props> = ({ productSort, onUpdate }) => {
  const { data: productList } = useQuery<products>(GET_PRODUCTS);

  return (
    <>
      <ProductSelect
        items={
          productList?.products.filter(
            product =>
              productSort.findIndex(
                selectedProduct => selectedProduct.id === product.id
              ) === -1
          ) || []
        }
        itemRenderer={renderProductMenuItem}
        onItemSelect={item => {
          onUpdate([...productSort, item]);
        }}
        itemPredicate={filterItem}
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

        <ReactSortable list={productSort} setList={onUpdate} tag="tbody">
          {productSort.map(product => (
            <tr key={product.id}>
              <td style={{ verticalAlign: 'middle' }}>{product.displayId}</td>
              <td style={{ verticalAlign: 'middle' }}>{product.name}</td>
              <td>
                <Button
                  icon="remove"
                  onClick={() => {
                    onUpdate(
                      productSort.filter(
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
