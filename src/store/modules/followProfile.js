import followProfileApi from '@/api/followProfile'

export const mutationTypes = {
  followProfileStart: '[followProfile] followProfileStart',
  followProfileSuccess: '[followProfile] followProfileSuccess',
  followProfileFailure: '[followProfile] followProfileFailure',
}
export const actionTypes = {
  followProfile: '[followProfile] followProfile',
}

const mutations = {
  [mutationTypes.followProfileStart]() {},
  [mutationTypes.followProfileSuccess]() {},
  [mutationTypes.followProfileFailure]() {},
}
const actions = {
  [actionTypes.followProfile](context, {slug, isFollowing}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.followProfileStart)
      const promise = isFollowing
        ? followProfileApi.unfollowProfile(slug)
        : followProfileApi.followProfile(slug)

      promise
        .then((userProfile) => {
          context.commit(mutationTypes.followProfileSuccess, userProfile)
          resolve(userProfile)
        })
        .catch((result) => {
          const errors = result.response.data.errors
          context.commit(mutationTypes.followProfileFailure, errors)
        })
    })
  },
}

export default {
  mutations,
  actions,
}
