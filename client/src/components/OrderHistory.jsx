import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { orderDisplayState } from '../recoil/orderDisplayState';
import { userState } from '../recoil/userState';
import OrderDetail from './OrderDetail';
import { useQuery } from 'react-query';
import axios from 'axios';

// const orders = [
//   {
//     id: 19815898,
//     date: '21/01/2021',
//     totalPrice: 950000,
//     status: 3,
//     name: 'Phương Thùy',
//     phone: '0187264727',
//     email: 'phuongthuy@gmail.com',
//     address: '53 Nguyễn Du, Thành phố Dĩ An, Bình Dương',
//     note: 'Giao giờ hành chính',
//     paymentMethod: 'Thanh toán tiền mặt khi nhận hàng',
//     shippingFee: 25000,
//     cart: [
//       {
//         id: "undefinedLhttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/ChanVay/GV589/18920165882_1159735690.jpg",
//         product: {
//           color: "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/ChanVay/GV589/18920165882_1159735690.jpg",
//           id: "undefinedLhttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/ChanVay/GV589/18920165882_1159735690.jpg",
//           name: "Chân Váy Caro Nữ Sinh Nhật 589",
//           price: 245000,
//           discount: 20000,
//           size: "L",
//           url: "/product/60af5e60dbc87f8dfa279f39"
//         },
//         quantity: 1
//       },
//       {
//         id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K252/13888927764_1159735690.jpg",
//         product: {
//           color: "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K252/13888927764_1159735690.jpg",
//           id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K252/13888927764_1159735690.jpg",
//           name: "Áo Thun Hoodie Nữ Baby K252",
//           price: 240000,
//           discount: 10000,
//           size: "Freesize",
//           url: "/product/60af5e5f4c6dd49b6d98882b"
//         },
//         quantity: 2
//       },
//       {
//         id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
//         product: {
//           color: "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
//           id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
//           name: "Áo Khoác Nhẹ In Hình Cô Gái 999",
//           price: 245000,
//           discount: 5000,
//           size: "Freesize",
//           url: "/product/60af5e5d303b111c3144e31c"
//         },
//         quantity: 1
//       },
//       // {
//       //   id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
//       //   product: {
//       //     color: "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
//       //     id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
//       //     name: "Áo Khoác Nhẹ In Hình Cô Gái 999",
//       //     price: 245000,
//       //     size: "Freesize",
//       //     url: "/product/60af5e5d303b111c3144e31c"
//       //   },
//       //   quantity: 1
//       // },
//       // {
//       //   id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
//       //   product: {
//       //     color: "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
//       //     id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
//       //     name: "Áo Khoác Nhẹ In Hình Cô Gái 999",
//       //     price: 245000,
//       //     size: "Freesize",
//       //     url: "/product/60af5e5d303b111c3144e31c"
//       //   },
//       //   quantity: 1
//       // }
//     ]
//   }
// ];

function OrderHistory() {
  const [orderDisplay, setOrderDisplay] = useRecoilState(orderDisplayState);
  const [currentOrder, setCurrentOrder] = useState({});

  const user = useRecoilValue(userState);

  const { data, isLoading } = useQuery('userOrders', async () => {
    const config = {
      headers: {
        Authorization: user.accessToken
      }
    }
    const response = await axios.get(`http://localhost:5000/api/order/get-by-user/${user._id}`, config);
    console.log(response.data);
    return response.data;
  })

  const handleViewDetailClick = (order) => {
    setCurrentOrder(order);
    console.log({ order });
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
          {data?.orders.map(order => (
            <tr key={order._id}>
              <td>{order.idOrder}</td>
              <td>{new Date(order.date).toLocaleString("en-GB").slice(0, 10)}</td>
              <td>{order.total.toLocaleString()}đ</td>
              <td>{getStatus(order.status)}</td>
              <td><span className="view-detail-btn" onClick={() => handleViewDetailClick(order)}>Xem chi tiết</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      {orderDisplay && <OrderDetail order={currentOrder} />}
    </React.Fragment>
  )
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

export default OrderHistory
