import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import { FcGoogle } from "react-icons/fc";

const initialValues = {
  username: '',
  password: ''
};

const validationSchema = Yup.object({
  username: Yup.string().required('Chưa nhập tài khoản'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 kí tự')
    .required('Chưa nhập mật khẩu')
});

const onSubmit = values => {
  console.log('Form data', values);
};

function LoginForm() {
  return (
    <div id="login-form">
      <div id="overlay"></div>
      <div className="form-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {formik => {
            return (
              <Form className="form-interface">
                <div className="form-control">
                  <label htmlFor="name">Tài khoản</label>
                  <Field type="text" id="username" name="username" />
                  <ErrorMessage name="username" component={TextError} />
                </div>

                <div className="form-control">
                  <label htmlFor="password">Mật khẩu</label>
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage name="password" component={TextError} />
                </div>

                <button className="submit-btn" type='submit'>Đăng nhập</button>

                <div className="strike">
                  <span>HOẶC</span>
                </div>

                <div className="google-submit-btn">
                  <FcGoogle className="google-icon" />
                  <span>Đăng nhập với Google</span>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm;