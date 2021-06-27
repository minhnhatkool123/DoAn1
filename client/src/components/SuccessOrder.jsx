import React, { useEffect} from 'react';
import '../scss/successOrder.scss';

function SuccessOrder() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="success-order">
      <img src="/img/congrats.png" alt="" />
      <div className="success-order-message">Đơn hàng của bạn đã được <span>ZShop</span> ghi nhận</div>
    </div>
  );
}

export default SuccessOrder;