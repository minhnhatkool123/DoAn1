import React, { useState } from 'react';
import '../scss/newProductsSection.scss';
import ProductCard from './ProductCard';
import { useQuery } from 'react-query';
import axios from 'axios';
import { TransverseLoading } from 'react-loadingg';
import spinner from '../svg/spinner.svg';

function NewProductsSection() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const { isLoading } = useQuery(['newProducts', page], async () => {
    const response = await axios.get(`http://localhost:5000/api/product/home?page=${page}&limit=16`);
    const updatedProducts = [...products].concat(response.data.products);
    setProducts(updatedProducts);
    setTotalPages(response.data.totalPages);
  }, { refetchOnWindowFocus: false });

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
          {isLoading && !products.length && <div style={{ height: '10vh', position: 'relative', width: '100%' }}>
            <TransverseLoading color='#ffb0bd' size='large' />
          </div>}

          {products?.map(product => <ProductCard product={product} key={product._id} />)}
        </div>

        {(products.length !== 0 && page < totalPages) && <div className="load-more-btn" onClick={showMoreItems}>
          {isLoading ? <img src={spinner} className="loading-icon" alt="" /> : 'Xem thêm'}
        </div>}
      </div>
    </div>
  );
}

export default NewProductsSection;