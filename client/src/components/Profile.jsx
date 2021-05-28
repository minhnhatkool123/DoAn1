import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';

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

function Profile() {
  const [provinceId, setProvinceId] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(false);

  const catalogRef = useRef(null);

  useEffect(() => {
    axios.get('https://dc.tintoc.net/app/api-customer/public/provinces?size=64')
      .then((response) => {
        response.data.shift();
        response.data.sort((a, b) => a.name.localeCompare(b.name)).forEach(item => {
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
        setProvinceId(57);
        setForceUpdate(value => !value);
      })
      .catch(error => console.log(error))
  }, []);

  useEffect(() => {
    accordingDistricts = districts.filter(district => district.provinceId == provinceId);
  }, [provinceId]);

  const handleCatalogClick = (e) => {
    const catalogItems = catalogRef.current.childNodes;
    catalogItems.forEach((catalogItem) => {
      catalogItem.classList.remove('active');
    });
    e.target.classList.add('active');
  };

  return (
    <React.Fragment>
      <div className="info-title">Hồ sơ của tôi</div>
      <div className="divider"></div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => {
          return (
            <Form className="form-interface">
              <div className="form-control">
                <label htmlFor="fullName">Họ tên:</label>
                <div className="input-container">
                  <Field type="text" id="fullName" name="fullName" />
                  <ErrorMessage name="fullName" component={TextError} />
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="email">Email:</label>
                <div className="input-container">
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage name="email" component={TextError} />
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="phone">Điện thoại:</label>
                <div className="input-container">
                  <Field type="text" id="phone" name="phone" />
                  <ErrorMessage name="phone" component={TextError} />
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="province">Tỉnh/Thành phố:</label>
                <Field as='select' id='province' name='province' onClick={(e) => setProvinceId(e.target.selectedOptions[0].value)}>
                  {provinces.map(province => {
                    return (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage name="province" component={TextError} />
              </div>

              <div className="form-control">
                <label htmlFor="district">Quận/Huyện:</label>
                <Field as='select' id='district' name='district'>
                  {accordingDistricts.map(district => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="district" component={TextError} />
              </div>

              <div className="form-control">
                <label htmlFor="addressDetail">Địa chỉ chi tiết:</label>
                <div className="input-container">
                  <Field type="text" id="addressDetail" name="addressDetail" />
                  <ErrorMessage name="addressDetail" component={TextError} />
                </div>
              </div>

              <button className="update-btn" type='submit'>Cập nhật</button>
            </Form>
          )
        }}
      </Formik>
    </React.Fragment>
  )
}

export default Profile
