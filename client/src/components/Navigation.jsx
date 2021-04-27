import React, { useState, useEffect } from 'react';
import '../scss/navigation.scss';
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

function Navigation() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (showSignUp) {
      document.getElementById('overlay').addEventListener('click', () => {
        setShowSignUp(false);
      });
    }

    if (showLogin) {
      document.getElementById('overlay').addEventListener('click', () => {
        setShowLogin(false);
      });
    }
  }, [showSignUp, showLogin]);

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
              <span className="name" onClick={() => setShowLogin(true)}>Đăng nhập</span>
              <span className="log-out" onClick={() => setShowSignUp(true)}>Đăng ký</span>
            </div>
            <HiOutlineShoppingBag className="cart-icon" />
          </div>
        </div>
      </div>

      <div className="nav">

      </div>

      {showSignUp ? <SignUpForm /> : null}
      {showLogin ? <LoginForm /> : null}
    </div>
  );
}

export default Navigation;