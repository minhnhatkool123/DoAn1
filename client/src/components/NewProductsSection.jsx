import React, { useState, useEffect } from 'react';
import '../scss/newProductsSection.scss';
import ProductCard from './ProductCard';
import { useQuery } from 'react-query';
import axios from 'axios';

const getNewProducts = async (page, limit) => {
  const response = await axios.get(`http://localhost:5000/api/product/home?page=${page}&limit=${limit}`);
  return response.data;
}

function NewProductsSection() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  const { data, isLoading, isError } = useQuery(['newProducts', page], () => getNewProducts(page, 16));

  useEffect(() => {
    if (data && data.products) {
      const updatedProducts = [...products].concat(data.products);
      setProducts(updatedProducts);
    }
  }, [data]);

  const showMoreItems = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="new-products-section">
      <div className="container grid">
        <div className="row">
          <div className="section-title col l-12">Sản phẩm mới</div>
        </div>

        <div className="row">
          {products && products.map(product => <ProductCard product={product} key={product.id} />)}
        </div>

        {(!isLoading || !data || page < data.totalpage) && <div className="load-more-btn" onClick={showMoreItems}>Xem thêm</div>}
      </div>
    </div>
  );
}

export default NewProductsSection;