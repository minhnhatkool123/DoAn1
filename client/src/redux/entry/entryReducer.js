import { SHOW_LOGIN, SHOW_SIGNUP, HIDE_LOGIN, HIDE_SIGNUP } from './entryType'

const initialState = {
  loginDisplay: false,
  signUpDisplay: false
}

const entryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOGIN: return {
      loginDisplay: true
    }

    case SHOW_SIGNUP: return {
      signUpDisplay: true
    }

    case HIDE_LOGIN: return {
      loginDisplay: false
    }

    case HIDE_SIGNUP: return {
      signUpDisplay: false
    }

    default: return state
  }
}

export default entryReducer