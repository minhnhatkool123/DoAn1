import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../recoil/entryPointState';
import { userState } from '../recoil/userState';
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import TextError from './TextError';
import { FcGoogle } from "react-icons/fc";
import ErrorLoginMessage from './ErrorLoginMessage';
import GoogleLogin from 'react-google-login';

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

const popupVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 60
    }
  }
}

function LoginForm() {
  const setLogin = useSetRecoilState(loginState);
  const setUser = useSetRecoilState(userState);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const closeErrorMessage = () => {
    setShowErrorMessage(false);
  };

  const responseSuccessGoogle = (res) => {
    console.log(res);

    axios({
      method: 'POST',
      url: 'http://localhost:5000/user/login-google',
      data: { tokenId: res.tokenId },
    }).then((response) => {
      console.log(response);
      setUser({
        accessToken: res.tokenId,
        info: response.data.user
      });
      setLogin(false);
    });
  };

  const responseErrorGoogle = (res) => { };

  const onSubmit = (values) => {
    const request = {
      username: values.username,
      password: values.password
    }

    axios.post('http://localhost:5000/user/login', request)
      .then(response => {
        console.log(response.data)
        setUser({
          accessToken: response.data.accessToken,
          info: response.data.user
        });
        setLogin(false);
      })
      .catch(error => {
        console.log(error.response.data.message);
        if (error.response.data.message === 'Please active account') {
          setErrorMsg('Vui lòng xác thực tài khoản trước khi đăng nhập');
        } else {
          setErrorMsg('Tài khoản hoặc mật khẩu không đúng');
        }
        setShowErrorMessage(true);
      });
  };

  return (
    <div id="login-form">
      <motion.div id="overlay" onClick={() => setLogin(false)}
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      ></motion.div>
      <motion.div className="form-container"
        variants={popupVariants}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnBlur={false}
        >
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

            <GoogleLogin
              clientId="941926115379-6cbah41jf83kjm236uimrtjdr62t7k71.apps.googleusercontent.com"
              render={renderProps => (
                <div onClick={renderProps.onClick} className="google-submit-btn">
                  <FcGoogle className="google-icon" />
                  <span>Đăng nhập với Google</span>
                </div>
              )}
              onSuccess={responseSuccessGoogle}
              onFailure={responseErrorGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </Form>
        </Formik>
      </motion.div>

      {showErrorMessage && <ErrorLoginMessage closeErrorMessage={closeErrorMessage} message={errorMsg} />}
    </div>
  );
}

export default LoginForm;