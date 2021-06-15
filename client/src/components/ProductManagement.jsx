import React, { useState } from 'react';
import '../scss/productManagement.scss';
import viewIcon from '../svg/visibility.svg';
import editIcon from '../svg/edit.svg';
import deleteIcon from '../svg/delete.svg';
import { useQuery } from 'react-query';
import axios from 'axios';

const product = {
  "_id": "60af5e5d303b111c3144e306",
  "name": "Áo Khoác Kaki Nữ AK12 Kaki Nữ AK12",
  "colors": [
    "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GK12/500-den.jpg"
  ],
  "sizes": [
    "Freesize"
  ],
  "status": [
    1,
    2
  ],
  "discount": 20000,
  "category": "Áo",
  "type": "Áo Khoác Nữ",
  "images": [
    "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GK12/750.jpg",
    "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GK12/500-trang.jpg",
    "http://gaugaushop.com/plugins/responsive_filemanager/source/san%20pham/AoKhoacNu/GK12/500-den.jpg"
  ],
  "quantity": 5,
  "real_price": 370000,
  "new_price": 350000
};

const productStatus = {
  '0': 'không có',
  '1': 'mới nhất',
  '2': 'khuyến mãi',
  '3': 'bán chạy'
}

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ProductManagement() {
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('');

  const { data, isLoading, isError } = useQuery(['managedProducts'], async () => {
    const response = await axios.get(`http://localhost:5000/api/product/all?page=1&limit=8`);
    console.log(response.data);
    return response.data;
  });

  return (
    <React.Fragment>
      <div className="product-other-features">
        <span className="title">Danh sách sản phẩm</span>
        <input type="text" placeholder="Tìm kiếm sản phẩm..." className="product-search"></input>
        <div className="add-product-btn">+</div>
      </div>
      <div className="product-table">
        <div className="title-list">
          <div className="image-title fl-6 fl-o-1">Ảnh</div>
          <div className="name-title fl-20">Tên sản phẩm</div>
          <div className="type-title fl-15">Loại</div>
          <div className="quantity-title fl-8">Số lượng</div>
          <div className="status-title fl-17">Trạng thái</div>
          <div className="unit-price-title fl-10">Đơn giá</div>
          <div className="discount-title fl-10">Khuyến mãi</div>
          <div className="manipulation fl-13"></div>
        </div>

        <div className="product-list">
          {data?.products.map(product => (
            <div className="product-item">
              <div className="product-image-container fl-6 fl-o-1">
                <div className="product-image" style={{ backgroundImage: `url(${product.images[0]})` }}></div>
              </div>
              <div className="product-name fl-20">{product.name}</div>
              <div className="product-type fl-15">{product.type}</div>
              <div className="product-quantity fl-8">{product.quantity}</div>
              <div className="product-status fl-17">{capitalize(product.status.map(status => productStatus[status]).join(', '))}</div>
              <div className="product-unit-price fl-10">{product.real_price.toLocaleString()}đ</div>
              <div className="product-discount fl-10">{product.discount.toLocaleString()}đ</div>
              <div className="product-manipulation fl-13">
                <div className="view-btn">
                  <img src={viewIcon} className="btn-icon" alt="" />
                </div>
                <div className="edit-btn">
                  <img src={editIcon} className="btn-icon" alt="" />
                </div>
                <div className="delete-btn">
                  <img src={deleteIcon} className="btn-icon" alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProductManagement;