import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from './cartType'

const initialState = {
  numOfProducts: 0,
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: return {
      ...state,
      numOfProducts: state.numOfProducts + action.payload
    }

    case REMOVE_PRODUCT_FROM_CART: return {
      ...state,
      numOfProducts: state.numOfProducts - action.payload
    }

    default: return state
  }
}

export default cartReducer