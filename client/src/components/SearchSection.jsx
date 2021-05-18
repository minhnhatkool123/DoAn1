import React from 'react';
import '../scss/searchSection.scss';
import products from '../data2';
import ProductCard from './ProductCard';

const initialCatalog = [
  'Quần dài',
  'Quần short nữ',
  'Quần legging'
];

function SearchSection(props) {
  const catalog = initialCatalog.map(item => {
    let i = 1;
    return {
      key: i++,
      value: item
    }
  });

  return (
    <div className="search-section">
      <div className="row">
        <div className="product-catalog col fl-20">
          <div className="title">Danh mục sản phẩm</div>
          <ul className="catalog-detail">
            {catalog.map(item => <li key={item.key}>{item.value}</li>)}
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
            {products.map(product => <ProductCard product={product} key={product.id} />)}
          </div>

          <ul className="pagination">
            <li><a href="#">Prev</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="#">6</a></li>
            <li><a href="#">Next</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SearchSection;