import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from '../components/TextError';

let provinces = [];
let districts = [];
let accordingDistricts = [];

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
  province: Yup.string().notOneOf(['Tỉnh/Thành phố'], '*Bắt buộc'),
  district: Yup.string().notOneOf(['Quận/Huyện'], '*Bắt buộc'),
  addressDetail: Yup.string().required('*Bắt buộc'),
});

const onSubmit = values => {
  console.log('Form data', values);
};

function Test() {
  const [provinceId, setProvinceId] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(false);

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
    // console.log(provinceId);
    accordingDistricts = districts.filter(district => district.provinceId == provinceId);
    // console.log('accordingDistricts', accordingDistricts);
    // setForceUpdate(value => !value);
  }, [provinceId]);

  // console.log('render');

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => {
          return (
            <Form className="form-interface">
              <div className="form-control">
                <label htmlFor="fullName">Họ tên</label>
                <Field type="text" id="fullName" name="fullName" />
                <ErrorMessage name="fullName" component={TextError} />
              </div>

              <div className="form-control">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component={TextError} />
              </div>

              <div className="form-control">
                <label htmlFor="phone">Điện thoại</label>
                <Field type="text" id="phone" name="phone" />
                <ErrorMessage name="phone" component={TextError} />
              </div>

              <div className="form-control">
                <label htmlFor="province">Tỉnh/Thành phố</label>
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
                <label htmlFor="district">Quận/Huyện</label>
                <Field as='select' id='district' name='district'>
                  {accordingDistricts.map(district => {
                    return (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage name="district" component={TextError} />
              </div>

              <div className="form-control">
                <label htmlFor="addressDetail">Địa chỉ chi tiết</label>
                <Field type="text" id="addressDetail" name="addressDetail" />
                <ErrorMessage name="addressDetail" component={TextError} />
              </div>

              <button className="update-info-btn" type='submit'>Cập nhật</button>
            </Form>
          )
        }}
      </Formik>
    </div>
  );
}

export default Test;