import React, { useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import queryString from 'query-string';
import '../scss/searchSection.scss';
import products from '../data2';
import ProductCard from './ProductCard';
import ReactPaginate from "react-paginate";

function SearchSection() {
  const { search } = useLocation();
  const { q } = queryString.parse(search);
  const { category } = useParams();
  const catalog = getCatalog(category);

  const [page, setPage] = useState(0);
  const productsPerPage = 16;
  const pagesVisited = page * productsPerPage;
  const pageCount = Math.ceil(products.length / productsPerPage);

  const handlePageChange = ({ selected }) => {
    console.log('page click: ', selected);
    setPage(selected);
    window.scrollTo(0, 0);
  };

  return (
    <div className="search-section">
      <div className="row">
        <div className="product-catalog col fl-20">
          <div className="title">Danh mục sản phẩm</div>
          <ul className="catalog-detail">
            {catalog.map((item, index) => (
              <li key={index}><Link to={`${item.key}`}>{item.value}</Link></li>
            ))}
          </ul>
        </div>

        <div className="search-result col fl-80">
          <div className="row">
            <div className="title-and-filters col l-12">
              <div className="row">
                <div className="col fl-80">
                  <div className="title">Áo kiểu nữ</div>
                </div>
                <div className="col fl-20">
                  <select name="filters" id="filters">
                    <option value="new">Mới nhất</option>
                    <option value="ascending">Giá tăng dần</option>
                    <option value="descending">Giá giảm dần</option>
                    <option value="sale">Sale</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row products-list">
            {products.slice(pagesVisited, pagesVisited + productsPerPage).map(product => <ProductCard product={product} key={product.id} />)}
          </div>

          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            pageClassName={"paginated-btn"}
            breakClassName={"paginated-btn"}
            previousClassName={"prev-btn"}
            nextClassName={"next-btn"}
            disabledClassName={"disabled-btn"}
            activeClassName={"active-btn"}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchSection;

const getCatalog = (category) => {
  switch (category) {
    case 'ao':
    case 'ao-the-thao':
    case 'ao-thun-nu':
    case 'ao-kieu-nu':
    case 'ao-so-mi-nu':
    case 'ao-khoac-nu':
      return [
        {
          key: 'ao-the-thao',
          value: 'Áo thể thao'
        },
        {
          key: 'ao-thun-nu',
          value: 'Áo thun nữ'
        },
        {
          key: 'ao-kieu-nu',
          value: 'Áo kiểu nữ'
        },
        {
          key: 'ao-so-mi-nu',
          value: 'Áo sơ mi nữ'
        },
        {
          key: 'ao-khoac-nu',
          value: 'Áo khoác nữ'
        }
      ];

    case 'quan':
    case 'quan-dai':
    case 'quan-short-nu':
    case 'quan-legging':
      return [
        {
          key: 'quan-dai',
          value: 'Quần dài'
        },
        {
          key: 'quan-short-nu',
          value: 'Quần short nữ'
        },
        {
          key: 'quan-legging',
          value: 'Quần legging'
        }
      ];

    case 'dam-vay':
    case 'chan-vay':
    case 'dam-nu':
    case 'yem':
      return [
        {
          key: 'chan-vay',
          value: 'Chân váy'
        },
        {
          key: 'dam-nu',
          value: 'Đầm nữ'
        },
        {
          key: 'yem',
          value: 'Yếm'
        }
      ];

    default:
      return [
        {
          key: 'ao',
          value: 'Áo'
        },
        {
          key: 'quan',
          value: 'Quần'
        },
        {
          key: 'dam-vay',
          value: 'Đầm váy'
        }
      ];
  }
}