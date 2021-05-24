import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../scss/dashboard.scss';
import { AiFillDashboard } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import AddNewProduct from './AddNewProduct';

function Dashboard() {
  const history = useHistory();
  const [navOption, setNavOption] = useState('statistics');

  const addNewProductZoneRef = React.createRef();

  const handleLogOutClick = () => {
    history.push('/admin/login');
  }

  const openAddNewProductZone = () => {
    addNewProductZoneRef.current.classList.add('active');
  }

  return (
    <div className="dashboard full-screen-background" style={{ backgroundImage: `url("/img/fullscreen-bg-8.jpg")` }}>
      <div className="dashboard-container">
      <div className="dashboard-navigation">
        <div className="dashboard-logo">
          <AiFillDashboard className="logo-icon" />
          <span className="logo-title">Dashboard</span>
        </div>
        <ul className="dashboard-nav">
          <li className="statistics">Thống kê</li>
          <li className="products active">Sản phẩm</li>
          <li className="orders">Đơn đặt hàng</li>
        </ul>
        <div className="log-out-btn" onClick={handleLogOutClick}>
          <IoLogOutOutline className="log-out-icon" />
          <span className="log-out-title">Đăng xuất</span>
        </div>
      </div>

      <div className="dashboard-body">
        <button type="button" className="add-new-product-btn" onClick={openAddNewProductZone}>Thêm sản phẩm</button>
      </div>
      </div>

      <AddNewProduct ref={addNewProductZoneRef} />
    </div>
  )
}

export default Dashboard
