import React, { useState, useEffect } from 'react';
import '../scss/addNewProduct.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import { IoIosClose } from "react-icons/io";
import { toastDisplayState } from '../recoil/toastDisplayState';
import { useSetRecoilState } from 'recoil';
import categories from '../data/categories';
import types from '../data/types';
import sizes from '../data/sizes';

const validationSchema = null;

const AddNewProduct = React.forwardRef((props, ref) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [accordingTypes, setAccordingTypes] = useState([]);

  const setToastDisplay = useSetRecoilState(toastDisplayState);

  const initialValues = {
    productName: '',
    productPrice: '',
    productCategory: '',
    productType: '',
    productQuantity: ''
  };

  const onSubmit = (values) => {
    console.log(values);
  }

  useEffect(() => {
    const newTypes = types.filter(type => type.categoryName === selectedCategory);
    setAccordingTypes(newTypes);
  }, [selectedCategory]);

  const handleCategoryChange = (handleChange, e) => {
    handleChange(e);
    const category = e.target.selectedOptions[0].value;
    setSelectedCategory(category);
  };

  const handleClosing = () => {
    ref.current.classList.remove('active');
    setSelectedImages([]);
    setSelectedColors([]);
  }

  const handleImagesChoose = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      const expectedImages = [...selectedImages].concat(fileArray);

      if (expectedImages.length > 5) {
        setToastDisplay({
          show: true,
          message: 'Chỉ chọn tối đa 5 ảnh'
        });
      } else {
        setSelectedImages(expectedImages);
      }

      Array.from(e.target.files).map(file => URL.revokeObjectURL(file));
    }
  }

  const handleColorsChoose = (e) => {
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
      }

      Array.from(e.target.files).map(file => URL.revokeObjectURL(file));
    }
  }

  const handleRemoveImageClick = (image) => {
    const expectedImages = selectedImages.filter(img => img !== image);
    setSelectedImages(expectedImages);
  }

  const handleRemoveColorClick = (color) => {
    const expectedColors = selectedColors.filter(img => img !== color);
    setSelectedColors(expectedColors);
  }

  return (
    <div className="add-new-product-zone" ref={ref}>
      <div id="overlay"></div>
      <div className="add-new-product-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {formik => (
            <Form className="form-container">
              <div className="input-control">
                <label htmlFor="productName">Tên sản phẩm</label>
                <div className="input-container">
                  <Field type="text" name="productName" />
                  <ErrorMessage name="productName" component={TextError} />
                </div>
              </div>

              <div className="select-control">
                <label htmlFor="productCategory">Phân loại</label>
                <div className="input-container">
                  <Field as="select" name="productCategory" onChange={(e) => handleCategoryChange(formik.handleChange, e)}>
                    <option hidden value="">-- Phân loại --</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="productCategory" component={TextError} />
                </div>
              </div>

              <div className="select-control">
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

              <div className="input-control">
                <label htmlFor="productPrice">Giá</label>
                <div className="input-container">
                  <div className="price-input">
                    <Field type="text" name="productPrice" />
                    <label className="unit-lb">VND</label>
                  </div>
                  <ErrorMessage name="productPrice" component={TextError} />
                </div>
              </div>

              <div className="input-control">
                <label htmlFor="productDiscount">Khuyến mãi</label>
                <div className="input-container">
                  <div className="price-input">
                    <Field type="text" name="productDiscount" />
                    <label className="unit-lb">VND</label>
                  </div>
                  <ErrorMessage name="productDiscount" component={TextError} />
                </div>
              </div>

              <div className="input-control">
                <label htmlFor="productQuantity">Số lượng</label>
                <div className="input-container">
                  <Field type="text" name="productQuantity" />
                  <ErrorMessage name="productQuantity" component={TextError} />
                </div>
              </div>

              <div className="multi-select-control status-control">
                <label htmlFor="status-options">Trạng thái</label>
                <div className="multi-select-container">
                  <div className="status-options">
                    <Field type="checkbox" id="new" name="productStatus" value="Mới nhất" />
                    <label htmlFor="new">Mới nhất</label>
                    <Field type="checkbox" id="sale" name="productStatus" value="Mới nhất" />
                    <label htmlFor="sale">Khuyến mãi</label>
                    <Field type="checkbox" id="hot" name="productStatus" value="Mới nhất" />
                    <label htmlFor="hot">Bán chạy</label>
                    <Field type="checkbox" id="none" name="productStatus" value="Mới nhất" />
                    <label htmlFor="none">Không có</label>
                  </div>
                  <ErrorMessage name="productStatus" component={TextError} />
                </div>
              </div>

              <div className="multi-select-control size-control">
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
                  <ErrorMessage name="productStatus" component={TextError} />
                </div>
              </div>

              <div className="image-control">
                <label className="label-for-img" htmlFor="product-image">Hình ảnh</label>
                <input type="file" multiple name="file" id="image" onChange={handleImagesChoose} accept="image/*" />
                <div className="product-color">
                  <div className="img-row">
                    {selectedImages.map(image => (
                      <div className="img-col" key={image}>
                        <div className="image-color" style={{ backgroundImage: `url(${image})` }}>
                          <span className="remove-image-btn" onClick={() => handleRemoveImageClick(image)}>
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
                </div>
              </div>

              <div className="image-control">
                <label className="label-for-img" htmlFor="product-color">Màu sắc</label>
                <input type="file" multiple name="file" id="color" onChange={handleColorsChoose} accept="image/*" />
                <div className="product-color">
                  <div className="img-row">
                    {selectedColors.map(color => (
                      <div className="img-col" key={color}>
                        <div className="image-color" style={{ backgroundImage: `url(${color})` }}>
                          <span className="remove-image-btn" onClick={() => handleRemoveColorClick(color)}>
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
                </div>
              </div>

              <div className="btn-group">
                <button type="button" className="cancel-btn" onClick={handleClosing}>Hủy</button>
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
