import React, { useState } from 'react';
import '../scss/productManagement.scss';
import viewIcon from '../svg/visibility.svg';
import editIcon from '../svg/edit.svg';
import deleteIcon from '../svg/delete.svg';
import { useQuery } from 'react-query';
import axios from 'axios';
import { AiOutlinePlus } from "react-icons/ai";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import AddNewProduct from './AddNewProduct';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dialogState } from '../recoil/dialogState';
import { userState } from '../recoil/userState';
import ReactPaginate from "react-paginate";

const productStatus = {
  '0': {
    key: 'none',
    value: 'Không có'
  },
  '1': {
    key: 'new',
    value: 'Mới'
  },
  '2': {
    key: 'sale',
    value: 'Khuyến mãi'
  },
  '3': {
    key: 'hot',
    value: 'Bán chạy'
  }
}

function ProductManagement() {
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('');

  const addNewProductRef = React.createRef();

  const user = useRecoilValue(userState);
  const setDialog = useSetRecoilState(dialogState);

  const { data, isLoading, isError, refetch } = useQuery(['managedProducts', page], async () => {
    const response = await axios.get(`http://localhost:5000/api/product/all?page=${page + 1}&limit=8`);
    setTotalPages(response.data.totalPages);
    // console.log(response.data);
    return response.data;
  });

  const handleAddProductClick = () => {
    addNewProductRef.current.classList.add('active');
  }

  const handleEditProductClick = (product) => {

  }

  const handleDeleteProductClick = (id) => {
    setDialog({
      show: true,
      message: 'Bạn có chắc muốn xóa sản phẩm này?',
      acceptButtonName: 'Xóa',
      adminMode: true,
      func: () => {
        const config = {
          headers: {
            Authorization: user.accessToken
          }
        }

        axios.delete(`http://localhost:5000/api/product/delete/${id}`, config)
          .then(response => {
            console.log(response.data.message);
            refetch();
          })
          .catch(error => {
            console.log(error);
          })
      }
    });
  }

  const handlePageChange = ({ selected }) => {
    console.log('page click: ', selected);
    setPage(selected);
  };

  return (
    <React.Fragment>
      <div className="product-other-features">
        <span className="title">Danh sách sản phẩm</span>
        <input type="text" placeholder="Tìm kiếm sản phẩm..." className="product-search"></input>
        <div className="add-product-btn" onClick={handleAddProductClick}><AiOutlinePlus className="add-icon" /></div>
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
              <div className="product-status fl-17">
                {product.status.map(status => (
                  <label key={status} className={'status-label ' + productStatus[status].key}>{productStatus[status].value}</label>
                ))}
              </div>
              <div className="product-unit-price fl-10">{product.real_price.toLocaleString()}đ</div>
              <div className="product-discount fl-10">{product.discount.toLocaleString()}đ</div>
              <div className="product-manipulation fl-13">
                <div className="view-btn">
                  <img src={viewIcon} className="btn-icon" alt="" />
                </div>
                <div className="edit-btn" onClick={() => handleEditProductClick(product._id)}>
                  <img src={editIcon} className="btn-icon" alt="" />
                </div>
                <div className="delete-btn" onClick={() => handleDeleteProductClick(product._id)}>
                  <img src={deleteIcon} className="btn-icon" alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {data?.products.length > 0 && <ReactPaginate
        previousLabel={<GrFormPrevious className="prev-icon" />}
        nextLabel={<GrFormNext className="next-icon" />}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        pageClassName={"paginated-btn"}
        breakClassName={"paginated-btn"}
        previousClassName={"prev-btn"}
        nextClassName={"next-btn"}
        disabledClassName={"disabled-btn"}
        activeClassName={"active-btn"}
        forcePage={page}
      />}

      <AddNewProduct ref={addNewProductRef} />
    </React.Fragment>
  );
}

export default ProductManagement;