import { atom, selector, useSetRecoilState } from 'recoil';

export const toastDisplayState = atom({
  key: 'toastDisplay',
  default: {
    show: false,
    message: ''
  }
});