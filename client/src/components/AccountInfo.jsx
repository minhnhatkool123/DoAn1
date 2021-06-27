import React, { useState, useRef } from 'react';
import '../scss/accountInfo.scss';
import { IoPersonCircle } from "react-icons/io5";
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import OrderHistory from './OrderHistory';
import ChangeEmail from './ChangeEmail';

function AccountInfo() {
  const [catalogOption, setCatalogOption] = useState('profile');

  const catalogOptionInfo = {
    profile: <Profile />,
    changePassword: <ChangePassword />,
    orderHistory: <OrderHistory />,
    changeEmail: <ChangeEmail />
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
            <li onClick={(e) => handleCatalogClick(e, 'changeEmail')}>Cập nhật email</li>
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