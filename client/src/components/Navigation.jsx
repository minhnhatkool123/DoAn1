import React from 'react';
import '../scss/navigation.scss';
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";

function Navigation() {
  return (
    <div className="navigation grid">
      <div className="header">
        <div className="container">
          <div className="logo col l-3">LOGO</div>
          <div className="search col l-6">
            <input className="search-bar" type="text" placeholder="Tìm kiếm sản phẩm" />
            <div className="search-btn">
              <FaSearch className="search-icon" />
            </div>
          </div>
          <div className="account-cart col l-3">
            <div className="account">
              <span className="name">Đăng nhập</span>
              <span className="log-out">Đăng ký</span>
            </div>
            <HiOutlineShoppingBag className="cart-icon" />
          </div>
        </div>
      </div>

      <div className="nav">

      </div>
    </div>
  );
}

export default Navigation;