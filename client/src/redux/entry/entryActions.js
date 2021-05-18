import { SHOW_LOGIN, SHOW_SIGNUP, HIDE_LOGIN, HIDE_SIGNUP } from './entryType'

export const openLoginForm = () => {
  return {
    type: SHOW_LOGIN
  }
}

export const openSignupForm = () => {
  return {
    type: SHOW_SIGNUP
  }
}

export const closeLoginForm = () => {
  return {
    type: HIDE_LOGIN
  }
}

export const closeSignUpForm = () => {
  return {
    type: HIDE_SIGNUP
  }
}