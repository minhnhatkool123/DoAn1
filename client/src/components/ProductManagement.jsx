import React, { useState, useEffect, useRef } from 'react';
import '../scss/productManagement.scss';
import viewIcon from '../svg/visibility.svg';
import editIcon from '../svg/edit.svg';
import deleteIcon from '../svg/delete.svg';
import axios from 'axios';
import { useQuery } from 'react-query';
import { AiOutlinePlus } from "react-icons/ai";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { dialogState } from '../recoil/dialogState';
import { userState } from '../recoil/userState';
import { productViewDisplayState } from '../recoil/productViewDisplayState';
import { productEditDisplayState } from '../recoil/productEditDisplayState';
import { productAddDisplayState } from '../recoil/productAddDisplayState';
import { TiArrowSortedDown } from "react-icons/ti";
import { BiChevronRight } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { IoSearchOutline } from "react-icons/io5";
import { EatLoading } from 'react-loadingg';
import { Link } from 'react-router-dom';
import AddNewProduct from './AddNewProduct';
import ViewProduct from './ViewProduct';
import EditProduct from './EditProduct';
import ReactPaginate from "react-paginate";
import queryString from 'query-string';

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
  const [filterQuery, setFilterQuery] = useState('all?');
  const [currentProduct, setCurrentProduct] = useState();

  const filterRef = useRef(null);
  const searchRef = useRef(null);

  const defaultTypeRef = useRef(null);
  const defaultSortRef = useRef(null);
  const newStatusRef = useRef(null);
  const saleStatusRef = useRef(null);
  const hotStatusRef = useRef(null);

  const user = useRecoilValue(userState);
  const setDialog = useSetRecoilState(dialogState);
  const [productViewDisplay, setProductViewDisplay] = useRecoilState(productViewDisplayState);
  const [productEditDisplay, setProductEditDisplay] = useRecoilState(productEditDisplayState);
  const [productAddDisplay, setProductAddDisplay] = useRecoilState(productAddDisplayState);

  const { data, isLoading, isError, refetch } = useQuery(['managedProducts', page, filterQuery], async () => {
    console.log(`http://localhost:5000/api/product/${filterQuery}page=${page + 1}&limit=8`);
    const response = await axios.get(`http://localhost:5000/api/product/${filterQuery}page=${page + 1}&limit=8`);
    setTotalPages(response.data.totalPages);
    // console.log(response.data);
    return response.data;
  });

  const handleAddProductClick = () => {
    setProductAddDisplay(true);
  }

  const handleViewProductClick = (product) => {
    setCurrentProduct(product);
    setProductViewDisplay(true);
  }

  const handleEditProductClick = (product) => {
    setCurrentProduct(product);
    setProductEditDisplay(true);
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

  const handleFilterChange = () => {
    searchRef.current.value = '';

    const formData = new FormData(filterRef.current);
    const type = formData.get('productType');
    const status = formData.getAll('productStatus');
    const sort = formData.get('sortByPrice');

    const query = type + status.join('') + sort;

    // console.log(query);
    setPage(0);
    setFilterQuery(query);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const search = searchRef.current.value;

    resetFilterOptions();
    setPage(0);
    setFilterQuery(`search?name=${search}&`);
  }

  const resetFilterOptions = () => {
    defaultTypeRef.current.checked = true;
    defaultSortRef.current.checked = true;
    newStatusRef.current.checked = false;
    saleStatusRef.current.checked = false;
    hotStatusRef.current.checked = false;
  }

  const handleAllTypeClick = () => {
    if (searchRef.current.value) {
      setFilterQuery('all?');
      searchRef.current.value = '';
    }
  }

  return (
    <React.Fragment>
      <div className="product-other-features">
        <span className="title">Danh sách sản phẩm</span>
        <form className="product-search">
          <IoSearchOutline className="search-icon" />
          <input type="text" placeholder="Tìm kiếm sản phẩm..." className="search-input" ref={searchRef} />
          <button type="submit" onClick={handleSearch} className="search-btn"></button>
        </form>

        <div className="add-product-btn" onClick={handleAddProductClick}><AiOutlinePlus className="add-icon" /></div>
      </div>

      <div className={data?.products.length === 8 ? "product-table" : "product-table offset"}>
        <form className="title-list" action="" method="post" id="filterProductForm" ref={filterRef} onChange={handleFilterChange}>
          <div className="image-title fl-6 fl-o-1 title">Ảnh</div>
          <div className="name-title fl-20 title">Tên sản phẩm</div>
          <div className="type-title-container fl-15 title">
            <span className="type-title">Loại</span>
            <TiArrowSortedDown className="dropdown-icon" />
            <div className="type-options">
              <div className="category-option">
                <input type="radio" name="productType" id="ao" value="detail/ao?" />
                <label htmlFor="ao">
                  Áo
                  <BiChevronRight className="expand-select-icon" />
                  <div className="type-option">
                    <input type="radio" name="productType" id="ao-the-thao" value="detail/ao?type=ao-the-thao&" />
                    <label htmlFor="ao-the-thao">Áo thể thao</label>
                    <input type="radio" name="productType" id="ao-thun-nu" value="detail/ao?type=ao-thun-nu&" />
                    <label htmlFor="ao-thun-nu">Áo thun nữ</label>
                    <input type="radio" name="productType" id="ao-kieu-nu" value="detail/ao?type=ao-kieu-nu&" />
                    <label htmlFor="ao-kieu-nu">Áo kiểu nữ</label>
                    <input type="radio" name="productType" id="ao-so-mi-nu" value="detail/ao?type=ao-so-mi-nu&" />
                    <label htmlFor="ao-so-mi-nu">Áo sơ mi nữ</label>
                    <input type="radio" name="productType" id="ao-khoac-nu" value="detail/ao?type=ao-khoac-nu&" />
                    <label htmlFor="ao-khoac-nu">Áo khoác nữ</label>
                  </div>
                </label>
              </div>
              <div className="category-option">
                <input type="radio" name="productType" id="quan" value="detail/quan?" />
                <label htmlFor="quan">
                  Quần
                  <BiChevronRight className="expand-select-icon" />
                  <div className="type-option">
                    <input type="radio" name="productType" id="quan-dai" value="detail/quan?type=quan-dai&" />
                    <label htmlFor="quan-dai">Quần dài</label>
                    <input type="radio" name="productType" id="quan-short-nu" value="detail/quan?type=quan-short-nu&" />
                    <label htmlFor="quan-short-nu">Quần jean nữ</label>
                    <input type="radio" name="productType" id="quan-legging" value="detail/quan?type=quan-legging&" />
                    <label htmlFor="quan-legging">Quần legging</label>
                  </div>
                </label>
              </div>
              <div className="category-option">
                <input type="radio" name="productType" id="dam-vay" value="detail/dam-vay?" />
                <label htmlFor="dam-vay">
                  Đầm váy
                  <BiChevronRight className="expand-select-icon" />
                  <div className="type-option">
                    <input type="radio" name="productType" id="chan-vay" value="detail/dam-vay?type=chan-vay&" />
                    <label htmlFor="chan-vay">Chân váy</label>
                    <input type="radio" name="productType" id="dam-nu" value="detail/dam-vay?type=dam-nu&" />
                    <label htmlFor="dam-nu">Đầm nữ</label>
                    <input type="radio" name="productType" id="yem" value="detail/dam-vay?type=yem&" />
                    <label htmlFor="yem">Yếm</label>
                  </div>
                </label>
              </div>
              <div className="category-option">
                <input type="radio" name="productType" id="all" value="all?" defaultChecked ref={defaultTypeRef} />
                <label htmlFor="all" onClick={handleAllTypeClick}>Tất cả</label>
              </div>
            </div>
          </div>
          <div className="quantity-title fl-8 title">Số lượng</div>
          <div className="status-title-container fl-16 title">
            <span className="status-title">Trạng thái</span>
            <TiArrowSortedDown className="dropdown-icon" />
            <div className="status-options">
              <input type="checkbox" name="productStatus" id="new-status" value="status=1&" ref={newStatusRef} />
              <label htmlFor="new-status">
                Mới nhất
                <TiTick className="tick-icon" />
              </label>
              <input type="checkbox" name="productStatus" id="sale-status" value="status=2&" ref={saleStatusRef} />
              <label htmlFor="sale-status">
                Khuyến mãi
                <TiTick className="tick-icon" />
              </label>
              <input type="checkbox" name="productStatus" id="hot-status" value="status=3&" ref={hotStatusRef} />
              <label htmlFor="hot-status">
                Bán chạy
                <TiTick className="tick-icon" />
              </label>
            </div>
          </div>
          <div className="unit-price-title-container fl-11 title">
            <span className="unit-price-title">Đơn giá</span>
            <TiArrowSortedDown className="dropdown-icon" />
            <div className="sort-options">
              <input type="radio" name="sortByPrice" id="ascending" value="sort=1&" />
              <label htmlFor="ascending">Tăng dần</label>
              <input type="radio" name="sortByPrice" id="descending" value="sort=-1&" />
              <label htmlFor="descending">Giảm dần</label>
              <input type="radio" name="sortByPrice" id="none" value="" defaultChecked ref={defaultSortRef} />
              <label htmlFor="none">Bình thường</label>
            </div>
          </div>
          <div className="discount-title fl-10 title">Khuyến mãi</div>
          <div className="manipulation fl-13 title"></div>
        </form>

        <div className="product-list">
          {isLoading && <EatLoading color="#ff7eae" />}
          {data?.products.map(product => (
            <div key={product._id} className="product-item">
              <div className="product-image-container fl-6 fl-o-1">
                <div className="product-image" style={{ backgroundImage: `url(${product.images[0]})` }}></div>
              </div>
              <div className="product-name fl-20">
                <Link to={`/product/${product._id}`} target='_blank'>{product.name}</Link>
              </div>
              <div className="product-type fl-15">{product.type === 'Quần Short Nữ' ? 'Quần Jean Nữ' : product.type}</div>
              <div className="product-quantity fl-8">{product.quantity}</div>
              <div className="product-status fl-16">
                {product.status.map(status => (
                  <label key={status} className={'status-label ' + productStatus[status].key}>{productStatus[status].value}</label>
                ))}
              </div>
              <div className="product-unit-price fl-11">
                <div className="discount-price">{product.new_price.toLocaleString()}đ</div>
                {product.new_price !== product.real_price && <div className="original-price">{product.real_price.toLocaleString()}đ</div>}
              </div>
              <div className="product-discount fl-10">{product.discount.toLocaleString()}đ</div>
              <div className="product-manipulation fl-13">
                <div className="view-btn">
                  <img src={viewIcon} className="btn-icon" alt="" onClick={() => handleViewProductClick(product)} />
                </div>
                <div className="edit-btn" onClick={() => handleEditProductClick(product)}>
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

      {productAddDisplay && <AddNewProduct refetch={refetch} />}
      {currentProduct && productViewDisplay && <ViewProduct product={currentProduct} />}
      {currentProduct && productEditDisplay && <EditProduct product={currentProduct} refetch={refetch} />}
    </React.Fragment>
  );
}

export default ProductManagement;