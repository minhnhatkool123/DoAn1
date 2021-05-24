import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import { AiFillDashboard, AiOutlineDashboard } from "react-icons/ai";

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

function AdminAuthentication() {
  const history = useHistory();

  const onSubmit = (value) => {
    history.push('/admin');
  }

  return (
    <div className="admin-auth full-screen-background" style={{ backgroundImage: `url("/img/fullscreen-bg-4.jpg")` }}>
      <div className="login-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnBlur={false}
        >
          <Form className="form-container">
            <AiOutlineDashboard className="logo-icon" />

            <div className="form-control">
              <Field type="text" id="username" name="username" placeholder="Tài khoản" />
              <ErrorMessage name="username" component={TextError} />
            </div>

            <div className="form-control">
              <Field type="password" id="password" name="password" placeholder="Mật khẩu" />
              <ErrorMessage name="password" component={TextError} />
            </div>

            <button className="submit-btn" type='submit'>Đăng nhập</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
};

export default AdminAuthentication;
