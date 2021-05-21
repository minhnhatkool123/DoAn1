import React from 'react';
import Banner from '../components/Banner';
import NewProductsSection from '../components/NewProductsSection';

function HomePage() {
  return (
    <React.Fragment>
      <Banner />
      <NewProductsSection />
    </React.Fragment>
  );
}

export default HomePage;