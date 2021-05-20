import React from 'react';
import Footer from '../components/Footer';
import FullCart from '../components/FullCart';
import Navigation from '../components/Navigation';
import { useRecoilValue } from 'recoil';
import { cartTotalQuantity } from '../recoil/cartState';
import EmptyCart from '../components/EmptyCart';

function CartPage() {
  const totalQuantity = useRecoilValue(cartTotalQuantity);

  return (
    <React.Fragment>
      {totalQuantity ? <FullCart /> : <EmptyCart />}
    </React.Fragment>
  );
}

export default CartPage;