import React, { useState, useRef } from 'react';
import '../scss/adminSection.scss';
import receiptIcon from '../svg/receipt.svg';
import pinkReceiptIcon from '../svg/receipt_pink.svg';
import starIcon from '../svg/star.svg';
import pinkStarIcon from '../svg/star_pink.svg';
import bubbleChartIcon from '../svg/bubble_chart.svg';
import pinkBubbleChartIcon from '../svg/bubble_chart_pink.svg';
import vividPinwheel from '../svg/pinwheel_vivid.svg';
import Statistics from './Statistics';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import { BiLogOut } from "react-icons/bi";
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../recoil/userState';


function AdminSection() {
  const history = useHistory();

  const setUser = useSetRecoilState(userState);

  const [selectedTab, setSelectedTab] = useState('statistics');

  const statisticsTabRef = useRef(null);
  const productTabRef = useRef(null);
  const orderTabRef = useRef(null);

  const handleLogOutClick = () => {
    history.push('/admin/login');
    setUser({});
    localStorage.removeItem('accessToken');
  }

  const tabOption = {
    statistics: <Statistics />,
    product: <ProductManagement />,
    order: <OrderManagement />
  }

  const handleStatisticsTabClick = () => {
    statisticsTabRef.current.classList.add('active');
    statisticsTabRef.current.querySelector('.option-icon').src = pinkBubbleChartIcon;

    productTabRef.current.classList.remove('active');
    productTabRef.current.querySelector('.option-icon').src = starIcon;

    orderTabRef.current.classList.remove('active');
    orderTabRef.current.querySelector('.option-icon').src = receiptIcon;

    setSelectedTab('statistics');
  }

  const handleProductTabClick = () => {
    productTabRef.current.classList.add('active');
    productTabRef.current.querySelector('.option-icon').src = pinkStarIcon;

    statisticsTabRef.current.classList.remove('active');
    statisticsTabRef.current.querySelector('.option-icon').src = bubbleChartIcon;

    orderTabRef.current.classList.remove('active');
    orderTabRef.current.querySelector('.option-icon').src = receiptIcon;

    setSelectedTab('product');
  }

  const handleOrderTabClick = () => {
    orderTabRef.current.classList.add('active');
    orderTabRef.current.querySelector('.option-icon').src = pinkReceiptIcon;

    productTabRef.current.classList.remove('active');
    productTabRef.current.querySelector('.option-icon').src = starIcon;

    statisticsTabRef.current.classList.remove('active');
    statisticsTabRef.current.querySelector('.option-icon').src = bubbleChartIcon;

    setSelectedTab('order');
  }

  return (
    <div className="admin-section full-screen-background" style={{ backgroundImage: `url("/img/sky-background.jpg")` }}>
      <div className="blur-background">
        <div className="admin-container">
          <div className="admin-dashboard">
            <div className="admin-navigation l-1">
              <img src={vividPinwheel} className="logo-icon" alt="" />

              <div className="menu-options">
                <div className="tab-option active" ref={statisticsTabRef} onClick={handleStatisticsTabClick}>
                  <img src={pinkBubbleChartIcon} className="option-icon" alt="" />
                  <div className="option-title">Thống kê</div>
                </div>

                <div className="tab-option" ref={productTabRef} onClick={handleProductTabClick}>
                  <img src={starIcon} className="option-icon" alt="" />
                  <div className="option-title">Sản phẩm</div>
                </div>

                <div className="tab-option" ref={orderTabRef} onClick={handleOrderTabClick}>
                  <img src={receiptIcon} className="option-icon" alt="" />
                  <div className="option-title">Hóa đơn</div>
                </div>
              </div>

              <BiLogOut className="logout-icon" onClick={handleLogOutClick} />
            </div>

            <div className="admin-body l-11">
              {tabOption[selectedTab]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSection;