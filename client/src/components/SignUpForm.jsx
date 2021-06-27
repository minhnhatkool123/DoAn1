import React from 'react';
import { useSetRecoilState } from 'recoil';
import { signUpState } from '../recoil/entryPointState';
import { userState } from '../recoil/userState';
import { resultMessageState, SUCCESS } from '../recoil/resultMessageState';
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import TextError from './TextError';
import GoogleLogin from 'react-google-login';

const initialValues = {
  fullName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const initialSuggestedValues = {
  fullName: 'Arina',
  username: 'koalaciu10x',
  email: 'petrinhtrinh182@gmail.com',
  password: '123456',
  confirmPassword: '123456'
};

const popupVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 60
    }
  }
}

function SignUpForm() {
  const setSignUp = useSetRecoilState(signUpState);
  const setUser = useSetRecoilState(userState);
  const setResultMessage = useSetRecoilState(resultMessageState);

  const responseSuccessGoogle = (res) => {
    // console.log(res);

    axios({
      method: 'POST',
      url: 'http://localhost:5000/user/login-google',
      data: { tokenId: res.tokenId },
    }).then((response) => {
      // console.log(response);

      const userAccessToken = response.data.accessToken;

      const config = {
        headers: {
          Authorization: userAccessToken,
        }
      }

      axios.get('http://localhost:5000/user/info', config)
        .then(res => {
          console.log(res.data.user);
          localStorage.setItem('accessToken', userAccessToken);
          setUser({
            accessToken: userAccessToken,
            ...res.data.user
          });
        })
        .catch(err => console.log(err))

      setSignUp(false);
    });
  };

  const responseErrorGoogle = (err) => { };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('*Bắt buộc'),
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

  const onSubmit = (values, { setFieldError }) => {
    const request = {
      name: values.fullName,
      username: values.username,
      email: values.email,
      password: values.password
    }

    axios.post('http://localhost:5000/user/register', request)
      .then(response => {
        // console.log(response.data.message);
        setSignUp(false);
        setResultMessage({
          show: true,
          type: SUCCESS,
          message: (
            <React.Fragment>
              <div>Một email đã được gửi đến bạn.</div>
              <div>Vui lòng kiểm tra và xác thực tài khoản để hoàn tất đăng ký.</div>
            </React.Fragment>
          )
        });
      })
      .catch(error => {
        console.log(error.response.data.message);
        if (error.response.data.message === 'This username already exist') {
          setFieldError('username', 'Tên đăng nhập đã được sử dụng');
        } else if (error.response.data.message === 'This email already exist') {
          setFieldError('email', 'Email đã được sử dụng');
        }
      });
  };

  return (
    <div id="sign-up-form">
      <motion.div id="overlay" onClick={() => setSignUp(false)}
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
        >
          {formik => {
            return (
              <Form className="form-interface">
                <div className="form-control">
                  <label htmlFor="fullName">Họ tên</label>
                  <Field type="text" name="fullName" />
                  <ErrorMessage name="fullName" component={TextError} />
                </div>

                <div className="form-control">
                  <label htmlFor="username">Tài khoản</label>
                  <Field type="text" name="username" />
                  <ErrorMessage name="username" component={TextError} />
                </div>

                <div className="form-control">
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" component={TextError} />
                </div>

                <div className="form-control">
                  <label htmlFor="password">Mật khẩu</label>
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component={TextError} />
                </div>

                <div className="form-control">
                  <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                  <Field type="password" name="confirmPassword" />
                  <ErrorMessage name="confirmPassword" component={TextError} />
                </div>

                <button className="submit-btn" type='submit'>Đăng ký</button>

                <div className="strike">
                  <span>HOẶC</span>
                </div>

                <GoogleLogin
                  clientId="941926115379-6cbah41jf83kjm236uimrtjdr62t7k71.apps.googleusercontent.com"
                  render={renderProps => (
                    <div onClick={renderProps.onClick} className="google-submit-btn">
                      <FcGoogle className="google-icon" />
                      <span>Đăng ký với Google</span>
                    </div>
                  )}
                  onSuccess={responseSuccessGoogle}
                  onFailure={responseErrorGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              </Form>
            );
          }}
        </Formik>
      </motion.div>
    </div>
  );
}

export default SignUpForm;