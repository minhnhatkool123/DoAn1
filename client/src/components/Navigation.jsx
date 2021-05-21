import React, { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { cartTotalQuantity, cartTotalPrice, cartState } from '../recoil/cartState';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import '../scss/navigation.scss';
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

const ConditionalLink = ({ children, to, condition }) => (!!condition && to)
  ? <Link to={to}>{children}</Link>
  : <>{children}</>;

function Navigation() {
  const cart = useRecoilValue(cartState);
  const totalQuantity = useRecoilValue(cartTotalQuantity);
  const totalPrice = useRecoilValue(cartTotalPrice);

  const cartPreviewRef = useRef(null);

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
          <div className="logo col l-3">
            <Link to='/'>
              <img src="/img/textlogo.png" alt="logo" />
            </Link>
          </div>
          <div className="search col l-6">
            <input className="search-bar" type="text" placeholder="Tìm kiếm sản phẩm" />
            <div className="search-btn">
              <FaSearch className="search-icon" />
            </div>
          </div>
          <div className="account-cart col l-3">
            <div className="account">
              <span className="name" onClick={handleLoginUser}>
                <ConditionalLink to='/account' condition={name}>
                  {name || 'Đăng nhập'}
                </ConditionalLink>
              </span>
              <span className="log-out" onClick={handleSignUpEscape}>{name ? 'Thoát' : 'Đăng ký'}</span>
            </div>
            <div className="cart-group">
              <Link to='/cart'>
                <HiOutlineShoppingBag className="cart-icon" />
                <div className="cart-notice">{totalQuantity}</div>
                <div className="cart-preview" ref={cartPreviewRef}>
                  <div className="empty-cart-container">
                    <img src="/img/cart-empty.png" alt="" className="empty-cart-img" />
                    <div className="empty-cart-message">Chưa có sản phẩm nào</div>
                  </div>

                  <div className="cart-list">
                    <div className="cart-items">
                      {[...cart].reverse().slice(0, 3).map(item => (
                        <div className="cart-product-container">
                          <div className="product-info">
                            <div className="product-color" style={{ backgroundImage: `url(${item.product.color})` }}></div>
                            <div className="product-description">
                              <div className="product-name">{item.product.name}</div>
                              <div className="product-quantity">x{item.quantity}</div>
                            </div>
                          </div>
                          <div className="product-price">{(item.product.price * item.quantity).toLocaleString()}đ</div>
                        </div>
                      ))}
                    </div>
                    <div className="cart-total-price">
                      <span className="text-label">Thành tiền:</span>
                      <span className="total-price">{totalPrice.toLocaleString()}đ</span>
                    </div>
                    <div className="view-cart-btn"><Link to='/cart'>Xem giỏ hàng</Link></div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="nav">
        <div className="nav-bar-container">
          <ul className="nav-bar">
            <li className="all"><Link to='/category/all'>Tất cả</Link></li>
            <li className="shirt">
              <Link to='/category/ao'>Áo</Link>
              <ul className="sub-nav">
                <li><Link to='/category/ao-the-thao'>Áo thể thao</Link></li>
                <li><Link to='/category/ao-thun-nu'>Áo thun nữ</Link></li>
                <li><Link to='/category/ao-kieu-nu'>Áo kiểu nữ</Link></li>
                <li><Link to='/category/ao-so-mi-nu'>Áo sơ mi nữ</Link></li>
                <li><Link to='/ao-khoac-nu'>Áo khoác nữ</Link></li>
              </ul>
            </li>
            <li className="pants">
              <Link to='/category/quan'>Quần</Link>
              <ul className="sub-nav">
                <li><Link to='/category/quan-dai'>Quần dài</Link></li>
                <li><Link to='/category/quan-short-nu'>Quần short nữ</Link></li>
                <li><Link to='/category/quan-legging'>Quần legging</Link></li>
              </ul>
            </li>
            <li className="dress-skirt">
              <Link to='/category/dam-vay'>Đầm váy</Link>
              <ul className="sub-nav">
                <li><Link to='/category/chan-vay'>Chân váy</Link></li>
                <li><Link to='/category/dam-nu'>Đầm nữ</Link></li>
                <li><Link to='/category/yem'>Yếm</Link></li>
              </ul>
            </li>
            <li className="set"><Link to='/category/set'>Set - Jumpsuit</Link></li>
            <li className="hot"><Link to='/category/hot'>Bán chạy</Link></li>
            <li className="sale"><Link to='/category/sale'>Khuyến mãi</Link></li>
          </ul>
        </div>
      </div>

      {showSignUp ? <SignUpForm logInRightNow={logInRightNow} closeSignUp={closeSignUp} /> : null}
      {showLogin ? <LoginForm closeLogin={closeLogin} /> : null}
    </div>
  );
}

export default Navigation;