import { atom, selector } from 'recoil'

export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

export const resultMessageState = atom({
  key: 'resultMessage',
  default: {
    show: false,
    type: SUCCESS,
    message: '',
    func: () => {}
  }
})

export const messageContent = selector({
  key: 'messageContent',
  get: ({ get }) => {
    const resultMessage = get(resultMessageState);

    if (resultMessage.type === SUCCESS) {
      return {
        image: '/img/success-img.png',
        title: 'Thành công',
        acceptButtonName: 'OK'
      }
    }

    return {
      image: '/img/failure-img.png',
      title: 'Thất bại',
      acceptButtonName: 'Thử lại'
    }
  }
})