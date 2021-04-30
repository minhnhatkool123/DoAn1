import React, { useState, useEffect } from 'react';
import products from '../data'

function NewProductsSection() {
  const { image, name, price } = products[0];
  return (
    <div className="new-products-section grid">
      <div className="row">
        <div className="section-title col l-12">Sản phẩm mới</div>
      </div>

      <div className="row">
        <div className="product col l-3">
          <div className="product-image" style={{backgroundImage: `url(${image})`}}></div>
          <div className="product-name">{name}</div>
          <div className="product-price">{price}</div>
        </div>
      </div>
    </div>
  );
}

export default NewProductsSection;