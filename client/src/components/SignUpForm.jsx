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
    console.log(res);

    axios({
      method: 'POST',
      url: 'http://localhost:5000/user/login-google',
      data: { tokenId: res.tokenId },
    }).then((response) => {
      console.log(response);

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
    fullName: Yup.string().required('*B???t bu???c'),
    username: Yup.string().required('*B???t bu???c'),
    email: Yup.string()
      .email('Email kh??ng h???p l???')
      .required('*B???t bu???c'),
    password: Yup.string()
      .min(6, 'M???t kh???u ph???i c?? ??t nh???t 6 k?? t???')
      .required('*B???t bu???c'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'M???t kh???u nh???p l???i kh??ng ????ng')
      .required('*B???t bu???c')
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
              <div>M???t email ???? ???????c g???i ?????n b???n.</div>
              <div>Vui l??ng ki???m tra v?? x??c th???c t??i kho???n ????? ho??n t???t ????ng k??.</div>
            </React.Fragment>
          )
        });
      })
      .catch(error => {
        console.log(error.response.data.message);
        if (error.response.data.message === 'This username already exist') {
          setFieldError('username', 'T??n ????ng nh???p ???? ???????c s??? d???ng');
        } else if (error.response.data.message === 'This email already exist') {
          setFieldError('email', 'Email ???? ???????c s??? d???ng');
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
                  <label htmlFor="fullName">H??? t??n</label>
                  <Field type="text" name="fullName" />
                  <ErrorMessage name="fullName" component={TextError} />
                </div>

                <div className="form-control">
                  <label htmlFor="username">T??i kho???n</label>
                  <Field type="text" name="username" />
                  <ErrorMessage name="username" component={TextError} />
                </div>

                <div className="form-control">
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" component={TextError} />
                </div>

                <div className="form-control">
                  <label htmlFor="password">M???t kh???u</label>
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component={TextError} />
                </div>

                <div className="form-control">
                  <label htmlFor="confirmPassword">Nh???p l???i m???t kh???u</label>
                  <Field type="password" name="confirmPassword" />
                  <ErrorMessage name="confirmPassword" component={TextError} />
                </div>

                <button className="submit-btn" type='submit'>????ng k??</button>

                <div className="strike">
                  <span>HO???C</span>
                </div>

                <GoogleLogin
                  clientId="941926115379-6cbah41jf83kjm236uimrtjdr62t7k71.apps.googleusercontent.com"
                  render={renderProps => (
                    <div onClick={renderProps.onClick} className="google-submit-btn">
                      <FcGoogle className="google-icon" />
                      <span>????ng k?? v???i Google</span>
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