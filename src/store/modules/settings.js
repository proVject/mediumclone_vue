import {mutationTypes as authMutationTypes} from '@/store/modules/auth'

const state = {
  isSubmitting: false,
  validationErrors: null,
}

export const getterTypes = {
  isSubmitting: '[settings] isSubmitting',
  validationErrors: '[settings] validationErrors',
}

const getters = {
  [getterTypes.isSubmitting]: ({isSubmitting}) => isSubmitting,
  [getterTypes.validationErrors]: ({validationErrors}) => validationErrors,
}

const mutations = {
  [authMutationTypes.updateCurrentUserStart](state) {
    state.isLoading = true
    state.validationErrors = null
  },
  [authMutationTypes.updateCurrentUserStart](state) {
    state.isLoading = false
  },
  [authMutationTypes.updateCurrentUserStart](state, payload) {
    state.isLoading = true
    state.validationErrors = payload
  },
}

export default {
  state,
  getters,
  mutations,
}
