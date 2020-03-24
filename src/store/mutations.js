import * as types from './mutation_types'

const mutations = {
  [types.SET_TOKEN](state, str) {
    state.token = str;
  },
  [types.SET_USERNAME](state, str) {
    state.username = str;
  },
  [types.SET_ISCOLLAPSE](state, boolean) {
    state.isCollapse = boolean;
  },
  [types.SET_HISTORYPATH](state, array) {
    state.historyPath = array;
  },
  [types.SET_CURRENTNAVPATH](state, str) {
    state.currentNavPath = str;
  },
  [types.SET_MINISTRYLIST](state, array) {
    state.ministryList = array;
  },
  [types.SET_MENULIST](state, array) {
    state.menuList = array;
  },
  [types.SET_TIPLIST](state, obj) {
    state.tipList = obj;
  },
  [types.SET_AUTHORINFO](state, str) {
    state.authorInfo = str;
  },
  [types.SET_ISNAVSHOW](state, boolean) {
    state.isNavShow = boolean;
  },
  [types.SET_TIMER5MIN](state, num) {
    state.timer5min = num;
  },
  [types.SET_LASTTIME](state, time) {
    state.lastTime = time;
  },
  [types.SET_ENDTIME30S](state, time) {
    state.endTime30s = time;
  },
  [types.SET_ENDTIME5S](state, time) {
    state.endTime5s = time;
  }
};

export default mutations