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


function AdminSection() {
  const [selectedTab, setSelectedTab] = useState('product');

  const statisticsTabRef = useRef(null);
  const productTabRef = useRef(null);
  const orderTabRef = useRef(null);

  const tabOption = {
    statistics: <Statistics />,
    product: <ProductManagement />,
    order: <OrderManagement />
  }

  const handleTabClick = (e, tabName) => {
    setSelectedTab(tabName);
    console.log(e.target)
    e.target.querySelector('.option-icon').src = pinkBubbleChartIcon;
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
                <div className="tab-option" ref={statisticsTabRef} onClick={handleStatisticsTabClick}>
                  <img src={bubbleChartIcon} className="option-icon" alt="" />
                  <div className="option-title">Thống kê</div>
                </div>

                <div className="tab-option active" ref={productTabRef} onClick={handleProductTabClick}>
                  <img src={pinkStarIcon} className="option-icon" alt="" />
                  <div className="option-title">Sản phẩm</div>
                </div>

                <div className="tab-option" ref={orderTabRef} onClick={handleOrderTabClick}>
                  <img src={receiptIcon} className="option-icon" alt="" />
                  <div className="option-title">Hóa đơn</div>
                </div>
              </div>
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