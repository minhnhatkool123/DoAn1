import React, { useState } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
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

function LoginForm(props) {
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const closeErrorMessage = () => {
    setShowErrorMessage(false);
  };

  const responseSuccessGoogle = (res) => {
    console.log(res);
    axios({
      method: 'POST',
      url: 'http://localhost:5000/user/login-google',
      data: { tokenId: res.tokenId },
    }).then((res) => {
      console.log(res);
    });
  };

  const responseErrorGoogle = (res) => { };

  const onSubmit = values => {
    const request = {
      username: values.username,
      password: values.password
    }

    axios.post('http://localhost:5000/user/login', request)
      .then(response => {
        const jwt = response.data.accessToken;

        localStorage.setItem('jwt', jwt);

        const config = {
          headers: {
            Authorization: jwt
          }
        };

        axios.get('http://localhost:5000/user/get-info-user', config)
          .then(userInfo => {
            console.log(userInfo);
            localStorage.setItem('name', userInfo.data.name);
            props.closeLogin();
          })
          .catch(err => {
            console.log(err.response.data.message);
          });
      })
      .catch(error => {
        console.log(error.response.data.message);
        setShowErrorMessage(true);
      });
  };

  return (
    <div id="login-form">
      <motion.div id="overlay"
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
                {/* <GoogleLogin
                  clientId="941926115379-6cbah41jf83kjm236uimrtjdr62t7k71.apps.googleusercontent.com"
                  buttonText="Login with gg"
                  onSuccess={responseSuccessGoogle}
                  onFailure={responseErrorGoogle}
                  cookiePolicy={'single_host_origin'}
                /> */}
              </Form>
            );
          }}
        </Formik>
      </motion.div>

      {showErrorMessage ? <ErrorLoginMessage closeErrorMessage={closeErrorMessage} /> : null}
    </div>
  );
}

export default LoginForm;