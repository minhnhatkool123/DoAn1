import React from 'react';
import '../scss/cart.scss';

const cart = [
  {
    id: 1,
    name: "Áo Khoác Jean Nữ 505",
    price: 259000,
    color: "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GAK505-2/500-aokhoac-jean-nu-camap.JPG",
    sizes: "M",
    quantity: 1,
  },
  {
    id: 2,
    name: "Áo Khoác Kaki Play Games AK17",
    price: 300000,
    color: "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GK17/500-timhong.jpg",
    sizes: "L",
    quantity: 2,
  }
];

function FullCart() {
  return (
    <div className="full-cart">
      <table>
        {cart.map(item => {
          return (
            <tr>
              <td width="10%" className="image-color-container">
                <div className="image-color" style={{ backgroundImage: `url(${item.color})` }}></div>
              </td>

              <td width="30%" className="product-name">{item.name}</td>

              <td width="15%" className="unit-price">{item.price}</td>

              <td width="15%" className="quantity-adjustment">
                <span className="decrement-btn">-</span>
                <span className="quantity">{item.quantity}</span>
                <span className="increment-btn">+</span>
              </td>

              <td width="15%" className="product-total-price">{item.price * item.quantity}</td>

              <td width="15%" className="remove">
                <span className="remove-btn">Xóa</span>
              </td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}

export default FullCart;