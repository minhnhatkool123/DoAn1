import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import { cartPreviewDisplayState } from '../recoil/cartPreviewDisplayState';

function CartPreviewDisplayHandling() {
  const { pathname } = useLocation();
  const setCartPreviewDisplay = useSetRecoilState(cartPreviewDisplayState);

  useEffect(() => {
    if (pathname === '/cart')
      setCartPreviewDisplay(false)
    else
      setCartPreviewDisplay(true);
  }, [pathname]);

  return null;
};

export default CartPreviewDisplayHandling;
