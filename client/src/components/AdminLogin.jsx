import '../scss/adminLogin.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import axios from 'axios';
import vividPinwheel from '../svg/pinwheel_vivid.svg';
import ErrorLoginMessage from './ErrorMessage';
import { useSetRecoilState } from 'recoil';
import { userState } from '../recoil/userState';

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

function AdminLogin() {
  const history = useHistory();
  const setUser = useSetRecoilState(userState);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const errorMsg = 'Tài khoản hoặc mật khẩu không đúng';

  const onSubmit = (values) => {
    const request = {
      username: values.username,
      password: values.password
    }

    axios.post('http://localhost:5000/user/login', request)
      .then(response => {
        // console.log(response.data);
        const userAccessToken = response.data.accessToken;

        const config = {
          headers: {
            Authorization: userAccessToken,
          }
        }

        axios.get('http://localhost:5000/user/info', config)
          .then(res => {
            // console.log(res.data.user);
            if (res.data.user.type === 1) {
              localStorage.setItem('accessToken', userAccessToken);
              setUser({
                accessToken: userAccessToken,
                ...res.data.user
              });
              history.push('/admin');
            } else {
              setShowErrorMessage(true);
            }
          })
          .catch(err => console.log(err))
      })
      .catch(error => {
        console.log(error.response.data.message);
        setShowErrorMessage(true);
      });
  }

  const closeErrorMessage = () => {
    setShowErrorMessage(false);
  };

  return (
    <div className="admin-login full-screen-background" style={{ backgroundImage: `url("/img/sky-background.jpg")` }}>
      <div className="blur-background">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnBlur={false}
        >
          <Form className="admin-login-container">
            <div className="icon-container">
              <img src={vividPinwheel} className="logo-icon" alt="" />
            </div>
            <div className="form-control">
              <label htmlFor="username">Tài khoản</label>
              <Field type="text" id="username" name="username" />
              <ErrorMessage name="username" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="password">Mật khẩu</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component={TextError} />
            </div>

            <button className="submit-btn" type='submit'>Đăng nhập</button>
          </Form>
        </Formik>

        {showErrorMessage && <ErrorLoginMessage closeErrorMessage={closeErrorMessage} message={errorMsg} adminMode />}
      </div>
    </div>
  );
}

export default AdminLogin;