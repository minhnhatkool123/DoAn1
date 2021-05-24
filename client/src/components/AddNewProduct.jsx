import React, { useState } from 'react';
import '../scss/addNewProduct.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';
import { IoIosClose } from "react-icons/io";
import { toastDisplayState } from '../recoil/toastDisplayState';
import { useSetRecoilState } from 'recoil';

const AddNewProduct = React.forwardRef((props, ref) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const setToastDisplay = useSetRecoilState(toastDisplayState);

  const closeAddNewProductZone = () => {
    ref.current.classList.remove('active');
    setSelectedImages([]);
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

  const handleRemoveImageClick = (image) => {
    const expectedImages = selectedImages.filter(img => img !== image);
    setSelectedImages(expectedImages);
  }

  return (
    <div className="add-new-product-zone" ref={ref}>
      <div id="overlay" onClick={closeAddNewProductZone}></div>
      <div className="add-new-product-container">
        <Formik>
          <Form className="form-container">
            <div className="form-control">
              <label htmlFor="product-name">Tên sản phẩm</label>
              <Field type="text" id="product-name" name="product-name" />
              <ErrorMessage name="product-name" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="product-price">Giá</label>
              <Field type="text" id="product-price" name="product-price" />
              <ErrorMessage name="product-price" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="product-price">Hình ảnh/màu sắc</label>
              <input type="file" multiple id="file" onChange={handleImagesChoose} />
              <div className="product-color">
                <div className="img-row">
                  {selectedImages.map(image => (
                    <div className="img-col" key={image}>
                      <div className="image-color" style={{ backgroundImage: `url(${image})` }}>
                        <span className="remove-image-btn" onClick={() => handleRemoveImageClick(image)}><IoIosClose className="remove-image-icon" /></span>
                      </div>
                    </div>
                  ))}
                  {selectedImages.length < 5 && (
                    <div className="img-col">
                      <label htmlFor="file" className="image-upload">+</label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
});

export default AddNewProduct;
