import React from 'react';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import NewProductsSection from '../components/NewProductsSection';
import MessengerCustomerChat from 'react-messenger-customer-chat';

function HomePage() {
  return (
    <React.Fragment>
      <Navigation />
      <Banner />
      <NewProductsSection />
      <MessengerCustomerChat pageId="107987698119089" appId="466417401239652" />
      <Footer />
    </React.Fragment>
  );
}

export default HomePage;