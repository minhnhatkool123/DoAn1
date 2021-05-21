import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { orderDisplayState } from '../recoil/orderDisplayState';
import OrderDetail from './OrderDetail';

const orders = [
  {
    id: 19898498,
    date: '21/01/2021',
    totalPrice: 597000,
    status: 3,
    cart: [
      {
        id: '5Mhttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K204/9309183555_1159735690.jpg',
        product: {
          color: "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K204/9309183555_1159735690.jpg",
          id: "5Mhttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K204/9309183555_1159735690.jpg",
          name: "Áo Thun Tay Dài Hình Gấu K204",
          price: 199000,
          size: "M"
        },
        quantity: 3
      }
    ]
  },
  {
    id: 19815898,
    date: '21/01/2021',
    totalPrice: 597000,
    status: 3,
    cart: [
      {
        id: '5Mhttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K204/9309183555_1159735690.jpg',
        product: {
          color: "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K204/9309183555_1159735690.jpg",
          id: "5Mhttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K204/9309183555_1159735690.jpg",
          name: "Áo Thun Tay Dài Hình Gấu K204",
          price: 199000,
          size: "M"
        },
        quantity: 3
      }
    ]
  }
];

function OrderHistory() {
  const [orderDisplay, setOrderDisplay] = useRecoilState(orderDisplayState);
  const [currentOrder, setCurrentOrder] = useState({});

  const handleViewDetailClick = (order) => {
    setCurrentOrder(order);
    console.log({order});
    setOrderDisplay(true);
  }

  return (
    <React.Fragment>
      <div className="info-title">Lịch sử mua hàng</div>
      <div className="divider"></div>

      <table className="order-history" width="100%">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Ngày</th>
            <th>Tổng đơn</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.totalPrice.toLocaleString()}đ</td>
              <td>Giao thành công</td>
              <td><span className="view-detail-btn" onClick={() => handleViewDetailClick(order)}>Xem chi tiết</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      {orderDisplay && <OrderDetail order={currentOrder} />}
    </React.Fragment>
  )
}

export default OrderHistory
