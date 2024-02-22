import authApi from '@/api/auth'
import persistenceStorage from '@/helpers/persistenceStorage'

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
  isLoading: false,
}

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous',
  isLoading: '[auth] isLoading',
  isSubmitting: '[auth] isSubmitting',
  validationErrors: '[auth] validationErrors',
}

export const mutationTypes = {
  resetValidationErrors: '[auth] resetValidationErrors',
  // register
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',
  // login
  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',
  // getCurrentUser
  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure',
}
export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
}

const getters = {
  [getterTypes.currentUser]: ({currentUser}) => currentUser,
  [getterTypes.isLoggedIn]: ({isLoggedIn}) => Boolean(isLoggedIn),
  [getterTypes.isAnonymous]: ({isLoggedIn}) => isLoggedIn === false,
  [getterTypes.isLoading]: ({isLoading}) => isLoading,
  [getterTypes.isSubmitting]: ({isSubmitting}) => isSubmitting,
  [getterTypes.validationErrors]: ({validationErrors}) => validationErrors,
}

const mutations = {
  [mutationTypes.resetValidationErrors](state) {
    state.validationErrors = null
  },
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  // register
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  // login
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  // getCurrentUser
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.currentUser = null
    state.isLoading = false
    state.isLoggedIn = false
  },
}

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.registerStart)
      authApi
        .register(credentials)
        .then((response) => {
          const user = response.data.user
          context.commit(mutationTypes.registerSuccess, user)
          persistenceStorage.setItem('accessToken', user.token)
          resolve(user)
        })
        .catch((result) => {
          const errors = result.response.data.errors
          context.commit(mutationTypes.registerFailure, errors)
        })
    })
  },
  [actionTypes.login](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.loginStart)
      authApi
        .login(credentials)
        .then((response) => {
          const user = response.data.user
          context.commit(mutationTypes.loginSuccess, user)
          persistenceStorage.setItem('accessToken', user.token)
          resolve(user)
        })
        .catch((result) => {
          const errors = result.response.data.errors
          context.commit(mutationTypes.loginFailure, errors)
        })
    })
  },
  [actionTypes.getCurrentUser](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getCurrentUserStart)
      authApi
        .getCurrentUser()
        .then((response) => {
          const user = response.data.user
          context.commit(mutationTypes.getCurrentUserSuccess, user)
          resolve(user)
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailure)
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
