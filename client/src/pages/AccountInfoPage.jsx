import React from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import AccountInfo from '../components/AccountInfo';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

function AccountInfoPage() {
  return (
    <div>
      <React.Fragment>
        <Navigation />
        <AccountInfo />
        {/* <MessengerCustomerChat pageId="719242094786181" appId="466417401239652" /> */}
        <Footer />
      </React.Fragment>
    </div>
  );
}

export default AccountInfoPage;