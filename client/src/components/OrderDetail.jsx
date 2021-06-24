import React, { useState } from 'react';
import '../scss/orderDetail.scss';
import { useSetRecoilState } from 'recoil';
import { orderDisplayState } from '../recoil/orderDisplayState';
import { IoClose } from "react-icons/io5";

function OrderDetail({ order }) {
  const setOrderDisplay = useSetRecoilState(orderDisplayState);

  return (
    <React.Fragment>
      <div id="overlay" onClick={() => setOrderDisplay(false)}></div>
      <div className="order-detail">
        <div className="order-cart-list" width="100%">
          <div className="heading-id">Đơn hàng <span>#{order.id}</span></div>
          <div className="heading-title">
            <div className="product-color">Ảnh</div>
            <div className="product-description">Sản phẩm</div>
            <div className="product-quantity">Số lượng</div>
            <div className="product-unit-price">Đơn giá</div>
            <div className="product-discount">Khuyến mãi</div>
            <div className="product-total-price">Thành tiền</div>
          </div>

          <div className="order-cart-detail">
            {order.cart.map(item => (
              <div className="item-row" key={item.id}>
                <div className="product-color-container">
                  <div className="product-color" style={{ backgroundImage: `url(${item.product.color})` }}></div>
                </div>
                <div className="product-description">{`${item.product.name} - ${item.product.size}`}</div>
                <div className="product-quantity">{item.quantity}</div>
                <div className="product-unit-price">{item.product.price.toLocaleString()}đ</div>
                <div className="product-discount">{item.product.discount.toLocaleString()}đ</div>
                <div className="product-total-price">{((item.product.price - item.product.discount) * item.quantity).toLocaleString()}đ</div>
              </div>
            ))}
          </div>
        </div>

        <div className="extra-info">
          <ul className="buyer-info col-60">
            <li className="name">Tên người nhận: <span>{order.name}</span></li>
            <li className="phone">Điện thoại: <span>{order.phone}</span></li>
            <li className="email">Email: <span>{order.email}</span></li>
            <li className="note">Ghi chú: <span>{order.note}</span></li>
            <li className="address">Địa chỉ giao hàng: <span>{order.address}</span></li>
          </ul>
          <ul className="payment-info col-40">
            <li className="total-price">Tổng đơn: <span>{order.totalPrice.toLocaleString()}đ</span></li>
            <li className="shipping-fee">Phí vận chuyển: <span>{order.shippingFee.toLocaleString()}đ</span></li>
            <li className="payment-method">Trạng thái: <span>{getStatus(order.status)}</span></li>
            <li className="date">Ngày đặt: {order.date}</li>
            <li className="payment-method">{order.paymentMethod}</li>
          </ul>
        </div>

        <div className="close-btn" onClick={() => setOrderDisplay(false)}>
          <IoClose className="close-icon" />
        </div>
      </div>
    </React.Fragment>
  );
}

const getStatus = (status) => {
  switch (status) {
    case 0: return 'Chờ xác nhận';
    case 1: return 'Đã xác nhận';
    case 2: return 'Đã thanh toán';
    case 3: return 'Giao thành công';
    case 4: return 'Đã hủy';
    default: return null;
  }
}

export default OrderDetail;
