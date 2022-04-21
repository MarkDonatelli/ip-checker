import { createStore } from 'vuex';

export default createStore({
  state: {
    ipData: [],
    currentIP: '',
    map: '',
    lat: '',
    long: '',
  },
  mutations: {
    SET_CURRENT_IP(state, currentIP) {
      state.currentIP = currentIP;
    },
    SET_IP_DATA(state, ipData) {
      state.ipData.push(ipData);
    },
    UPDATE_IP_DATA(state, payload) {
      state.ipData = [
        ...state.ipData.map((item) =>
          item.ip === payload.ip
            ? item
            : {
                ...item,
                ...payload,
              }
        ),
      ];
    },
    SET_MAP(state, map) {
      state.map = map;
    },
    SET_LATITUDE(state, lat) {
      state.lat = lat;
    },
    SET_LONGITUDE(state, long) {
      state.long = long;
    },
  },
  getters: {
    region: (state) => {
      let getState = state.ipData.map((el) => el.location.region);
      return getState[0];
    },
  },
});
