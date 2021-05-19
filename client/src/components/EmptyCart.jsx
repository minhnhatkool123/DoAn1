import React from 'react';
import "../scss/emptyCart.scss";

function EmptyCart() {
  return (
    <div className="empty-cart">
      <img src="/img/empty_cart.jpg" alt="" />
      <div className="message">Giỏ hàng của bạn chưa có sản phẩm nào</div>
    </div>
  )
}

export default EmptyCart
