import React, { useState } from 'react';
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

  const tabOption = {
    statistics: <Statistics />,
    product: <ProductManagement />,
    order: <OrderManagement />
  }

  return (
    <div className="admin-section full-screen-background" style={{ backgroundImage: `url("/img/sky-background.jpg")` }}>
      <div className="blur-background">
        <div className="admin-container">
          <div className="admin-dashboard">
            <div className="admin-navigation l-1">
              {/* <div className="logo">
                
              </div> */}

              <img src={vividPinwheel} className="logo-icon" alt="" />

              <div className="menu-options">
                <div className="tab-option">
                  <img src={bubbleChartIcon} className="option-icon" alt="" />
                  <div className="option-title">Thống kê</div>
                </div>

                <div className="tab-option active">
                  <img src={pinkStarIcon} className="option-icon" alt="" />
                  <div className="option-title">Sản phẩm</div>
                </div>

                <div className="tab-option">
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