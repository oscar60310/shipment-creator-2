import { EditableOrderDetail } from './orderModel';

export const validateOrder = (order: EditableOrderDetail): string[] => {
  const issues: string[] = [];
  // Item duplicate
  order.orderItem.forEach((item, index) => {
    if (
      item.product &&
      order.orderItem
        .filter((_, otherItemIndex) => otherItemIndex !== index)
        .findIndex(
          otherItem =>
            otherItem.product && otherItem.product.id === item.product.id
        ) !== -1
    )
      issues.push(`產品 ${item.product.name} 重複了`);
  });
  // Empty product
  if (!order.orderItem.every(item => Boolean(item.product))) {
    issues.push(`有些產品沒有選擇，試著刪除沒有用到的品項`);
  }

  return issues;
};
