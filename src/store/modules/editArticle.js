import articleApi from '@/api/article'

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  data: null,
}

export const getterTypes = {
  isSubmitting: '[editArticle] isSubmitting',
  validationErrors: '[editArticle] validationErrors',
  isLoading: '[editArticle] isLoading',
  data: '[editArticle] data',
}
export const mutationTypes = {
  // getArticle
  getArticleStart: '[editArticle] getArticleStart',
  getArticleSuccess: '[editArticle] getArticleSuccess',
  getArticleFailure: '[editArticle] getArticleFailure',
  // editArticle
  editArticleStart: '[editArticle] editArticleStart',
  editArticleSuccess: '[editArticle] editArticleSuccess',
  editArticleFailure: '[editArticle] editArticleFailure',
}
export const actionTypes = {
  getArticle: '[editArticle]getArticle',
  editArticle: '[editArticle] editArticle',
}

const getters = {
  [getterTypes.isSubmitting]: ({isSubmitting}) => isSubmitting,
  [getterTypes.validationErrors]: ({validationErrors}) => validationErrors,
  [getterTypes.isLoading]: ({isLoading}) => isLoading,
  [getterTypes.data]: ({data}) => data,
}

const mutations = {
  // getArticle
  [mutationTypes.editArticleStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.editArticleSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.editArticleFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  // editArticle
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false
  },
}
const actions = {
  [actionTypes.getArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart)
      articleApi
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationTypes.getArticleSuccess, article)
          resolve(article)
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailure)
        })
    })
  },
  [actionTypes.editArticle](context, {slug, articleInput}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.editArticleStart)
      articleApi
        .updateArticle(slug, articleInput)
        .then((article) => {
          context.commit(mutationTypes.editArticleSuccess)
          resolve(article)
        })
        .catch((result) => {
          const errors = result.response.data.errors
          context.commit(mutationTypes.editArticleFailure, errors)
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
