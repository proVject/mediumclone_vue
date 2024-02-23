import articleApi from '@/api/article'

const state = {
  isSubmitting: false,
  validationErrors: null,
}

export const getterTypes = {
  isSubmitting: '[createArticle] isSubmitting',
  validationErrors: '[createArticle] validationErrors',
}
export const mutationTypes = {
  createArticleStart: '[createArticle] createArticleStart',
  createArticleSuccess: '[createArticle] createArticleSuccess',
  createArticleFailure: '[createArticle] createArticleFailure',
}
export const actionTypes = {
  createArticle: '[createArticle] createArticle',
}

const getters = {
  [getterTypes.isSubmitting]: ({isSubmitting}) => isSubmitting,
  [getterTypes.validationErrors]: ({validationErrors}) => validationErrors,
}

const mutations = {
  [mutationTypes.createArticleStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.createArticleSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.createArticleFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
}
const actions = {
  [actionTypes.createArticle](context, {articleInput}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.createArticleStart)
      articleApi
        .createArticle(articleInput)
        .then((article) => {
          context.commit(mutationTypes.createArticleSuccess)
          resolve(article)
        })
        .catch((result) => {
          const errors = result.response.data.errors
          context.commit(mutationTypes.createArticleFailure, errors)
        })
    })
  },
}
export default {
  state,
  getters,
  mutations,
  actions,
}
