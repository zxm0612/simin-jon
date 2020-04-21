import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex);

const state = {
  login:true, //是否登陆
  username:'', //登陆的用户名
  permission:{},//获取的权限
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
