import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../recoil/userState';
import { dialogState } from '../recoil/dialogState';
import { successMessageState } from '../recoil/successMessageState';

const validationSchema = Yup.object({
  newEmail: Yup.string()
    .notOneOf([Yup.ref('currentEmail'), ''], 'Vui lòng nhập email mới khác với email hiện tại của bạn')
    .email('Email không hợp lệ')
    .required('*Bắt buộc')
});

function ChangeEmail() {
  const user = useRecoilValue(userState);
  const setDialog = useSetRecoilState(dialogState);
  const setSuccessMessage = useSetRecoilState(successMessageState);

  const initialValues = {
    currentEmail: user.info.email,
    newEmail: ''
  };

  const onSubmit = values => {
    const data = {
      newEmail: values.newEmail
    }

    const config = {
      headers: {
        Authorization: user.accessToken
      }
    }

    setDialog({
      show: true,
      message: 'Bạn xác nhận muốn cập nhật địa chỉ email?',
      acceptButtonName: 'Xác nhận',
      func: () => {
        axios.patch('http://localhost:5000/user/update-email', data, config)
          .then(response => {
            console.log(response.data.message);
            setSuccessMessage({
              show: true,
              message: (
                <React.Fragment>
                  <div>Một email đã được gửi đến bạn.</div>
                  <div>Vui lòng kiểm tra và xác thực tài khoản để hoàn tất cập nhật.</div>
                </React.Fragment>
              )
            });
          })
          .catch(error => {
            console.log(error.response.data.message);
          })
      }
    });
  };

  return (
    <React.Fragment>
      <div className="info-title">Cập nhật địa chỉ Email</div>
      <div className="divider"></div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur={false}
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
              <Field type="email" name="newEmail" />
              <ErrorMessage name="newEmail" component={TextError} />
            </div>
          </div>

          <button className="update-btn" type='submit'>Cập nhật</button>
        </Form>
      </Formik>
    </React.Fragment>
  );
}

export default ChangeEmail;
