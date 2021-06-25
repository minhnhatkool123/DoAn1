import '../scss/orderManagement.scss';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { userState } from '../recoil/userState';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import { EatLoading } from 'react-loadingg';
import { TiArrowSortedDown } from "react-icons/ti";
import { orderEditDisplayState } from '../recoil/orderEditDisplayState';
import { orderDisplayState } from '../recoil/orderDisplayState';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import viewIcon from '../svg/visibility.svg';
import editIcon from '../svg/edit.svg';
import EditOrder from './EditOrder';
import OrderDetail from './OrderDetail';
import ReactPaginate from "react-paginate";

// const orders = [
//   {
//     id: 19815898,
//     date: '21/01/2021',
//     totalPrice: 1950000,
//     status: 1,
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
//       {
//         id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
//         product: {
//           color: "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
//           id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
//           name: "Áo Khoác Nhẹ In Hình Cô Gái 999",
//           price: 245000,
//           discount: 0,
//           size: "Freesize",
//           url: "/product/60af5e5d303b111c3144e31c"
//         },
//         quantity: 1
//       },
//       {
//         id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
//         product: {
//           color: "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
//           id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
//           name: "Áo Khoác Nhẹ In Hình Cô Gái 999",
//           price: 245000,
//           discount: 30000,
//           size: "Freesize",
//           url: "/product/60af5e5d303b111c3144e31c"
//         },
//         quantity: 1
//       }
//     ]
//   }
// ];

const orderStatus = {
  0: {
    key: 'pending',
    value: 'Chờ xác nhận'
  },

  1: {
    key: 'confirmed',
    value: 'Đã xác nhận'
  },

  2: {
    key: 'paid',
    value: 'Đã thanh toán'
  },

  3: {
    key: 'success',
    value: 'Thành công'
  },

  4: {
    key: 'canceled',
    value: 'Đã hủy'
  }
}

function OrderManagement() {
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [filterQuery, setFilterQuery] = useState('get-all?');
  const [data, setData] = useState({});
  const [currentOrder, setCurrentOrder] = useState();

  const statusFilterRef = useRef(null);
  const searchRef = useRef(null);
  const dateFilterRef = useRef(null);

  const pendingStatusRef = useRef(null);
  const confirmedStatusRef = useRef(null);
  const paidStatusRef = useRef(null);
  const successStatusRef = useRef(null);
  const canceledStatusRef = useRef(null);

  const user = useRecoilValue(userState);
  const [orderDisplay, setOrderDisplay] = useRecoilState(orderDisplayState);
  const [orderEditDisplay, setOrderEditDisplay] = useRecoilState(orderEditDisplayState);

  const { data: orders, isLoading, refetch } = useQuery(['managedOrders', page, data, filterQuery], async () => {
    const config = {
      headers: {
        Authorization: user.accessToken
      }
    }

    const response = await axios.post(`http://localhost:5000/api/order/${filterQuery}page=${page + 1}&limit=8`, data, config);
    // const response = await axios.get(`http://localhost:5000/api/order/get-all?page=1&limit=9`, config);
    setTotalPages(response.data.totalPages);
    setPage(0);
    console.log(response.data);
    return response.data.orders;
  });

  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  const handleViewProductClick = (order) => {
    setCurrentOrder(order);
    setOrderDisplay(true);
  }

  const handleEditProductClick = (order) => {
    if (order.status === 4) return;

    setCurrentOrder(order);
    setOrderEditDisplay(true);
  }

  const handleStatusChange = () => {
    const statusFilter = new FormData(statusFilterRef.current);
    const status = parseInt(statusFilter.get('orderStatus'));
    if (!status) return;

    const request = { status };

    const dateFilter = new FormData(dateFilterRef.current);
    const startDate = dateFilter.get('startDate');
    const endDate = dateFilter.get('endDate');
    if (startDate && endDate) { //format date nữa nha
      request.timeStart = startDate;
      request.timeEnd = endDate;
    }

    setFilterQuery(`get-all?`);
    setData(request);
  }

  const handleDateChange = () => {
    const request = {}

    const statusFilter = new FormData(statusFilterRef.current);
    const status = parseInt(statusFilter.get('orderStatus'));
    if (status) request.status = status;

    const dateFilter = new FormData(dateFilterRef.current);
    const startDate = dateFilter.get('startDate');
    const endDate = dateFilter.get('endDate');

    if (startDate || endDate) {// format date: split by / -> reverse array -> join by -
      request.timeStart = startDate;
      request.timeEnd = endDate;
    }

    setFilterQuery(`get-all?`);
    setData(request);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const search = searchRef.current.value;

    // resetFilterOptions();
    // setPage(0);
    setFilterQuery(`search?q=${search}&`);
  }

  const maxDate = new Date(Date.now());

  return (
    <React.Fragment>
      <div className="order-search">
        <div className="order-search-bar">
          <IoSearchOutline className="search-icon" />
          <input type="text" placeholder="Tìm kiếm: Mã đơn hàng, Tên người nhận hoặc SĐT" className="search-input" ref={searchRef} />
          <button type="submit" onClick={handleSearch} className="search-btn"></button>
        </div>

        <form ref={dateFilterRef} className="date-picker-group" onChange={handleDateChange}>
          <div className="date-picker">
            <DatePickerComponent name="startDate" id="date-picker-start" placeholder="Từ ngày" max={maxDate} format="dd/MM/yyyy" />
          </div>
          <div className="date-picker">
            <DatePickerComponent name="endDate" id="date-picker-end" placeholder="Đến ngày" max={maxDate} format="dd/MM/yyyy" />
          </div>
        </form>
      </div>
      <div className={orders?.length === 9 ? "order-table" : "order-table offset"}>
        <form className="title-list" ref={statusFilterRef} onChange={handleStatusChange}>
          <div className="id-title fl-14 title">Mã đơn hàng</div>
          <div className="recipient-name-title fl-25 title">Người nhận</div>
          <div className="recipient-phone-title fl-15 title">Điện thoại</div>
          <div className="date-title fl-11 title">Ngày đặt</div>
          <div className="total-price fl-13 title">Tổng đơn</div>
          <div className="status-title-container fl-12 title">
            <span className="status-title">Trạng thái</span>
            <TiArrowSortedDown className="dropdown-icon" />
            <div className="status-options">
              <input type="radio" name="orderStatus" id="pending-status" value="0" ref={pendingStatusRef} />
              <label htmlFor="pending-status">Chờ xác nhận</label>

              <input type="radio" name="orderStatus" id="confirmed-status" value="1" ref={confirmedStatusRef} />
              <label htmlFor="confirmed-status">Đã xác nhận</label>

              <input type="radio" name="orderStatus" id="paid-status" value="2" ref={paidStatusRef} />
              <label htmlFor="paid-status">Đã thanh toán</label>

              <input type="radio" name="orderStatus" id="success-status" value="3" ref={successStatusRef} />
              <label htmlFor="success-status">Thành công</label>

              <input type="radio" name="orderStatus" id="canceled-status" value="4" ref={canceledStatusRef} />
              <label htmlFor="canceled-status">Đã hủy</label>

              <input type="radio" name="orderStatus" id="all-status" value="" defaultChecked />
              <label htmlFor="all-status">Tất cả</label>
            </div>
          </div>
          <div className="manipulation fl-10 title"></div>
        </form>

        <div className="order-list">
          {isLoading && <EatLoading color="#ff7eae" />}
          {orders?.map(order => (
            <div key={order._id} className="order-item">
              <div className="order-id fl-14">{order.idOrder}</div>
              <div className="order-recipient-name fl-25">{order.receiverInfo.name}</div>
              <div className="order-recipient-phone fl-15">{order.receiverInfo.phone}</div>
              <div className="order-date fl-11">{new Date(order.date).toLocaleString("en-GB").slice(0, 10)}</div>
              <div className="order-total-price fl-13">{order.total.toLocaleString()}đ</div>
              <div className="order-status fl-12">
                <label className={'status-label ' + orderStatus[order.status].key}>{orderStatus[order.status].value}</label>
              </div>
              <div className="order-manipulation fl-10">
                <div className="view-btn" onClick={() => handleViewProductClick(order)}>
                  <img src={viewIcon} className="btn-icon" alt="" />
                </div>
                <div className={order.status === 4 ? "edit-btn disabled" : "edit-btn"} onClick={() => handleEditProductClick(order)}>
                  <img src={editIcon} className="btn-icon" alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {orders?.length > 0 && <ReactPaginate
        previousLabel={<GrFormPrevious className="prev-icon" />}
        nextLabel={<GrFormNext className="next-icon" />}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        pageClassName={"paginated-btn"}
        breakClassName={"paginated-btn"}
        previousClassName={"prev-btn"}
        nextClassName={"next-btn"}
        disabledClassName={"disabled-btn"}
        activeClassName={"active-btn"}
        forcePage={page}
      />}

      {orderDisplay && <OrderDetail order={currentOrder} />}
      {orderEditDisplay && <EditOrder order={currentOrder} refetch={refetch} />}
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

export default OrderManagement;