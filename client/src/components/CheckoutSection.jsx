import '../scss/checkout.scss';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { cartTotalPrice, cartState } from '../recoil/cartState';
import { toastDisplayState } from '../recoil/toastDisplayState';
import { userState } from '../recoil/userState';
import provinces from '../data/provinces';
import districts from '../data/districts';
import SuccessOrder from './SuccessOrder';

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
  province: Yup.string().required('Vui lòng chọn Tỉnh/Thành phố'),
  district: Yup.string().required('Vui lòng chọn Quận/Huyện')
});

function CheckoutSection() {
  const user = useRecoilValue(userState);
  const totalPrice = useRecoilValue(cartTotalPrice);
  const [cart, setCart] = useRecoilState(cartState);
  const setToastDisplay = useSetRecoilState(toastDisplayState);

  const [province, setProvince] = useState(user.city);
  const [accordingDistricts, setAccordingDistricts] = useState([]);
  const [orderSuccessfully, setOrderSuccessfully] = useState(false);

  useEffect(() => {
    const newDistricts = districts.filter(district => district.provinceName === province);
    setAccordingDistricts(newDistricts);
  }, [province]);

  const initialValues = {
    fullName: user.name,
    phone: user.phone,
    email: user.email,
    province: user.city,
    district: user.district,
    addressDetail: user.address,
    paymentMethod: 'Thanh toán tiền mặt khi nhận hàng',
    note: ''
  };

  const onSubmit = (values) => {
    // console.log('Form data', values);

    const config = {
      headers: {
        Authorization: user.accessToken
      }
    }

    const products = cart.map(cartItem => {
      const { url, quantity, ...item } = cartItem.product;
      return {
        ...item,
        soldQuantity: cartItem.quantity
      }
    })

    const address = `${values.addressDetail}, ${values.district}, ${values.province}`;

    const data = {
      user: user._id,
      paymentMethod: values.paymentMethod,
      products,
      receiverInfo: {
        name: values.fullName,
        email: values.email,
        phone: values.phone,
        address,
        note: values.note
      }
    }

    // console.log(data);

    axios.post('http://localhost:5000/api/order/add', data, config)
      .then(response => {
        // console.log(response.data);
        setCart([]);
        localStorage.removeItem('cart');
        setOrderSuccessfully(true)
      })
      .catch(error => {
        console.log(error.response.data.error);

        const errorProducts = error.response.data.error;

        setToastDisplay({
          show: true,
          message: errorProducts.map(errProduct => <div><strong>{errProduct.name}</strong> hiện chỉ còn <strong>{errProduct.quantity}</strong> sản phẩm</div>)
        });
      })
  };

  const handleProvinceChange = (handleChange, e, setFieldValue) => {
    handleChange(e);
    setProvince(e.target.selectedOptions[0].value);
    setFieldValue('district', '');
  };

  return (
    <React.Fragment>
      {orderSuccessfully && <SuccessOrder />}
      {!orderSuccessfully && <Formik
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
                <Field as='select' id='province' name='province' onChange={(e) => handleProvinceChange(formik.handleChange, e, formik.setFieldValue)}>
                  <option hidden value="">-- Tỉnh/Thành phố --</option>
                  {provinces.map(province => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="province" component={TextError} />
              </div>

              <div className="form-control">
                <Field as='select' id='district' name='district'>
                  <option hidden value="">-- Quận/Huyện --</option>
                  {accordingDistricts.map(district => (
                    <option key={district.name} value={district.name}>
                      {district.name}
                    </option>
                  ))}
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
                    <Field
                      type="radio"
                      id="moneyTransfer"
                      name="paymentMethod"
                      value="Chuyển khoản trước qua tài khoản ngân hàng"
                    />
                    <label htmlFor="moneyTransfer">Chuyển khoản trước qua tài khoản ngân hàng</label>
                  </div>
                </div>

                <div className="method-detail">
                  Với phương thức Chuyển khoản trước qua tài khoản ngân hàng, bộ phận CSKH sẽ gọi điện đến bạn để xác nhận đơn hàng và hướng dẫn cách thức thanh toán chuyển khoản.
                </div>
              </div>

              <div className="checkout-method">
                <div className="form-control">
                  <div className="input-container">
                    <Field
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="Thanh toán tiền mặt khi nhận hàng"
                    />
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
                      <td className="product-unit-price">{(item.product.price - item.product.discount).toLocaleString()}đ</td>
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
                    <td width="40%">25,000đ</td>
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
      </Formik>}
    </React.Fragment>
  )
}

export default CheckoutSection
