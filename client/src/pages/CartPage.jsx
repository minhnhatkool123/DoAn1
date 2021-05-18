import React from 'react';
import Footer from '../components/Footer';
import FullCart from '../components/FullCart';
import Navigation from '../components/Navigation';

function CartPage() {
  return (
    <React.Fragment>
      <Navigation />
      <FullCart />
      <Footer />
    </React.Fragment>
  );
}

export default CartPage;