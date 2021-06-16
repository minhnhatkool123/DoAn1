import { atom } from 'recoil';
import axios from 'axios';

const getUser = async () => {
  const userAccessToken = await localStorage.getItem('accessToken');

  if (userAccessToken) {
    console.log('ko co token')
    return {};
  }

  const config = {
    headers: {
      Authorization: userAccessToken,
    }
  }

  axios.get('http://localhost:5000/user/info', config)
    .then(res => {
      console.log(res.data.user);
      localStorage.setItem('accessToken', userAccessToken);
      return {
        accessToken: userAccessToken,
        ...res.data.user
      };
    })
    .catch(err => {
      console.log(err);
      return {};
    })
}

export const userState = atom({
  key: 'user',
  // default: getUser()
  default: {}
});