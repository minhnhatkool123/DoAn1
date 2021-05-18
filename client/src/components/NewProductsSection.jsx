import React, { useState, useEffect } from 'react';
import '../scss/newProductsSection.scss';
import products from '../data2';
import ProductCard from './ProductCard';

function NewProductsSection() {
  const [visible, setVisible] = useState(8);

  const showMoreItems = () => {
    setVisible(prevValue => prevValue + 8);
  };

  const calcSalePrice = (originalPrice, discount) => {
    return (parseInt((originalPrice.replace(',',''))) - discount).toLocaleString();
  };

  return (
    <div className="new-products-section">
      <div className="container grid">
        <div className="row">
          <div className="section-title col l-12">Sản phẩm mới</div>
        </div>

        <div className="row">
          {products.slice(0, visible).map(product => <ProductCard product={product} key={product.id} />)}
        </div>

        {visible < products.length ? <div className="load-more-btn" onClick={showMoreItems}>Xem thêm</div> : null}
      </div>
    </div>
  );
}

export default NewProductsSection;