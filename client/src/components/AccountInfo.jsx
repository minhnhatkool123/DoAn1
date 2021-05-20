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

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  province: '',
  district: '',
  addressDetail: ''
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  fullName: Yup.string().required('*Bắt buộc'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('*Bắt buộc'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
    .required('*Bắt buộc'),
  // province: Yup.string().required('*Bắt buộc'),
  // district: Yup.string().required('*Bắt buộc'),
  addressDetail: Yup.string().required('*Bắt buộc'),
});

const onSubmit = values => {
  console.log('Form data', values);
};

let provinces = [];
let districts = [];
let accordingDistricts = [];

function AccountInfo() {
  const [provinceId, setProvinceId] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [catalogOption, setCatalogOption] = useState('profile');

  const catalogOptionInfo = {
    profile: <Profile />,
    changePassword: <ChangePassword />
  }

  const catalogRef = useRef(null);

  useEffect(() => {
    axios.get('https://dc.tintoc.net/app/api-customer/public/provinces?size=64')
      .then((response) => {
        response.data.shift();
        response.data.sort((a, b) => parseFloat(a.id) - parseFloat(b.id)).forEach(item => {
          provinces.push({
            id: item.id,
            name: item.name
          })
        });
        // console.log('push xong provinces');
        // console.log(provinces);
      })
      .catch(error => console.log(error))

    axios.get('https://dc.tintoc.net/app/api-customer/public/districts?size=1000')
      .then((response) => {
        response.data.forEach(item => {
          districts.push({
            id: item.id,
            name: item.name,
            provinceId: item.provinceId
          })
        });
        console.log('districts', districts);
        setProvinceId(1);
        setForceUpdate(value => !value);
      })
      .catch(error => console.log(error))
  }, []);

  useEffect(() => {
    accordingDistricts = districts.filter(district => district.provinceId == provinceId);
  }, [provinceId]);

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