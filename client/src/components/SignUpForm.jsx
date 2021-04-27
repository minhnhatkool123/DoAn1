import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import { FcGoogle } from "react-icons/fc";

const initialValues = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const validationSchema = Yup.object({
  lastName: Yup.string().required('*Bắt buộc'),
  firstName: Yup.string().required('*Bắt buộc'),
  username: Yup.string().required('*Bắt buộc'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('*Bắt buộc'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 kí tự')
    .required('*Bắt buộc'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Mật khẩu nhập lại không đúng')
    .required('*Bắt buộc')
});

const onSubmit = values => {
  console.log('Form data', values);
};

function SignUpForm() {
  return (
    <div id="sign-up-form">
      <div id="overlay"></div>
      <div className="sign-up-form-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {formik => {
            return (
              <Form className="form-interface">
                <div className="name-field">
                  <div className="form-control-half">
                    <label htmlFor="firstName">Tên</label>
                    <Field type="text" id="firstName" name="firstName" />
                    <ErrorMessage name="firstName" component={TextError} />
                  </div>

                  <div className="form-control-half">
                    <label htmlFor="lastName">Họ</label>
                    <Field type="text" id="lastName" name="lastName" />
                    <ErrorMessage name="lastName" component={TextError} />
                  </div>
                </div>

                <div className="form-control">
                  <label htmlFor="username">Tài khoản</label>
                  <Field type="text" id="username" name="username" />
                  <ErrorMessage name="username" component={TextError} />
                </div>

                <div className="form-control">
                  <label htmlFor="email">Email</label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage name="email" component={TextError} />
                </div>

                <div className="form-control">
                  <label htmlFor="password">Mật khẩu</label>
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage name="password" component={TextError} />
                </div>

                <div className="form-control">
                  <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                  <Field type="password" id="confirmPassword" name="confirmPassword" />
                  <ErrorMessage name="confirmPassword" component={TextError} />
                </div>

                <button className="submit-btn" type='submit'>Đăng ký</button>

                <div className="strike">
                  <span>HOẶC</span>
                </div>

                <div className="google-submit-btn">
                  <FcGoogle className="google-icon" />
                  <span>Đăng ký với Google</span>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default SignUpForm;