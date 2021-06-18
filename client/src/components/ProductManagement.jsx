import React, { useState, useEffect, useRef } from 'react';
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
import { TiChevronRight, TiArrowSortedDown } from "react-icons/ti";
import { BiChevronRight } from "react-icons/bi";
import { BsFillCaretRightFill } from "react-icons/bs";

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
  const filterRef = useRef(null);

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

  const handleStatusFilter = () => {

  }

  const handleFilterChange = () => {
    const formData = new FormData(filterRef.current);
    const status = formData.getAll('productStatus');
    console.log(status);
  }

  return (
    <React.Fragment>
      <div className="product-other-features">
        <span className="title">Danh sách sản phẩm</span>
        <input type="text" placeholder="Tìm kiếm sản phẩm..." className="product-search"></input>
        <div className="add-product-btn" onClick={handleAddProductClick}><AiOutlinePlus className="add-icon" /></div>
      </div>

      <div className="product-table">
        <form className="title-list" action="" method="post" id="filterProductForm" ref={filterRef} onChange={handleFilterChange}>
          <div className="image-title fl-6 fl-o-1 title">Ảnh</div>
          <div className="name-title fl-20 title">Tên sản phẩm</div>
          <div className="type-title-container fl-15 title">
            <span className="type-title">Loại</span>
            <TiArrowSortedDown className="dropdown-icon" />
            <div className="type-options">
              <div className="category-option">
                <input type="radio" name="productCategory" id="ao" value="ao" />
                <label htmlFor="ao">
                  Áo
                  <BiChevronRight className="expand-select-icon" />
                  <div className="type-option">
                    <input type="radio" name="productType" id="ao-the-thao" value="ao-the-thao" />
                    <label htmlFor="ao-the-thao">Áo thể thao</label>
                    <input type="radio" name="productType" id="ao-thun-nu" value="ao-thun-nu" />
                    <label htmlFor="ao-thun-nu">Áo thun nữ</label>
                    <input type="radio" name="productType" id="ao-kieu-nu" value="ao-kieu-nu" />
                    <label htmlFor="ao-kieu-nu">Áo kiểu nữ</label>
                    <input type="radio" name="productType" id="ao-so-mi-nu" value="ao-so-mi-nu" />
                    <label htmlFor="ao-so-mi-nu">Áo sơ mi nữ</label>
                    <input type="radio" name="productType" id="ao-khoac-nu" value="ao-khoac-nu" />
                    <label htmlFor="ao-khoac-nu">Áo khoác nữ</label>
                  </div>
                </label>
              </div>
              <div className="category-option">
                <input type="radio" name="productCategory" id="quan" value="quan" />
                <label htmlFor="quan">
                  Quần
                  <BiChevronRight className="expand-select-icon" />
                  <div className="type-option">
                    <input type="radio" name="productType" id="quan-dai" value="quan-dai" />
                    <label htmlFor="quan-dai">Quần dài</label>
                    <input type="radio" name="productType" id="quan-short-nu" value="quan-short-nu" />
                    <label htmlFor="quan-short-nu">Quần jean nữ</label>
                    <input type="radio" name="productType" id="quan-legging" value="quan-legging" />
                    <label htmlFor="quan-legging">Quần legging</label>
                  </div>
                </label>
              </div>
              <div className="category-option">
                <input type="radio" name="productCategory" id="dam-vay" value="dam-vay" />
                <label htmlFor="dam-vay">
                  Đầm váy
                  <BiChevronRight className="expand-select-icon" />
                  <div className="type-option">
                    <input type="radio" name="productType" id="chan-vay" value="chan-vay" />
                    <label htmlFor="chan-vay">Chân váy</label>
                    <input type="radio" name="productType" id="dam-nu" value="dam-nu" />
                    <label htmlFor="dam-nu">Đầm nữ</label>
                    <input type="radio" name="productType" id="yem" value="yem" />
                    <label htmlFor="yem">Yếm</label>
                  </div>
                </label>
              </div>
              <div className="category-option">
                <input type="radio" name="productCategory" id="all" value="all" />
                <label htmlFor="all">Tất cả</label>
              </div>
            </div>
          </div>
          <div className="quantity-title fl-8 title">Số lượng</div>
          <div className="status-title-container fl-17 title">
            <span className="status-title" onClick={handleStatusFilter}>Trạng thái</span>
            <TiArrowSortedDown className="dropdown-icon" />
            <div className="status-options">
              <input type="checkbox" name="productStatus" id="new" value="1" />
              <label htmlFor="new">Mới nhất</label>
              <input type="checkbox" name="productStatus" id="sale" value="2" />
              <label htmlFor="sale">Khuyến mãi</label>
              <input type="checkbox" name="productStatus" id="hot" value="3" />
              <label htmlFor="hot">Bán chạy</label>
            </div>
          </div>
          <div className="unit-price-title fl-10 title">Đơn giá</div>
          <div className="discount-title fl-10 title">Khuyến mãi</div>
          <div className="manipulation fl-13 title"></div>
        </form>

        <div className="product-list">
          {data?.products.map(product => (
            <div key={product._id} className="product-item">
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