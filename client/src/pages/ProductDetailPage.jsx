import React from 'react';
import CommentSection from '../components/CommentSection';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
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