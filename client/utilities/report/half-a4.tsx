import ReactDOM from 'react-dom';
import React from 'react';
import dayjs from 'dayjs';
import { orderDetail_order } from '../../generated/orderDetail';
import { systemInfo_systemInfo } from '../../generated/systemInfo';
import { cattyDisplay } from '../unitConvertor';

const FONT_SIZE = 12;
const center: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};
/**
 * 21.49cm x 14.00cm 10mm border
 * @param props
 */
export const HalfA4Report = (props: {
  order: orderDetail_order;
  config: systemInfo_systemInfo;
  page: number;
  totalPage: number;
  totalPrice: number;
}) => {
  const { order, config } = props;
  const totalPrice = order.orderItem.reduce<number>((price, item) => {
    return price + item.price * item.quantity;
  }, 0);
  return (
    <div
      className="half-a4"
      style={{
        width: '100%',
        height: '61vw',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        marginBottom: props.page === props.totalPage ? 0 : 15
      }}
    >
      <div style={{ textAlign: 'center', fontSize: '18pt' }}>
        {config.companyName}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ ...center, flex: '0 0 30%', fontSize: `${FONT_SIZE}pt` }}>
          <div>{config.companyAddress}</div>
          <div>{config.companyPhone}</div>
        </div>
        <div style={{ textAlign: 'center', fontSize: '18pt' }}>出貨單</div>
        <div
          style={{
            ...center,
            flex: '0 0 30%',
            textAlign: 'right',
            fontSize: `${FONT_SIZE}pt`
          }}
        >
          <div>
            頁次: {props.page}/{props.totalPage}
          </div>
          <div>出貨日期: {dayjs(order.orderTime).format('YYYY/MM/DD')}</div>
        </div>
      </div>
      <div
        className="bf fc"
        style={{ fontSize: `${FONT_SIZE}pt`, flex: '1 1 0' }}
      >
        <div className="bb" style={{ display: 'flex' }}>
          <div className="br p3">客戶寶號</div>
          <div style={{ flex: '1 1 0' }} className="br p3">
            {order.customer.name}
          </div>
          <div className="br p3">客戶地址</div>
          <div className="p3" style={{ flex: '1 1 0' }}>
            {order.customer.address}
          </div>
        </div>
        <div style={{ display: 'flex', flex: '1 1 0' }}>
          <div className="fc" style={{ flex: '1 1 0' }}>
            <div className="item bb">
              <div>
                <div>品項</div>
                {order.orderItem.map(x => (
                  <div key={x.id}>{x.product.name}</div>
                ))}
              </div>
              <div>
                <div>單位</div>
                {order.orderItem.map(x => (
                  <div key={x.id}>{x.product.unit}</div>
                ))}
              </div>
              <div>
                <div>單價</div>
                {order.orderItem.map(x => (
                  <div key={x.id}>{x.price}</div>
                ))}
              </div>
              <div>
                <div>數量</div>
                {order.orderItem.map(item => (
                  <div key={item.id}>
                    {item.product.unit !== '斤'
                      ? item.quantity
                      : cattyDisplay(item.quantity)}
                  </div>
                ))}
              </div>
              <div>
                <div>小計</div>
                {order.orderItem.map(item => (
                  <div key={item.id}>
                    {(item.price * item.quantity).toFixed(2)}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="p3"
              style={{
                ...center,
                flex: '1 1 0',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <span>訂單編號: {order.orderNumber}</span>
              <span>
                本單金額: {totalPrice.toFixed(0)}, 總金額:{' '}
                {props.totalPrice.toFixed(0)}
              </span>
            </div>
          </div>
          <div
            style={{
              flex: '0 0 20%',
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}
            className="bl"
          >
            <div style={{ flex: '1 1 0', width: '100%' }}>
              <div className="tc bb p3">備註</div>
            </div>
            <div style={{ flex: '1 1 0', width: '100%' }}>
              <div className="tc by p3">客戶簽章</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const createHalfA4Report = (
  order: orderDetail_order,
  config: systemInfo_systemInfo
) => {
  const re = window.open('', '', 'width=1000,height=500');
  if (!re) {
    throw 'Window open failed';
  }
  const el = document.createElement('div');
  const orderSplit: orderDetail_order[] = [];
  for (let i = 0; i < order.orderItem.length; i += 11) {
    orderSplit.push({ ...order, orderItem: order.orderItem.slice(i, i + 11) });
  }
  const totalPrice = order.orderItem.reduce<number>(
    (price, item) => price + item.price * item.quantity,
    0
  );
  ReactDOM.render(
    <>
      {orderSplit.map((x, i) => (
        <HalfA4Report
          order={x}
          key={i}
          totalPrice={totalPrice}
          totalPage={orderSplit.length}
          page={i + 1}
          config={config}
        />
      ))}
    </>,
    el
  );
  re.document.body.appendChild(el);
  const style = document.createElement('style');
  style.innerHTML = `.half-a4 .bt {
    border-top: 1px solid black;
 }
  .half-a4 .bb {
    border-bottom: 1px solid black;
 }
  .half-a4 .br {
    border-right: 1px solid black;
 }
  .half-a4 .bl {
    border-left: 1px solid black;
 }
  .half-a4 .bx {
    border-right: 1px solid black;
    border-left: 1px solid black;
 }
  .half-a4 .by {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
 }
  .half-a4 .bf {
    border: 1px solid black;
 }
  .half-a4 .p3 {
    padding: 3px;
 }
  .half-a4 .fc {
    display: flex;
    flex-direction: column;
 }
  .half-a4 .tc {
    text-align: center;
 }
  .half-a4 .item {
    display: flex;
    flex: 0 0 300px;
 }
  .half-a4 .item > div:nth-child(1) {
    width: 40%;
 }
  .half-a4 .item > div:nth-child(2) {
    width: 10%;
 }
  .half-a4 .item > div:nth-child(3) {
    width: 10%;
 }
  .half-a4 .item > div:nth-child(4) {
    width: 20%;
 }
  .half-a4 .item > div:nth-child(5) {
    border-right: none;
    width: 20%;
 }
  .half-a4 .item > div {
    border-right: 1px solid black;
    height: 100%;
 }
  .half-a4 .item > div > div:nth-child(12) {
    border-bottom: none;
 }
  .half-a4 .item > div > div {
    border-bottom: 1px solid black;
    padding: 3px;
    height: 18px; 
 }
 body{
   margin: 0;
   box-sizing: border-box;
   font-weight: 600;
 }
  `;
  re.document.head.appendChild(style);
  setTimeout(() => {
    re.print();
  }, 500);
  // re.onfocus = () => {
  //   setTimeout(() => {
  //     re.close();
  //   }, 500);
  // };
};
