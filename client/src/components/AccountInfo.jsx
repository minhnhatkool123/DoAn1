import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import '../scss/accountInfo.scss';
import { IoPersonCircle } from "react-icons/io5";
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import OrderHistory from './OrderHistory';

function AccountInfo() {
  const [catalogOption, setCatalogOption] = useState('profile');

  const catalogOptionInfo = {
    profile: <Profile />,
    changePassword: <ChangePassword />,
    orderHistory: <OrderHistory />
  }

  const catalogRef = useRef(null);

  const handleCatalogClick = (e, option) => {
    const catalogItems = catalogRef.current.childNodes;
    catalogItems.forEach((catalogItem) => {
      catalogItem.classList.remove('active');
    });
    e.target.classList.add('active');
    setCatalogOption(option);
  };

  return (
    <div className="account-info grid">
      <div className="row">
        <div className="catalog-container l-2-4">
          <IoPersonCircle className="account-icon" />
          <ul className="catalog" ref={catalogRef}>
            <li className="active" onClick={(e) => handleCatalogClick(e, 'profile')}>Thông tin tài khoản</li>
            <li onClick={(e) => handleCatalogClick(e, 'orderHistory')}>Lịch sử đơn hàng</li>
            <li onClick={(e) => handleCatalogClick(e, 'changePassword')}>Đổi mật khẩu</li>
          </ul>
        </div>

        <div className="info-container l-8">
          {catalogOptionInfo[catalogOption]}
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;