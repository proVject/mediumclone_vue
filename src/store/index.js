import Vue from 'vue'
import Vuex /* , {createLogger} */ from 'vuex'
import auth from '@/store/modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: true // process.env.NODE_ENV !== 'production'
  // plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
  modules: {
    auth,
  },
})
