import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import '../scss/navigation.scss';
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

function Navigation() {
  const numOfProducts = useSelector(state => state.cart.numOfProducts);

  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [name, setName] = useState('');

  // const [forceUpdate, setForceUpdate] = useState(true);

  const logInRightNow = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };

  const closeSignUp = () => {
    setShowSignUp(false);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  const handleLoginUser = (e) => {
    if (e.target.innerText === 'Đăng nhập')
      setShowLogin(true);
  };

  const handleSignUpEscape = (e) => {
    if (e.target.innerText === 'Đăng ký')
      setShowSignUp(true);
    else {
      localStorage.removeItem('jwt');
      localStorage.removeItem('name');
      setName('');
    }
  };

  useEffect(() => {
    setName(localStorage.getItem('name'));
  }, [name, showLogin]);

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
          <div className="logo col l-3"><img src="/img/textlogo.png" /></div>
          <div className="search col l-6">
            <input className="search-bar" type="text" placeholder="Tìm kiếm sản phẩm" />
            <div className="search-btn">
              <FaSearch className="search-icon" />
            </div>
          </div>
          <div className="account-cart col l-3">
            <div className="account">
              <span className="name" onClick={handleLoginUser}>{name || 'Đăng nhập'}</span>
              <span className="log-out" onClick={handleSignUpEscape}>{name ? 'Thoát' : 'Đăng ký'}</span>
            </div>
            <div className="cart-group">
              <HiOutlineShoppingBag className="cart-icon" />
              <div className="cart-notice">{numOfProducts}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="nav">
        <div className="nav-bar-container">
          <ul className="nav-bar">
            <li className="all"><a href="#">Tất cả</a></li>
            <li className="shirt">
              <a href="#">Áo</a>
              <ul className="sub-nav">
                <li><a href="#">Áo thể thao</a></li>
                <li><a href="#">Áo thun nữ</a></li>
                <li><a href="#">Áo kiểu nữ</a></li>
                <li><a href="#">Áo sơ mi nữ</a></li>
                <li><a href="#">Áo khoác nữ</a></li>
              </ul>
            </li>
            <li className="pants">
              <a href="#">Quần</a>
              <ul className="sub-nav">
                <li><a href="#">Quần dài</a></li>
                <li><a href="#">Quần short nữ</a></li>
                <li><a href="#">Quần legging</a></li>
              </ul>
            </li>
            <li className="dress-skirt">
              <a href="#">Đầm váy</a>
              <ul className="sub-nav">
                <li><a href="#">Chân váy</a></li>
                <li><a href="#">Đầm nữ</a></li>
                <li><a href="#">Yếm</a></li>
              </ul>
            </li>
            <li className="extra"><a href="#">Set - Jumpsuit</a></li>
            <li className="hot"><a href="#">Bán chạy</a></li>
            <li className="sale"><a href="#">Khuyến mãi</a></li>
          </ul>
        </div>
      </div>

      {showSignUp ? <SignUpForm logInRightNow={logInRightNow} closeSignUp={closeSignUp} /> : null}
      {showLogin ? <LoginForm closeLogin={closeLogin} /> : null}
    </div>
  );
}

export default Navigation;