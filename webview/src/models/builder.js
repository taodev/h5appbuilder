
export default {
  namespace: 'builder',
  state: {
    iconImageUrl: '',
    roundImageUrl: '',
    splashImageUrl: '',
  },
  reducers: {
    setIconImageUrl(state, { payload: url }) {
      return {
        ...state,
        iconImageUrl: url,
      };
    },

    setRoundImageUrl(state, { payload: url }) {
      return {
        ...state,
        roundImageUrl: url,
      };
    },

    setSplashImageUrl(state, { payload: url }) {
      return {
        ...state,
        splashImageUrl: url,
      };
    },
  },
  effects: {},
  subscriptions: {},
};
