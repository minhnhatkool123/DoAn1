import React, { useState } from 'react';
import '../scss/dashboard.scss';
import { AiFillDashboard } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";

function Dashboard() {
  const [navOption, setNavOption] = useState('statistics');

  return (
    <div className="dashboard full-screen-background" style={{ backgroundImage: `url("/img/fullscreen-bg.jpg")` }}>
      <div className="dashboard-navigation">
        <div className="dashboard-logo">
          <AiFillDashboard className="logo-icon" />
          <span className="logo-title">Dashboard</span>
        </div>
        <ul className="dashboard-nav">
          <li className="statistics">Thống kê</li>
          <li className="products">Sản phẩm</li>
          <li className="orders">Đơn đặt hàng</li>
        </ul>
        <div className="log-out-btn">
          <IoLogOutOutline className="log-out-icon" />
          <span className="log-out-title">Log out</span>
        </div>
      </div>

      <div className="dashboard-body"></div>
    </div>
  )
}

export default Dashboard
