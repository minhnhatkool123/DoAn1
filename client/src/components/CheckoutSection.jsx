import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../scss/checkout.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import { useRecoilValue, useRecoilState } from 'recoil';
import { removeFromCart, decreaseCartItem, increaseCartItem, cartTotalPrice, cartState } from '../recoil/cartState';

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  province: '',
  district: '',
  addressDetail: ''
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  fullName: Yup.string().required('*Bắt buộc'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('*Bắt buộc'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
    .required('*Bắt buộc'),
  addressDetail: Yup.string().required('*Bắt buộc'),
});

const onSubmit = values => {
  console.log('Form data', values);
};

let provinces = [];
let districts = [];
let accordingDistricts = [];

function CheckoutSection() {
  const totalPrice = useRecoilValue(cartTotalPrice);

  const [cart, setCart] = useRecoilState(cartState);

  const [provinceId, setProvinceId] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    axios.get('https://dc.tintoc.net/app/api-customer/public/provinces?size=64')
      .then((response) => {
        response.data.shift();
        response.data.sort((a, b) => a.name.localeCompare(b.name)).forEach(item => {
          provinces.push({
            id: item.id,
            name: item.name
          })
        });
        // console.log('push xong provinces');
        // console.log(provinces);
      })
      .catch(error => console.log(error))

    axios.get('https://dc.tintoc.net/app/api-customer/public/districts?size=1000')
      .then((response) => {
        response.data.forEach(item => {
          districts.push({
            id: item.id,
            name: item.name,
            provinceId: item.provinceId
          })
        });
        // console.log('districts', districts);
        setProvinceId(1);
        setForceUpdate(value => !value);
      })
      .catch(error => console.log(error))
  }, []);

  useEffect(() => {
    accordingDistricts = districts.filter(district => district.provinceId == provinceId);
  }, [provinceId]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form className="checkout-section">
          <div className="buyer-info l-4">
            <div className="step-container">
              <div className="step-number">1</div>
              <div className="step-title">Thông tin người nhận</div>
            </div>

            <div className="form-control">
              <Field type="text" id="fullName" name="fullName" placeholder="Họ tên" />
              <ErrorMessage name="fullName" component={TextError} />
            </div>

            <div className="form-control">
              <Field type="text" id="phone" name="phone" placeholder="Điện thoại" />
              <ErrorMessage name="phone" component={TextError} />
            </div>

            <div className="form-control">
              <Field type="email" id="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component={TextError} />
            </div>

            <div className="form-control">
              <Field type="text" id="addressDetail" name="addressDetail" placeholder="Địa chỉ chi tiết" />
              <ErrorMessage name="addressDetail" component={TextError} />
            </div>

            <div className="form-control">
              <Field as='select' id='province' name='province' onClick={(e) => setProvinceId(e.target.selectedOptions[0].value)}>
                {provinces.map(province => {
                  return (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  );
                })}
              </Field>
              <ErrorMessage name="province" component={TextError} />
            </div>

            <div className="form-control">
              <Field as='select' id='district' name='district'>
                {accordingDistricts.map(district => {
                  return (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  );
                })}
              </Field>
              <ErrorMessage name="district" component={TextError} />
            </div>

            <div className="form-control">
              <Field as="textarea" id="note" name="note" placeholder="Ghi chú" />
              <ErrorMessage name="note" component={TextError} />
            </div>
          </div>

          <div className="payment-method l-4">
            <div className="step-container">
              <div className="step-number">2</div>
              <div className="step-title">Phương thức thanh toán</div>
            </div>

            <div className="checkout-method">
              <div className="form-control">
                <div className="input-container">
                  <Field type="radio" id="money-transfer" name="checkout-method" />
                  <label htmlFor="money-transfer">Chuyển khoản trước qua tài khoản ngân hàng</label>
                </div>
              </div>

              <div className="method-detail">
                Với phương thức Chuyển khoản trước qua tài khoản ngân hàng, bộ phận CSKH sẽ gọi điện đến bạn để xác nhận đơn hàng và hướng dẫn cách thức thanh toán chuyển khoản.
              </div>
            </div>

            <div className="checkout-method">
              <div className="form-control">
                <div className="input-container">
                  <Field type="radio" id="cod" name="checkout-method" />
                  <label htmlFor="cod">Thanh toán tiền mặt khi nhận hàng</label>
                </div>
              </div>

              <div className="method-detail">
                Thanh toán khi nhận hàng (COD) chỉ áp dụng cho các đơn hàng ở các quận/huyện thuộc Hà Nội/TP.HCM
              </div>
            </div>
          </div>

          <div className="cart-info l-4">
            <div className="step-container">
              <div className="step-number">3</div>
              <div className="step-title">Thông tin giỏ hàng</div>
            </div>

            <table className="cart-detail" width="100%">
              <thead>
                <tr>
                  <th width="55%" className="product-name">Tên sản phẩm</th>
                  <th width="20%" className="product-quantity">Số lượng</th>
                  <th width="25%" className="product-unit-price">Đơn giá</th>
                </tr>
              </thead>

              <tbody>
                {cart.map(item => (
                  <tr className="cart-item">
                    <td className="product-name">{`${item.product.name} - ${item.product.size}`}</td>
                    <td className="product-quantity">{item.quantity}</td>
                    <td className="product-unit-price">{item.product.price.toLocaleString()}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="cart-total-price" width="100%">
              <tfoot>
                <tr>
                  <td width="60%">Tạm tính</td>
                  <td width="40%">{totalPrice.toLocaleString()}đ</td>
                </tr>

                <tr>
                  <td width="60%">Phí vận chuyển</td>
                  <td width="40%">25.000đ</td>
                </tr>

                <tr>
                  <td width="60%">Tổng cộng</td>
                  <td width="40%">{(totalPrice + 25000).toLocaleString()}đ</td>
                </tr>
              </tfoot>
            </table>

            <button type="submit" className="order-btn">Đặt hàng</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default CheckoutSection
