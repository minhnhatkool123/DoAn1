import { atom } from 'recoil';

export const successMessageState = atom({
  key: 'successMessage',
  default: {
    show: false,
    message: '',
  }
})