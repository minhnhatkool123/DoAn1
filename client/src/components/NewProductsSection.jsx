import React, { useState, useEffect } from 'react';
import '../scss/newProductsSection.scss';
import products from '../data2';

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
          {products.slice(0, visible).map(product => {
            return (
              <div className="product-container col l-3" key={product.id}>
                <div className="product-interface">
                  <div className="product-image" style={{ backgroundImage: `url(${product.images[0]})` }}></div>

                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">{calcSalePrice(product.price, product.discount)}đ</div>
                    <div className="product-original-price">{product.price}đ</div>
                  </div>

                  <div className="product-new-label">New</div>
                </div>
              </div>
            )
          })}
        </div>

        {visible < products.length ? <div className="load-more-btn" onClick={showMoreItems}>Xem thêm</div> : null}
      </div>
    </div>
  );
}

export default NewProductsSection;