import '../scss/productDetail.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { addToCart, cartState } from '../recoil/cartState';
import { toastDisplayState } from '../recoil/toastDisplayState';
import { MdLocalShipping } from "react-icons/md";
import { GiTwoCoins } from "react-icons/gi";
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { EatLoading } from 'react-loadingg';
import FetchError from './FetchError';
import uuid from 'react-uuid';

const getProduct = async (id) => {
  console.log(`http://localhost:5000/api/product/get-product/${id}`)
  const response = await axios.get(`http://localhost:5000/api/product/get-product/${id}`);
  return response.data;
}

function ProductDetail() {
  const { pathname: url } = useLocation();
  const { id } = useParams();
  const history = useHistory();

  const { data: product, isLoading, isError, refetch } = useQuery('productDetail', () => getProduct(id));

  const priceRef = useRef(null);

  const [cart, setCart] = useRecoilState(cartState);
  const setToastDisplay = useSetRecoilState(toastDisplayState);

  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    refetch();
  }, [url]);

  const handleSubImageClick = (e, image) => {
    // deactivate all the sub-images, then activate the selected sub-image
    const subImages = document.querySelectorAll('.sub-image.active');
    subImages.forEach((subImage) => {
      subImage.classList.remove('active');
    });
    e.target.classList.add('active');

    // set current image as selected sub-image
    setCurrentImage(image);
  }

  const handleColorClick = (e) => {
    // deactivate all the image-colors, then activate the selected image-color
    const subImages = document.querySelectorAll('.color-option.active');
    subImages.forEach((subImage) => {
      subImage.classList.remove('active');
    });
    e.target.classList.add('active');

    // set current color as selected image-color
    setColor(e.target.style.backgroundImage.slice(5, -2));
  }

  const addProductToCart = (sizeLabel, buttonType) => {
    //create a product object from existing information
    const item = {
      name: product.name,
      price: parseInt(priceRef.current.innerText.replace('.', '')),
      size: sizeLabel.value,
      color,
      id: product.id,
      url: url
    }
    // create new cart from the product just created and product quantity
    const newCart = addToCart(cart, item, quantity, uuid());
    // update cart state with new cart
    setCart(newCart);
    // save new cart to the local storage
    localStorage.setItem('cart', JSON.stringify(newCart));

    // if press the 'add_to_cart' button, then show the toast message
    // if press the 'buy_now' button, then go to the Cart Page
    if (buttonType === 'add_to_cart') {
      setToastDisplay({
        show: true,
        message: <span>Bạn đã thêm sản phẩm <strong>{item.name}</strong> vào giỏ hàng!</span>
      });
    } else {
      history.push('/cart');
    }
  }

  const handleAddProductToCart = (buttonType) => {
    // get selected size from checked size label
    const sizeLabel = document.querySelector('input[name="size"]:checked');
    // check if the product information is not complete, then show the toast message, otherwise add the product to cart
    if (!sizeLabel) {
      setToastDisplay({
        show: true,
        message: 'Bạn chưa chọn size cho sản phẩm'
      });
    } else if (!color) {
      setToastDisplay({
        show: true,
        message: 'Bạn chưa chọn màu cho sản phẩm'
      });
    } else if (quantity > product.quantity) {
      setToastDisplay({
        show: true,
        message: <span>Sản phẩm <strong>{product.name}</strong> hiện chỉ còn <strong>{product.quantity}</strong> sản phẩm</span>
      });
    } else {
      addProductToCart(sizeLabel, buttonType);
    }
  }

  const handleProductDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevValue => prevValue - 1);
    }
  }

  return (
    <React.Fragment>
      {isLoading && <div style={{ height: '80vh' }}><EatLoading color='#ffb0bd' /></div>}
      {isError && <FetchError />}
      {product && <div className="product-detail row">
        <div className="product-images col l-6">
          <div className="main-image" style={{ backgroundImage: `url(${currentImage || product.images[0]})` }}></div>
          <div className="sub-images">
            <div className="row">
              {product.images.map((image, index) => {
                return (
                  <div className="l-2 sub-image-container" key={index}>
                    <div className="sub-image" style={{ backgroundImage: `url(${image})` }} onClick={(e) => handleSubImageClick(e, image)}></div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="product-detail-info col l-6">
          <div className="product-title">{product.name}</div>
          <div className="product-price" ref={priceRef}>{(product.price - product.discount).toLocaleString()}đ</div>
          {product.discount > 0 && <div className="product-original-price">{parseInt(product.price).toLocaleString()}đ</div>}

          <div className="size-group">
            <div className="size-title">Size</div>
            <div className="size-selection">
              {product.sizes.map((size, index) => (
                <div className="size-options" key={index}>
                  <input className="radio-option" type="radio" id={size} name="size" value={size} />
                  <label htmlFor={size} className="size-option">{size}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="color-group">
            <div className="color-title">Màu sắc</div>
            <ul className="color-selection">
              {product.colors.map((color, index) => <li className="color-option" key={index} style={{ backgroundImage: `url(${color})` }} onClick={handleColorClick}></li>)}
            </ul>
          </div>

          <div className="quantity-group">
            <div className="quantity-title">Số lượng</div>
            <ul className="quantity-btn-group">
              <li onClick={handleProductDecrement}> - </li>
              <li>{quantity}</li>
              <li onClick={() => setQuantity(quantity + 1)}> + </li>
            </ul>
          </div>

          <div className="btn-group">
            <div className="add-cart-btn" onClick={() => handleAddProductToCart('add_to_cart')}>Thêm vào giỏ hàng</div>
            <div className="buy-now-btn" onClick={() => handleAddProductToCart('buy_now')}>Mua ngay</div>
          </div>

          <div className="shipping-policy">
            <div className="extra-info">
              <MdLocalShipping className="icon" />
              <div className="info">Giao hàng toàn quốc đơn hàng từ 100k</div>
            </div>

            <div className="extra-info">
              <GiTwoCoins className="icon" />
              <div className="info">COD nội thành Hà Nội, Hồ Chí Minh</div>
            </div>
          </div>
        </div>
      </div>}
    </React.Fragment>
  );
}

export default ProductDetail;