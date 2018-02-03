import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex);

const state = {
  token:'',//token
  errorCode:'',//错误状态
  roomId:'',//房间id
  userInfo:'',//用户信息
  nowUserId:'',//当前用户id
};

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});

store.registerModule('vux', {
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
});

export default store;
