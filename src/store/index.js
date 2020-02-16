import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import state from './state'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,

  plugins: [createLogger()]
})
