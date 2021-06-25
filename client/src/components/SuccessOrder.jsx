import React from 'react';
import '../scss/successOrder.scss';

function SuccessOrder() {
  return (
    <div className="success-order">
      <img src="/img/congrats.png" alt="" />
      <div className="success-order-message">Đơn hàng của bạn đã được <span>ZShop</span> ghi nhận</div>
    </div>
  );
}

export default SuccessOrder;