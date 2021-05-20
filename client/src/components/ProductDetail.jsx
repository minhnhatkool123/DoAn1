import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { addToCart, cartState } from '../recoil/cartState';
import { toastDisplayState } from '../recoil/toastDisplayState';
import { MdLocalShipping } from "react-icons/md";
import { GiTwoCoins } from "react-icons/gi";
import { useHistory } from 'react-router-dom';
import '../scss/productDetail.scss';

const product = {
  id: 5,
  name: "Áo Thun Tay Dài Hình Gấu K204",
  price: "199000",
  colors: [
    "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K204/9309180730_1159735690.jpg",
    "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K204/9309183555_1159735690.jpg"
  ],
  sizes: ["Freesize", "M"],
  status: 0,
  discount: 10000,
  category: "Áo",
  type: "Áo Kiểu Nữ",
  images: [
    "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K204/750-atnu.jpg",
    "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K204/9309183555_1159735690.jpg",
    "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoThun/GAT-K204/9309180730_1159735690.jpg"
  ],
  quantity: 5
};

function ProductDetail(props) {
  const priceRef = useRef(null);
  const history = useHistory();

  const setToastDisplay = useSetRecoilState(toastDisplayState);

  const [cart, setCart] = useRecoilState(cartState);

  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(product.images[0]);
  const [color, setColor] = useState('');

  const handleSubImageClick = (e, image) => {
    setCurrentImage(image);
    const subImages = document.querySelectorAll('.sub-image.active');
    subImages.forEach((subImage) => {
      subImage.classList.remove('active');
    });
    e.target.classList.add('active');
  }

  const handleColorClick = (e) => {
    const subImages = document.querySelectorAll('.color-option.active');
    subImages.forEach((subImage) => {
      subImage.classList.remove('active');
    });
    e.target.classList.add('active');
    console.log(e.target.style.backgroundImage.slice(5, -2));
    setColor(e.target.style.backgroundImage.slice(5, -2));
  }

  const handleAddCartClick = () => {
    console.log({ cart });
    // console.log(priceRef.current.innerText.slice(0, -1));
    const sizeLabel = document.querySelector('input[name="size"]:checked');
    // console.log(item);
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
    } else {
      const item = {
        name: product.name,
        price: parseInt(priceRef.current.innerText.replace('.', '')),
        size: sizeLabel.value,
        color,
        id: product.id + document.querySelector('input[name="size"]:checked').value + color
      }
      const newCart = addToCart(cart, item, quantity);
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      console.log({ newCart });
      setToastDisplay({
        show: true,
        message: <span>Bạn đã thêm sản phẩm <strong>{item.name}</strong> vào giỏ hàng!</span>
      });
    }
  }

  const handleBuyNowClick = () => {
    console.log({ cart });

    const sizeLabel = document.querySelector('input[name="size"]:checked');

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
    } else {
      const item = {
        name: product.name,
        price: parseInt(priceRef.current.innerText.replace('.', '')),
        size: sizeLabel.value,
        color,
        id: product.id + document.querySelector('input[name="size"]:checked').value + color
      }
      const newCart = addToCart(cart, item, quantity);
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      console.log({ newCart });
      history.push('/cart');
    }
  }

  const handleProductDecrement = () => {
    if (quantity >= 2) {
      setQuantity(prevValue => prevValue - 1);
    }
  }

  return (
    <div className="product-detail row">
      <div className="product-images col l-6">
        <div className="main-image" style={{ backgroundImage: `url(${currentImage})` }}></div>
        <div className="sub-images">
          <div className="row">
            {product.images.map(image => {
              return (
                <div className="l-2 sub-image-container" key={product.id}>
                  <div className="sub-image" style={{ backgroundImage: `url(${image})` }} onClick={(e) => handleSubImageClick(e, image)}></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="product-detail-info col l-6">
        <div className="product-title">{product.name}</div>
        <div className="product-price">{(product.price - product.discount).toLocaleString()}đ</div>
        <div className="product-original-price" ref={priceRef}>{parseInt(product.price).toLocaleString()}đ</div>

        <div className="size-group">
          <div className="size-title">Size</div>
          <div className="size-selection">
            {product.sizes.map((size, index) => (
              <div className="size-options">
                <input className="radio-option" type="radio" id={size} name="size" value={size} key={index} />
                <label for={size} className="size-option">{size}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="color-group">
          <div className="color-title">Màu sắc</div>
          <ul className="color-selection">
            {product.colors.map(color => <li className="color-option" key={product.id} style={{ backgroundImage: `url(${color})` }} onClick={handleColorClick}></li>)}
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
          <div className="add-cart-btn" onClick={handleAddCartClick}>Thêm vào giỏ hàng</div>
          <div className="buy-now-btn" onClick={handleBuyNowClick}>Mua ngay</div>
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
    </div>
  );
}

export default ProductDetail;