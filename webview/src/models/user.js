import { fetchUsers } from '../services/user.js';

export default {
  namespace: 'user',
  state: {
    data: [],
    pagination: {},
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
  },

  effects: {
    *queryUsers({ payload: params }, { put }) {
      const resp = yield fetchUsers(20, params);
      yield put({ type: 'setUsersData', payload: resp });
    },
  },

  subscriptions: {},
};
