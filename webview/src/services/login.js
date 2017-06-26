import { post } from '../utils/request';

let loginInfo = {
  isLogin: false,
  username: '',
  token: '',
};

export async function login(data) {
  return post('/api/v1/auth/login', data);
}

export function getLoginInfo() {
  return loginInfo;
}

export function isLogin() {
  if (loginInfo.isLogin) {
    return true;
  }

  loadLoginInfo();
  return loginInfo.isLogin;
}

export function loadLoginInfo() {
  if (localStorage.loginInfo) {
    loginInfo = JSON.parse(localStorage.loginInfo);
  }
}

export function saveLoginInfo() {
  localStorage.loginInfo = JSON.stringify(loginInfo);
}

export function clearLoginInfo() {
  loginInfo.isLogin = false;
  loginInfo.username = '';
  loginInfo.token = '';
  localStorage.removeItem('loginInfo');
}
