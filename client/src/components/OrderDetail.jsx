import React from 'react';
import '../scss/orderDetail.scss';
import { useSetRecoilState } from 'recoil';
import { orderDisplayState } from '../recoil/orderDisplayState';

function OrderDetail({ order }) {
  const setOrderDisplay = useSetRecoilState(orderDisplayState);

  return (
    <React.Fragment>
      <div id="overlay" onClick={() => setOrderDisplay(false)}></div>
      <div className="order-detail">
        <table className="order-cart-list" width="100%">
          <thead>
            <tr>
              <th width="10%">Ảnh</th>
              <th width="40%">Sản phẩm</th>
              <th width="15%">Số lượng</th>
              <th width="15%">Đơn giá</th>
              <th width="20%">Thành tiền</th>
            </tr>
          </thead>

          <tbody className="order-cart-detail">
            {order.cart.map(item => (
              <tr key={item.id}>
                <td className="product-color-container">
                  <div className="product-color" style={{ backgroundImage: `url(${item.product.color})` }}></div>
                </td>
                <td className="product-description">{`${item.product.name} - ${item.product.size}`}</td>
                <td className="product-quantity">{item.quantity}</td>
                <td className="product-unit-price">{item.product.price.toLocaleString()}đ</td>
                <td className="product-total-price">{(item.product.price * item.quantity).toLocaleString()}đ</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="extra-info">
          <ul className="buyer-info"></ul>
          <ul className="payment-info"></ul>
        </div>
      </div>
    </React.Fragment>
  )
}

export default OrderDetail
