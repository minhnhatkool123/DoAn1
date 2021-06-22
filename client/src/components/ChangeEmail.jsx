import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import OTPVerification from './OTPVerification';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/userState';

const validationSchema = Yup.object({
  newEmail: Yup.string()
    .notOneOf([Yup.ref('currentEmail'), ''], 'Vui lòng nhập email mới khác với email hiện tại của bạn')
    .email('Email không hợp lệ')
    .required('*Bắt buộc')
});

function ChangeEmail() {
  const [user, setUser] = useRecoilState(userState);

  const OTPVerificationRef = React.createRef();
  const newEmailRef = useRef(null);

  const initialValues = {
    currentEmail: user.email,
    newEmail: ''
  };

  const onSubmit = (values, { setFieldError }) => {
    const data = {
      newEmail: values.newEmail
    }

    const config = {
      headers: {
        Authorization: user.accessToken
      }
    }

    axios.patch('http://localhost:5000/user/update-email', data, config)
      .then(response => {
        console.log(response.data);
        OTPVerificationRef.current.classList.add('active');
        setUser({ ...user, emailToken: response.data.token });
      })
      .catch(error => {
        console.log(error.response.data.message);
        if (error.response.data.message === 'This email already exists') {
          setFieldError('newEmail', 'Email đã được sử dụng');
        }
      })
  };

  const resendOTP = () => {
    const data = {
      newEmail: newEmailRef.current.value
    }

    const config = {
      headers: {
        Authorization: user.accessToken
      }
    }

    axios.patch('http://localhost:5000/user/update-email', data, config)
      .then(response => {
        console.log(response.data);
        setUser({ ...user, emailToken: response.data.token });
      })
      .catch(error => console.log(error.response.data.message))
  }

  return (
    <React.Fragment>
      <div className="info-title">Cập nhật địa chỉ Email</div>
      <div className="divider"></div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur={false}
        enableReinitialize
      >
        <Form className="form-interface">
          <div className="form-control">
            <label htmlFor="currentEmail">Địa chỉ email hiện tại:</label>
            <div className="input-container">
              <Field type="email" name="currentEmail" disabled />
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="newEmail">Địa chỉ email mới:</label>
            <div className="input-container">
              <Field type="email" name="newEmail" innerRef={newEmailRef} />
              <ErrorMessage name="newEmail" component={TextError} />
            </div>
          </div>

          <button className="update-btn" type='submit'>Cập nhật</button>
        </Form>
      </Formik>

      <OTPVerification ref={OTPVerificationRef} resendOTP={resendOTP} />
    </React.Fragment>
  );
}

export default ChangeEmail;
