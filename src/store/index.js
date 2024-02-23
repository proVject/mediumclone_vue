import Vue from 'vue'
import Vuex /* , {createLogger} */ from 'vuex'
import auth from '@/store/modules/auth'
import feed from '@/store/modules/feed'
import popularTags from '@/store/modules/PopularTags'
import article from '@/store/modules/article'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: true // process.env.NODE_ENV !== 'production'
  // plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
  modules: {
    auth,
    feed,
    popularTags,
    article,
  },
})
