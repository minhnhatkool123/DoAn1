import { combineReducers } from 'redux'
import entryReducer from './entry/entryReducer'
import cartReducer from './cart/cartReducer'

const rootReducer = combineReducers({
  entry: entryReducer,
  cart: cartReducer
})

export default rootReducer