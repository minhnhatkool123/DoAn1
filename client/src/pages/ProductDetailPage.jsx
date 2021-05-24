import React from 'react';
import CommentSection from '../components/CommentSection';
import ProductDetail from '../components/ProductDetail';

function ProductDetailPage() {
  return (
    <React.Fragment>
      <ProductDetail />
      <CommentSection />
    </React.Fragment>
  );
}

export default ProductDetailPage;