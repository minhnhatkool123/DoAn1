import React from 'react';
import { useRecoilValue } from 'recoil';
import EmptyCart from '../components/EmptyCart';
import FullCart from '../components/FullCart';
import { cartTotalQuantity } from '../recoil/cartState';

function CartPage() {
  const totalQuantity = useRecoilValue(cartTotalQuantity);

  return (
    <React.Fragment>
      {totalQuantity ? <FullCart /> : <EmptyCart />}
    </React.Fragment>
  );
}

export default CartPage;