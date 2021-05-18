import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from './cartType'

export const addProductToCart = (number = 1) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: number
  }
}

export const removeProductFromCart = (number = 1) => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: number
  }
}