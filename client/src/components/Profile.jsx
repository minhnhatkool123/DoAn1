import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { userState } from '../recoil/userState';
import { dialogState } from '../recoil/dialogState';
import { resultMessageState, SUCCESS, FAILURE } from '../recoil/resultMessageState';
import provinces from '../data/provinces';
import districts from '../data/districts';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  fullName: Yup.string().required('*Bắt buộc'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
    .required('*Bắt buộc'),
  addressDetail: Yup.string().required('*Bắt buộc'),
});

function Profile() {
  const [user, setUser] = useRecoilState(userState);
  const setDialog = useSetRecoilState(dialogState);
  const setResultMessage = useSetRecoilState(resultMessageState);

  const [province, setProvince] = useState(user.city);
  const [accordingDistricts, setAccordingDistricts] = useState([]);

  useEffect(() => {
    const newDistricts = districts.filter(district => district.provinceName === province);
    setAccordingDistricts(newDistricts);
  }, [province]);

  const initialValues = {
    fullName: user.name,
    phone: user.phone,
    province: user.city,
    district: user.district,
    addressDetail: user.address
  };

  const onSubmit = values => {
    const data = {
      name: values.fullName,
      phone: values.phone,
      city: values.province,
      district: values.district,
      address: values.addressDetail
    }

    const config = {
      headers: {
        Authorization: user.accessToken
      }
    }

    setDialog({
      show: true,
      message: 'Bạn xác nhận muốn cập nhật thông tin?',
      acceptButtonName: 'Xác nhận',
      func: () => {
        axios.patch('http://localhost:5000/user/update-info', data, config)
          .then(response => {
            console.log(response.data.message);

            setUser({ ...user, ...data });

            setResultMessage({
              show: true,
              type: SUCCESS,
              message: 'Thông tin tài khoản đã được cập nhật'
            });
          })
          .catch(error => {
            console.log(error.response.data.message);
          })
      }
    });
  };

  const handleProvinceChange = (handleChange, e) => {
    handleChange(e);
    setProvince(e.target.selectedOptions[0].value);
  }

  return (
    <React.Fragment>
      <div className="info-title">Hồ sơ của tôi</div>
      <div className="divider"></div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form className="form-interface">
            <div className="form-control">
              <label htmlFor="fullName">Họ tên:</label>
              <div className="input-container">
                <Field type="text" id="fullName" name="fullName" />
                <ErrorMessage name="fullName" component={TextError} />
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
              <Field as='select' id='province' name='province' onChange={(e) => handleProvinceChange(formik.handleChange, e)}>
                <option hidden value="">-- Tỉnh/Thành phố --</option>
                {provinces.map(province => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="province" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="district">Quận/Huyện:</label>
              <Field as='select' id='district' name='district'>
                <option hidden value="">-- Quận/Huyện --</option>
                {accordingDistricts.map(district => (
                  <option key={district.name} value={district.name}>
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

            <button className="update-btn" type='submit' disabled={!formik.dirty}>Cập nhật</button>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  )
}

export default Profile
