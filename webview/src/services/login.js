import { westRequest } from '../utils/request';

let loginInfo = {
  isLogin: false,
  username: '',
  token: '',
};

export async function login(data) {
  return westRequest('http://localhost:8080/api/v1/auth/login', data);
}

export function setIsLogin(isLogin) {
  loginInfo.isLogin = isLogin;
}

export function setUsername(username) {
  loginInfo.username = username;
}

export function setToken(token) {
  loginInfo.token = token;
}

export function getLoginInfo() {
  return loginInfo;
}

export function loadLoginInfo() {
  if (sessionStorage.loginInfo) {
    loginInfo = JSON.parse(sessionStorage.loginInfo);
  }
}

export function saveLoginInfo() {
  sessionStorage.loginInfo = JSON.stringify(loginInfo);
}

export function clearLoginInfo() {
  sessionStorage.removeItem('loginInfo');
}
