import { login } from '../services/login';

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
    errorCode: 0,
    errorMessage: '',
  },
  reducers: {
    showLoginLoading(state) {
      return {
        ...state,
        loginLoading: true,
      };
    },
    hideLoginLoading(state) {
      return {
        ...state,
        loginLoading: false,
      };
    },
    loginResult(state, { payload: result }) {
      return {
        ...state,
        errorCode: result.Code,
        errorMessage: result.Message,
      };
    },
  },
  effects: {
    *login({
      payload,
    }, { put, call }) {
      yield put({ type: 'showLoginLoading' });
      const resp = yield call(login, payload);
      yield put({ type: 'hideLoginLoading' });
      if (resp.data.Code === 0) {
        yield put({ type: 'app/login', payload: resp.data });
      }

      yield put({ type: 'loginResult', payload: resp.data });
    },

    *onLogin({ payload: result }, { put }) {
      if (result.Code === 0) {
        yield put({ type: 'app/login', payload: result });
      }

      yield put({ type: 'loginResult', payload: result });
    },
  },
  subscriptions: {},
};
