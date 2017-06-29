import { fetchUsers, addUser } from '../services/user.js';

export default {
  namespace: 'user',
  state: {
    data: [],
    pagination: {},
    confirmLoading: false,
    visible: false,
  },

  reducers: {
    setUsersData(state, { payload: resp }) {
      const pagination = { ...state.pagination };
      pagination.total = resp.total;

      return {
        ...state,
        data: resp.results,
        pagination,
      };
    },

    changeConfirmLoading(state, { payload: loading }) {
      return {
        ...state,
        confirmLoading: loading,
      };
    },

    setVisible(state, { payload: visible }) {
      return {
        ...state,
        visible,
      };
    },
  },

  effects: {
    *queryUsers({ payload: params }, { put }) {
      const resp = yield fetchUsers(20, params);
      yield put({ type: 'setUsersData', payload: resp });
    },

    *addUser({ payload: params }, { put }) {
      yield put({ type: 'changeConfirmLoading', payload: true });
      yield addUser(params);
      yield put({ type: 'changeConfirmLoading', payload: false });
      yield put({ type: 'setVisible', payload: false });
      yield put({ type: 'queryUsers' });
    },
  },

  subscriptions: {},
};
