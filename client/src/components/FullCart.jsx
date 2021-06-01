import '../scss/cart.scss';
import React from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { removeFromCart, decreaseCartItem, increaseCartItem, cartTotalPrice, cartState } from '../recoil/cartState';
import { dialogState } from '../recoil/dialogState';
import { Link } from 'react-router-dom';

function FullCart() {
  const totalPrice = useRecoilValue(cartTotalPrice);

  const [cart, setCart] = useRecoilState(cartState);
  const setDialog = useSetRecoilState(dialogState);

  const handleRemoveProduct = (id) => {
    setDialog({
      show: true,
      message: 'Bạn có chắc muốn xóa sản phẩm này?',
      acceptButtonName: 'Xóa',
      func: () => {
        const newCart = removeFromCart(cart, id);

        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
    });
  }

  const handleProductIncrement = (id) => {
    const newCart = increaseCartItem(cart, id);

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  const handleProductDecrement = (id, quantity) => {
    if (quantity <= 1) return;

    let newCart = [];

    // if (quantity === 1) {
    //   newCart = removeFromCart(cart, id);
    // } else {
    //   newCart = decreaseCartItem(cart, id);
    // }

    newCart = decreaseCartItem(cart, id);

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  return (
    <div className="full-cart">
      <table>
        {cart.map(item => {
          return (
            <tr>
              <td width="10%" className="image-color-container">
                <div className="image-color" style={{ backgroundImage: `url(${item.product.color})` }}></div>
              </td>

              <td width="30%" className="product-name"><Link to={item.product.url}>{`${item.product.name} - ${item.product.size}`}</Link></td>

              <td width="15%" className="unit-price">{item.product.price.toLocaleString()}đ</td>

              <td width="15%" className="quantity-adjustment">
                <span className="decrement-btn" onClick={() => handleProductDecrement(item.id, item.quantity)}>-</span>
                <span className="quantity">{item.quantity}</span>
                <span className="increment-btn" onClick={() => handleProductIncrement(item.id)}>+</span>
              </td>

              <td width="15%" className="product-total-price">{(item.product.price * item.quantity).toLocaleString()}đ</td>

              <td width="15%" className="remove">
                <span className="remove-btn" onClick={() => handleRemoveProduct(item.id)}>Xóa</span>
              </td>
            </tr>
          )
        })}
      </table>

      <div className="totalPrice">Tổng: {totalPrice.toLocaleString()}đ</div>

      <div className="btn-group">
        <Link to='/'><div className="continue-shopping-btn">Tiếp tục mua sắm</div></Link>
        <Link to='/checkout'><div className="checkout-btn">Thanh toán</div></Link>
      </div>
    </div>
  );
}

export default FullCart;