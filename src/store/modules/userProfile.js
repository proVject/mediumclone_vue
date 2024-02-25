import userProfileApi from '@/api/userProfile'

const state = {
  error: null,
  isLoading: false,
  data: null,
}

export const getterTypes = {
  error: '[userProfile] error',
  isLoading: '[userProfile] isLoading',
  data: '[userProfile] data',
}

export const mutationTypes = {
  getUserProfileStart: '[userProfile] getUserProfileStart',
  getUserProfileSuccess: '[userProfile] getUserProfileSuccess',
  getUserProfileFailure: '[userProfile] getUserProfileFailure',
}

export const actionTypes = {
  getUserProfile: '[userProfile] getTags',
}

const getters = {
  [getterTypes.error]: ({error}) => error,
  [getterTypes.isLoading]: ({isLoading}) => isLoading,
  [getterTypes.data]: ({data}) => data,
}

const mutations = {
  [mutationTypes.getUserProfileStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getUserProfileSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getUserProfileFailure](state) {
    state.isLoading = false
  },
}

const actions = {
  [actionTypes.getUserProfile](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getUserProfileStart)
      userProfileApi
        .getUserProfile(slug)
        .then((userProfile) => {
          context.commit(mutationTypes.getUserProfileSuccess, userProfile)
          resolve(userProfile)
        })
        .catch(() => {
          context.commit(mutationTypes.getUserProfileFailure)
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
