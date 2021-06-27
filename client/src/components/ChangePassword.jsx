import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../recoil/userState';
import { dialogState } from '../recoil/dialogState';
import { resultMessageState, SUCCESS, FAILURE } from '../recoil/resultMessageState';

const initialValues = {
  password: '',
  newPassword: '',
  confirmNewPassword: ''
};

const validationSchema = Yup.object({
  password: Yup.string().required('*Bắt buộc'),
  newPassword: Yup.string()
    .notOneOf([Yup.ref('password'), ''], 'Vui lòng nhập mật khẩu mới khác với mật khẩu hiện tại của bạn')
    .required('*Bắt buộc'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), ''], 'Mật khẩu nhập lại không đúng')
    .required('*Bắt buộc')
});

function ChangePassword() {
  const user = useRecoilValue(userState);
  const setDialog = useSetRecoilState(dialogState);
  const setResultMessage = useSetRecoilState(resultMessageState);

  const onSubmit = (values, { resetForm }) => {
    const data = {
      newPassword: values.newPassword,
      currentPassword: values.password
    }

    const config = {
      headers: {
        Authorization: user.accessToken
      }
    }

    setDialog({
      show: true,
      message: 'Bạn xác nhận muốn đổi mật khẩu?',
      acceptButtonName: 'Xác nhận',
      func: () => {
        axios.patch('http://localhost:5000/user/update-pass', data, config)
          .then(response => {
            // console.log(response.data.message);
            resetForm();
            setResultMessage({
              show: true,
              type: SUCCESS,
              message: 'Mật khẩu mới đã được cập nhật.'
            });
          })
          .catch(error => {
            console.log(error.response.data.message);
            if (error.response.data.message === 'Incorrect password') {
              setResultMessage({
                show: true,
                type: FAILURE,
                message: 'Bạn đã nhập sai mật khẩu.'
              });
            }
          })
      }
    });
  };

  return (
    <React.Fragment>
      <div className="info-title">Thay đổi mật khẩu</div>
      <div className="divider"></div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur={false}
      >
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
      </Formik>
    </React.Fragment>
  )
}

export default ChangePassword
