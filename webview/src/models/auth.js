import { routerRedux } from 'dva/router';
import { login, getLoginInfo, saveLoginInfo, clearLoginInfo } from '../services/login';

export default {
  namespace: 'auth',
  state: {
    errorCode: 0,
    errorMessage: '',
  },
  reducers: {
    loginFail(state, { payload: err }) {
      return {
        ...state,
        errorCode: err.Code,
        errorMessage: err.Message,
      };
    },

    loginOk(state) {
      return {
        ...state,
        errorCode: 0,
        errorMessage: '',
      };
    },
  },

  effects: {
    *login({
      payload: formValues,
    }, { put, call }) {
      const loginInfo = getLoginInfo();
      loginInfo.username = formValues.username;

      const resp = yield call(login, formValues);
      if (resp.Code !== 0) {
        yield put({ type: 'loginFail', payload: resp });
        return;
      }

      loginInfo.isLogin = true;
      loginInfo.token = resp.Token;
      saveLoginInfo();

      yield put(routerRedux.push('/'));

      yield put({ type: 'loginOk' });
    },

    *logout({ payload }, { put }) {
      clearLoginInfo();
      yield put(routerRedux.push('/login'));
    },
  },
  subscriptions: {},
};
