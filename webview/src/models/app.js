import { getLoginInfo, setIsLogin, setToken, loadLoginInfo, saveLoginInfo } from '../services/login';

export default {
  namespace: 'app',
  state: {
    isLogin: false,
  },
  reducers: {
    changeLogin(state, { payload: info }) {
      return {
        ...state,
        isLogin: info.isLogin,
      };
    },
  },
  effects: {
    *login({
      payload,
    }, { put }) {
      setIsLogin(true);
      setToken(payload.Token);
      yield put({ type: 'changeLogin', payload: getLoginInfo() });
      saveLoginInfo();
    },
    *queryLoginState({ payload }, { put }) {
      yield put({ type: 'changeLogin', payload: getLoginInfo() });
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      loadLoginInfo();
      dispatch({ type: 'queryLoginState' });
    },
  },
};
