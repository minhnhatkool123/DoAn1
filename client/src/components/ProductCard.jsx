import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/productCard.scss';

const calcSalePrice = (originalPrice, discount) => {
  return (parseInt((originalPrice.replace(',', ''))) - discount).toLocaleString();
};

function ProductCard(props) {
  const product = props.product;

  return (
    <div className="product-container col l-3">
      <Link to={`/product/${product.id}`}>
        <div className="product-interface">
          <div className="product-image" style={{ backgroundImage: `url(${product.images[0]})` }}></div>

          <div className="product-info">
            <div className="product-name">{product.name}</div>
            <div className="product-price">{calcSalePrice(product.price, product.discount)}đ</div>
            <div className="product-original-price">{product.price}đ</div>
          </div>

          <div className="product-new-label">New</div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;