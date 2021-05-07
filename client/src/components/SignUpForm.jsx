import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import { FcGoogle } from "react-icons/fc";
import SuccessfulRegistration from './SuccessfulRegistration';

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

function SignUpForm(props) {
  const [registerSuccessfully, setRegisterSuccessfully] = useState(false);
  const [existedUsername, setExistedUsername] = useState(['admin']);

  const validationSchema = Yup.object({
    fullName: Yup.string().required('*Bắt buộc'),
    username: Yup.string()
      .required('*Bắt buộc')
      .notOneOf(existedUsername, 'Tên đăng nhập đã được sử dụng'),
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
    const request = {
      name: values.fullName,
      username: values.username,
      email: values.email,
      password: values.password
    }

    axios.post('http://localhost:5000/user/register', request)
      .then(response => {
        console.log('Response: ', response.data.message);
        setRegisterSuccessfully(true);
      })
      .catch(error => {
        console.log(error.response.data.message);
        if (error.response.data.message === 'This username already exist') {
          const errorUsername = document.querySelector("input[name='username']").value;
          setExistedUsername([...existedUsername, errorUsername]);
          const usernameField = document.querySelector("input[name='username']");
          usernameField.focus();
          usernameField.blur();
        }
      });
  };

  useEffect(() => {
    console.log(existedUsername);
  }, [existedUsername]);

  if (registerSuccessfully) {
    return <SuccessfulRegistration signUpSuccessfully={props} />;
  } else {
    return (
      <div id="sign-up-form">
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
          >
            {formik => {
              return (
                <Form className="form-interface">
                  <div className="form-control">
                    <label htmlFor="fullName">Họ tên</label>
                    <Field type="text" id="fullName" name="fullName" />
                    <ErrorMessage name="fullName" component={TextError} />
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
        </motion.div>
      </div>
    );
  }
}

export default SignUpForm;