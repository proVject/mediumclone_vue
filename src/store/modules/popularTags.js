import popularTagsApi from '@/api/PopularTags'

const state = {
  error: null,
  isLoading: false,
  data: null,
}

export const getterTypes = {
  error: '[popularTags] error',
  isLoading: '[popularTags] isLoading',
  data: '[popularTags] data',
}

export const mutationTypes = {
  getPopularTagsStart: '[popularTags] getPopularTagsStart',
  getPopularTagsSuccess: '[popularTags] getPopularTagsSuccess',
  getPopularTagsFailure: '[popularTags] getPopularTagsFailure',
}

export const actionTypes = {
  getPopularTags: '[popularTags] getTags',
}

const getters = {
  [getterTypes.error]: ({error}) => error,
  [getterTypes.isLoading]: ({isLoading}) => isLoading,
  [getterTypes.data]: ({data}) => data,
}

const mutations = {
  [mutationTypes.getPopularTagsStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getPopularTagsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getPopularTagsFailure](state) {
    state.isLoading = false
  },
}

const actions = {
  [actionTypes.getPopularTags](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getPopularTagsStart)
      popularTagsApi
        .getPopularTags()
        .then((response) => {
          const tags = response.data.tags
          context.commit(mutationTypes.getPopularTagsSuccess, tags)
          resolve(tags)
        })
        .catch(() => {
          context.commit(mutationTypes.getPopularTagsFailure)
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
