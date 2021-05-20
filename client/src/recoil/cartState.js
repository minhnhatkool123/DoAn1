import { atom, selector } from 'recoil';

export const cartState = atom({
  key: 'cart',
  // each item in list has 3 keys: id, product and quantity
  default: JSON.parse(localStorage.getItem("cart")) || [],
});

export const cartTotalPrice = selector({
  key: 'cartTotalPrice',
  get: ({ get }) => {
    const cart = get(cartState);

    return cart.reduce((totalPrice, item) => {
      return totalPrice + (item.product.price * item.quantity);
    }, 0);
  }
});

export const cartTotalQuantity = selector({
  key: 'cartTotalQuantity',
  get: ({ get }) => {
    const cart = get(cartState);

    return cart.reduce((totalQuantity, item) => {
      return totalQuantity + item.quantity;
    }, 0)
  }
})


export const addToCart = (cart, product, quantity = 1) => {
  const newCart = [...cart];
  const foundIndex = cart.findIndex(x => x.product.id === product.id && x.product.size === product.size && x.product.color === product.color);

  // Increase quantity if existing
  if (foundIndex >= 0) {
    newCart[foundIndex] = {
      ...cart[foundIndex],
      quantity: cart[foundIndex].quantity + quantity,
    };
    return newCart;
  }

  // Add new item
  newCart.push({
    product,
    id: product.id, // ???
    quantity: quantity,
  });
  return newCart;
};

export const removeFromCart = (cart, itemId) => {
  const newCart = [...cart];
  const foundIndex = cart.findIndex(x => x.id === itemId);

  if (foundIndex >= 0) {
    newCart.splice(foundIndex, 1);
    return newCart;
  }
}

export const decreaseCartItem = (cart, itemId) => {
  const newCart = [...cart];
  const foundIndex = cart.findIndex(x => x.id === itemId);

  if (!foundIndex)
    console.log('something went wrong');

    if (!foundIndex)
    console.log('something went wrong');

  newCart[foundIndex] = {
    ...cart[foundIndex],
    quantity: cart[foundIndex].quantity - 1,
  };
  return newCart;
}

export const increaseCartItem = (cart, itemId) => {
  const newCart = [...cart];
  const foundIndex = cart.findIndex(x => x.id === itemId);

  if (!foundIndex)
    console.log('something went wrong');

  newCart[foundIndex] = {
    ...cart[foundIndex],
    quantity: cart[foundIndex].quantity + 1,
  };
  return newCart;
}
