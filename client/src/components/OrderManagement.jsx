import '../scss/orderManagement.scss';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userState } from '../recoil/userState';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import { EatLoading } from 'react-loadingg';
import { TiArrowSortedDown } from "react-icons/ti";
import { orderEditDisplayState } from '../recoil/orderEditDisplayState';
import { orderDisplayState } from '../recoil/orderDisplayState';
import { DateRangePicker } from 'react-dates';
import isAfterDay from 'react-dates/lib/utils/isAfterDay';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import viewIcon from '../svg/visibility.svg';
import editIcon from '../svg/edit.svg';
import EditOrder from './EditOrder';
import CloseButton from './CloseButton';
import OrderDetail from './OrderDetail';
import ReactPaginate from "react-paginate";

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
  const [method, setMethod] = useState('post');
  const [currentOrder, setCurrentOrder] = useState();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const statusFilterRef = useRef(null);
  const searchRef = useRef(null);

  const pendingStatusRef = useRef(null);
  const confirmedStatusRef = useRef(null);
  const paidStatusRef = useRef(null);
  const successStatusRef = useRef(null);
  const canceledStatusRef = useRef(null);
  const allStatusRef = useRef(null);

  const user = useRecoilValue(userState);
  const [orderDisplay, setOrderDisplay] = useRecoilState(orderDisplayState);
  const [orderEditDisplay, setOrderEditDisplay] = useRecoilState(orderEditDisplayState);

  const { data: orders, isLoading, refetch } = useQuery(['managedOrders', page, data, filterQuery], async () => {
    const config = {
      method: method,
      url: `http://localhost:5000/api/order/${filterQuery}page=${page + 1}&limit=9`,
      headers: { Authorization: user.accessToken },
      data: data
    }

    // console.log(config);

    const response = await axios(config);
    setTotalPages(response.data.totalPages);
    // console.log(response.data);
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
    // console.log('status change');
    const request = {}

    const statusFilter = new FormData(statusFilterRef.current);
    const status = parseInt(statusFilter.get('orderStatus'));
    if (!isNaN(status)) request.status = status;

    if (startDate && endDate) {
      request.timeStart = startDate._d.toISOString().slice(0, 10);
      request.timeEnd = endDate._d.toISOString().slice(0, 10);
    }

    // console.log(request);
    searchRef.current.value = '';
    setMethod('post')
    setPage(0);
    setFilterQuery(`get-all?`);
    setData(request);
  }

  useEffect(() => {
    // console.log('date change');
    const request = {}

    const statusFilter = new FormData(statusFilterRef.current);
    const status = parseInt(statusFilter.get('orderStatus'));
    if (status) request.status = status;

    if (startDate && endDate) {
      request.timeStart = startDate._d.toISOString().slice(0, 10);
      request.timeEnd = endDate._d.toISOString().slice(0, 10);
    }

    // console.log(request);
    searchRef.current.value = '';
    setMethod('post');
    setPage(0);
    setFilterQuery(`get-all?`);
    setData(request);
  }, [startDate, endDate]);

  const handleSearch = (e) => {
    e.preventDefault();
    const search = searchRef.current.value;

    resetStatusOptions();
    setStartDate(null);
    setEndDate(null);
    setMethod('get')
    setPage(0);
    setFilterQuery(`search?q=${search}&`);
  }

  const resetStatusOptions = () => {
    allStatusRef.current.checked = true;
    pendingStatusRef.current.checked = false;
    confirmedStatusRef.current.checked = false;
    paidStatusRef.current.checked = false;
    successStatusRef.current.checked = false;
    canceledStatusRef.current.checked = false;
  }

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  }

  return (
    <React.Fragment>
      <div className="order-search">
        <form className="order-search-bar">
          <IoSearchOutline className="search-icon" />
          <input type="text" placeholder="Tìm kiếm: Mã đơn hàng, Tên người nhận hoặc SĐT" className="search-input" ref={searchRef} onChange={handleSearch} />
          <button type="submit" onClick={handleSearch} className="search-btn"></button>
        </form>

        <div className="date-picker">
          <DateRangePicker
            startDateId="startDate"
            endDateId="endDate"
            startDate={startDate}
            endDate={endDate}
            onDatesChange={handleDatesChange}
            focusedInput={focusedInput}
            onFocusChange={(focusedInputValue) => setFocusedInput(focusedInputValue)}
            startDatePlaceholderText="Từ ngày"
            endDatePlaceholderText="Đến ngày"
            customCloseIcon={<CloseButton />}
            isOutsideRange={day => isAfterDay(day, moment())}
            displayFormat={() => "DD/MM/YYYY"}
            showClearDates
            block
          />
        </div>
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

              <input type="radio" name="orderStatus" id="all-status" value="" defaultChecked ref={allStatusRef} />
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

export default OrderManagement;