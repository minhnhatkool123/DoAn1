import '../scss/orderManagement.scss';
import React, { useState, useRef } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { dialogState } from '../recoil/dialogState';
import { userState } from '../recoil/userState';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import { EatLoading } from 'react-loadingg';
import { TiArrowSortedDown } from "react-icons/ti";
import { orderEditDisplayState } from '../recoil/orderEditDisplayState';
import { orderDisplayState } from '../recoil/orderDisplayState';
import viewIcon from '../svg/visibility.svg';
import editIcon from '../svg/edit.svg';
import EditOrder from './EditOrder';
import OrderDetail from './OrderDetail';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

const orders = [
  {
    id: 19815898,
    date: '21/01/2021',
    totalPrice: 1950000,
    status: 1,
    name: 'Phương Thùy',
    phone: '0187264727',
    email: 'phuongthuy@gmail.com',
    address: '53 Nguyễn Du, Thành phố Dĩ An, Bình Dương',
    note: 'Giao giờ hành chính',
    paymentMethod: 'Thanh toán tiền mặt khi nhận hàng',
    shippingFee: 25000,
    cart: [
      {
        id: "undefinedLhttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/ChanVay/GV589/18920165882_1159735690.jpg",
        product: {
          color: "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/ChanVay/GV589/18920165882_1159735690.jpg",
          id: "undefinedLhttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/ChanVay/GV589/18920165882_1159735690.jpg",
          name: "Chân Váy Caro Nữ Sinh Nhật 589",
          price: 245000,
          discount: 20000,
          size: "L",
          url: "/product/60af5e60dbc87f8dfa279f39"
        },
        quantity: 1
      },
      {
        id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K252/13888927764_1159735690.jpg",
        product: {
          color: "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K252/13888927764_1159735690.jpg",
          id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/K252/13888927764_1159735690.jpg",
          name: "Áo Thun Hoodie Nữ Baby K252",
          price: 240000,
          discount: 10000,
          size: "Freesize",
          url: "/product/60af5e5f4c6dd49b6d98882b"
        },
        quantity: 2
      },
      {
        id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
        product: {
          color: "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
          id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
          name: "Áo Khoác Nhẹ In Hình Cô Gái 999",
          price: 245000,
          discount: 5000,
          size: "Freesize",
          url: "/product/60af5e5d303b111c3144e31c"
        },
        quantity: 1
      },
      {
        id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
        product: {
          color: "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
          id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
          name: "Áo Khoác Nhẹ In Hình Cô Gái 999",
          price: 245000,
          discount: 0,
          size: "Freesize",
          url: "/product/60af5e5d303b111c3144e31c"
        },
        quantity: 1
      },
      {
        id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
        product: {
          color: "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
          id: "undefinedFreesizehttp://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK999/O1CN016kpUKs1y6mubo5EJ9_!!1950826530.jpg",
          name: "Áo Khoác Nhẹ In Hình Cô Gái 999",
          price: 245000,
          discount: 30000,
          size: "Freesize",
          url: "/product/60af5e5d303b111c3144e31c"
        },
        quantity: 1
      }
    ]
  }
];

function OrderManagement() {
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [filterQuery, setFilterQuery] = useState('');
  const [currentOrder, setCurrentOrder] = useState(orders[0]);

  const filterRef = useRef(null);
  const searchRef = useRef(null);

  const pendingStatusRef = useRef(null);
  const confirmedStatusRef = useRef(null);
  const paidStatusRef = useRef(null);
  const successStatusRef = useRef(null);
  const canceledStatusRef = useRef(null);

  const user = useRecoilValue(userState);
  const setDialog = useSetRecoilState(dialogState);
  const [orderDisplay, setOrderDisplay] = useRecoilState(orderDisplayState);
  const [orderEditDisplay, setOrderEditDisplay] = useRecoilState(orderEditDisplayState);

  const handlePageChange = ({ selected }) => {
    // console.log('page click: ', selected);
    setPage(selected);
  };

  const handleChangeStatusClick = () => {

  }

  const handleFilterChange = () => {

  }

  const handleViewProductClick = () => {
    setOrderDisplay(true);
  }

  const handleEditProductClick = () => {
    setOrderEditDisplay(true);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    // const search = searchRef.current.value;

    // resetFilterOptions();
    // setPage(0);
    // setFilterQuery(`search?name=${search}&`);
  }

  // const maxDate = new Date(new Date().getFullYear(), new Date().getMonth());
  const maxDate = new Date(Date.now());

  return (
    <React.Fragment>
      <form className="order-search">
        <div className="order-search-bar">
          <IoSearchOutline className="search-icon" />
          <input type="text" placeholder="Tìm kiếm: Mã đơn hàng, Tên người nhận hoặc SĐT" className="search-input" ref={searchRef} />
          <button type="submit" onClick={handleSearch} className="search-btn"></button>
        </div>

        <div className="date-picker">
          <DatePickerComponent id="date-picker-start" placeholder="Từ ngày" max={maxDate} format="dd/MM/yyyy" />
        </div>
        <div className="date-picker">
          <DatePickerComponent id="date-picker-end" placeholder="Đến ngày" max={maxDate} format="dd/MM/yyyy" />
        </div>
      </form>
      <div className="order-table">
        <form className="title-list" ref={filterRef} onChange={handleFilterChange}>
          <div className="id-title fl-14 title">Mã đơn hàng</div>
          <div className="recipient-name-title fl-25 title">Người nhận</div>
          <div className="recipient-phone-title fl-15 title">Điện thoại</div>
          <div className="date-title fl-11 title">Ngày đặt</div>
          <div className="total-price fl-13 title">Tổng đơn</div>
          <div className="status-title-container fl-12 title">
            <span className="status-title">Trạng thái</span>
            <TiArrowSortedDown className="dropdown-icon" />
            <div className="status-options">
              <input type="radio" name="orderStatus" id="pending-status" value="status=0&" ref={pendingStatusRef} />
              <label htmlFor="pending-status">Chờ xác nhận</label>

              <input type="radio" name="orderStatus" id="confirmed-status" value="status=1&" ref={confirmedStatusRef} />
              <label htmlFor="confirmed-status">Đã xác nhận</label>

              <input type="radio" name="orderStatus" id="paid-status" value="status=2&" ref={paidStatusRef} />
              <label htmlFor="paid-status">Đã thanh toán</label>

              <input type="radio" name="orderStatus" id="success-status" value="status=3&" ref={successStatusRef} />
              <label htmlFor="success-status">Thành công</label>

              <input type="radio" name="orderStatus" id="canceled-status" value="status=4&" ref={canceledStatusRef} />
              <label htmlFor="canceled-status">Đã hủy</label>
            </div>
          </div>
          <div className="manipulation fl-10 title"></div>
        </form>

        <div className="order-list">
          {/* {isLoading && <EatLoading color="#ff7eae" />} */}
          <div className="order-item">
            <div className="order-id fl-14">{orders[0].id}</div>
            <div className="order-recipient-name fl-25">Phạm Hoàng Phượng Trinh</div>
            <div className="order-recipient-phone fl-15">{orders[0].phone}</div>
            <div className="order-date fl-11">{orders[0].date}</div>
            <div className="order-total-price fl-13">{orders[0].totalPrice}</div>
            <div className="order-status fl-12">
              <label className="status-label paid">Đã thanh toán</label>
            </div>
            <div className="order-manipulation fl-10">
              <div className="view-btn" onClick={() => handleViewProductClick(orders[0])}>
                <img src={viewIcon} className="btn-icon" alt="" />
              </div>
              <div className="edit-btn" onClick={() => handleEditProductClick(orders[0])}>
                <img src={editIcon} className="btn-icon" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {orderDisplay && <OrderDetail order={currentOrder} />}
      {orderEditDisplay && <EditOrder order={currentOrder} />}
    </React.Fragment>
  );
}

export default OrderManagement;