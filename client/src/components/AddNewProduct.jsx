import '../scss/addNewProduct.scss';
import React, { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../recoil/userState';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import { IoIosClose } from "react-icons/io";
import { toastDisplayState } from '../recoil/toastDisplayState';
import categories from '../data/categories';
import types from '../data/types';
import sizes from '../data/sizes';
import axios from 'axios';

const validationSchema = Yup.object({
  productName: Yup.string().required('*Bắt buộc'),
  productCategory: Yup.string().required('*Bắt buộc'),
  productType: Yup.string().required('*Bắt buộc'),
  productPrice: Yup.number()
    .typeError('Giá phải là một số')
    .positive('Giá phải lớn hơn 0')
    .required('*Bắt buộc'),
  productDiscount: Yup.number()
    .typeError('Khuyến mãi phải là một số')
    .min(0, 'Khuyến mãi phải lớn hơn hoặc bằng 0')
    .required('Nhập "0" nếu không có khuyến mãi'),
  productQuantity: Yup.number()
    .required('*Bắt buộc')
    .typeError('Số lượng phải là một số'),
  productStatus: Yup.array().min(1, 'Chọn ít nhất 1 trạng thái'),
  productSize: Yup.array().min(1, 'Chọn ít nhất 1 kích thước'),
  productImages: Yup.array().min(1, 'Chọn ít nhất 1 ảnh'),
  productColors: Yup.array().min(1, 'Chọn ít nhất 1 ảnh')
});

const AddNewProduct = React.forwardRef((props, ref) => {
  const user = useRecoilValue(userState);

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [accordingTypes, setAccordingTypes] = useState([]);

  const [testedImages, setTestedImages] = useState([]);

  const setToastDisplay = useSetRecoilState(toastDisplayState);

  const initialValues = {
    productName: '',
    productPrice: '',
    productCategory: '',
    productType: '',
    productQuantity: '',
    productStatus: [],
    productSize: [],
    productDiscount: '',
    productImages: [],
    productColors: []
  };

  const onSubmit = (values) => {
    console.log(values);

    const config = {
      headers: {
        Authorization: user.accessToken
      }
    }

    // console.log(values.productImages[0]);

    // const payload = {
    //   path: testedImages[0]
    // };

    const data = new FormData();
    data.append('images', JSON.stringify(testedImages))

    // testedImages.forEach((image) => {
    //   data.append('images[]', image);
    // });

    console.log(data)
    // console.log(data.getAll('images[]'));

    axios.post('http://localhost:5000/api/image/upload', data, config)
      .then(response => {
        console.log('uploaded images: ', response.data);

        // const product = {
        //   name: values.productName,
        //   category: values.productCategory,
        //   type: values.productType,
        //   price: values.productPrice,
        //   discount: values.productDiscount,
        //   quantity: values.productQuantity,
        //   sizes: values.productSize,
        //   status: values.productStatus.map(status => parseInt(status)),
        //   colors: values.productColors,
        //   images: response.data
        // }

        // axios.post('http://localhost:5000/api/product/add', product, config)
        //   .then(res => {
        //     console.log(res);
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   })
      })
      .catch(error => {
        console.log(error)
      });
  }

  useEffect(() => {
    const newTypes = types.filter(type => type.categoryName === selectedCategory);
    setAccordingTypes(newTypes);
  }, [selectedCategory]);

  const handleCategoryChange = (handleChange, e, setFieldValue) => {
    handleChange(e);
    const category = e.target.selectedOptions[0].value;
    setSelectedCategory(category);
    setFieldValue('productType', '');
  };

  const handleClosing = (resetForm) => {
    ref.current.classList.remove('active');
    resetForm();
    setSelectedImages([]);
    setSelectedColors([]);
  }

  const handleImagesChoose = (e, setFieldValue) => {
    if (e.target.files) {
      console.log(e.target.files);
      const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      const expectedImages = [...selectedImages].concat(fileArray);

      const testArray = Array.from(e.target.files);
      const images = [...testedImages].concat(testArray);

      if (expectedImages.length > 5) {
        setToastDisplay({
          show: true,
          message: 'Chỉ chọn tối đa 5 ảnh'
        });
      } else {
        setSelectedImages(expectedImages);
        setFieldValue('productImages', expectedImages);
        setTestedImages(e.target.files);
      }

      Array.from(e.target.files).map(file => URL.revokeObjectURL(file));
    }
  }

  const handleColorsChoose = (e, setFieldValue) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      const expectedColors = [...selectedColors].concat(fileArray);

      if (expectedColors.length > 5) {
        setToastDisplay({
          show: true,
          message: 'Chỉ chọn tối đa 5 ảnh'
        });
      } else {
        setSelectedColors(expectedColors);
        setFieldValue('productColors', expectedColors);
      }

      Array.from(e.target.files).map(file => URL.revokeObjectURL(file));
    }
  }

  const handleRemoveImageClick = (image, setFieldValue) => {
    const expectedImages = selectedImages.filter(img => img !== image);
    setSelectedImages(expectedImages);
    setFieldValue('productImages', expectedImages);
  }

  const handleRemoveColorClick = (color, setFieldValue) => {
    const expectedColors = selectedColors.filter(img => img !== color);
    setSelectedColors(expectedColors);
    setFieldValue('productColors', expectedColors);
  }

  return (
    <div className="add-new-product-zone" ref={ref}>
      <div id="overlay"></div>
      <div className="add-new-product-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnBlur={false}
        >
          {formik => (
            <Form className="form-container">
              <div className="form-control">
                <label htmlFor="productName">Tên sản phẩm</label>
                <div className="input-container">
                  <Field type="text" name="productName" />
                  <ErrorMessage name="productName" component={TextError} />
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="productCategory">Phân loại</label>
                <div className="input-container">
                  <Field as="select" name="productCategory" onChange={(e) => handleCategoryChange(formik.handleChange, e, formik.setFieldValue)}>
                    <option hidden value="">-- Phân loại --</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="productCategory" component={TextError} />
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="productType">Loại</label>
                <div className="input-container">
                  <Field as="select" name="productType">
                    <option hidden value="">----- Loại ----</option>
                    {accordingTypes.map(type => (
                      <option key={type.name} value={type.name}>{type.name}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="productType" component={TextError} />
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="productPrice">Giá</label>
                <div className="input-container">
                  <div className="price-input">
                    <Field type="text" name="productPrice" />
                    <label className="unit-lb">VND</label>
                  </div>
                  <ErrorMessage name="productPrice" component={TextError} />
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="productDiscount">Khuyến mãi</label>
                <div className="input-container">
                  <div className="price-input">
                    <Field type="text" name="productDiscount" />
                    <label className="unit-lb">VND</label>
                  </div>
                  <ErrorMessage name="productDiscount" component={TextError} />
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="productQuantity">Số lượng</label>
                <div className="input-container">
                  <Field type="text" name="productQuantity" />
                  <ErrorMessage name="productQuantity" component={TextError} />
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="status-options">Trạng thái</label>
                <div className="multi-select-container">
                  <div className="status-options">
                    <Field type="checkbox" id="new" name="productStatus" value="1" />
                    <label htmlFor="new">Mới nhất</label>
                    <Field type="checkbox" id="sale" name="productStatus" value="2" />
                    <label htmlFor="sale">Khuyến mãi</label>
                    <Field type="checkbox" id="hot" name="productStatus" value="3" />
                    <label htmlFor="hot">Bán chạy</label>
                    <Field type="checkbox" id="none" name="productStatus" value="0" />
                    <label htmlFor="none">Không có</label>
                  </div>
                  <ErrorMessage name="productStatus" component={TextError} />
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="size-options">Kích thước</label>
                <div className="multi-select-container">
                  <div className="size-options">
                    {sizes.map(size => (
                      <React.Fragment key={size}>
                        <Field type="checkbox" id={size} name="productSize" value={size} />
                        <label htmlFor={size}>{size}</label>
                      </React.Fragment>
                    ))}
                  </div>
                  <ErrorMessage name="productSize" component={TextError} />
                </div>
              </div>

              <div className="image-control">
                <label className="label-for-img" htmlFor="product-image">Hình ảnh</label>
                <input type="file" multiple name="productImages" id="image" onChange={(e) => handleImagesChoose(e, formik.setFieldValue)} accept="image/*" />
                <div className="product-color">
                  <div className="img-row">
                    {selectedImages.map(image => (
                      <div className="img-col" key={image}>
                        <div className="image-color" style={{ backgroundImage: `url(${image})` }}>
                          <span className="remove-image-btn" onClick={() => handleRemoveImageClick(image, formik.setFieldValue)}>
                            <IoIosClose className="remove-image-icon" />
                          </span>
                        </div>
                      </div>
                    ))}
                    {selectedImages.length < 5 && (
                      <div className="img-col">
                        <label htmlFor="image" className="image-upload">+</label>
                      </div>
                    )}
                  </div>
                  <ErrorMessage name="productImages" component={TextError} />
                </div>
              </div>

              <div className="image-control">
                <label className="label-for-img" htmlFor="product-color">Màu sắc</label>
                <input type="file" multiple name="productColors" id="color" onChange={(e) => handleColorsChoose(e, formik.setFieldValue)} accept="image/*" />
                <div className="product-color">
                  <div className="img-row">
                    {selectedColors.map(color => (
                      <div className="img-col" key={color}>
                        <div className="image-color" style={{ backgroundImage: `url(${color})` }}>
                          <span className="remove-image-btn" onClick={() => handleRemoveColorClick(color, formik.setFieldValue)}>
                            <IoIosClose className="remove-image-icon" />
                          </span>
                        </div>
                      </div>
                    ))}
                    {selectedColors.length < 5 && (
                      <div className="img-col">
                        <label htmlFor="color" className="image-upload">+</label>
                      </div>
                    )}
                  </div>
                  <ErrorMessage name="productColors" component={TextError} />
                </div>
              </div>

              <div className="btn-group">
                <button type="button" className="cancel-btn" onClick={() => handleClosing(formik.resetForm)}>Hủy</button>
                <button type="submit" className="add-product-btn">Thêm</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
});

export default AddNewProduct;
