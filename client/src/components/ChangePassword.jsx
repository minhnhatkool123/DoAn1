import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';

const initialValues = {
  password: '',
  newPassword: '',
  confirmNewPassword: ''
};

const validationSchema = Yup.object({
  password: Yup.string().required('*Bắt buộc'),
  newPassword: Yup.string().required('*Bắt buộc'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Mật khẩu nhập lại không đúng')
    .required('*Bắt buộc')
});

const onSubmit = values => {
  console.log('Form data', values);
};

function ChangePassword() {
  return (
    <React.Fragment>
      <div className="info-title">Thay đổi mật khẩu</div>
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
                <label htmlFor="password">Nhập mật khẩu:</label>
                <div className="input-container">
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage name="password" component={TextError} />
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="newPassword">Nhập mật khẩu mới:</label>
                <div className="input-container">
                  <Field type="password" id="newPassword" name="newPassword" />
                  <ErrorMessage name="newPassword" component={TextError} />
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="confirmNewPassword">Nhập lại mật khẩu mới:</label>
                <div className="input-container">
                  <Field type="password" id="confirmNewPassword" name="confirmNewPassword" />
                  <ErrorMessage name="confirmNewPassword" component={TextError} />
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

export default ChangePassword
