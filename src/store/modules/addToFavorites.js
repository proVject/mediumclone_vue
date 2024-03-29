import addToFavoritesApi from '@/api/addToFavorites'

export const mutationTypes = {
  addToFavoritesStart: '[addToFavorites] addToFavoritesStart',
  addToFavoritesSuccess: '[addToFavorites] addToFavoritesSuccess',
  addToFavoritesFailure: '[addToFavorites] addToFavoritesFailure',
}
export const actionTypes = {
  addToFavorites: '[addToFavorites] addToFavorites',
}

const mutations = {
  [mutationTypes.addToFavoritesStart]() {},
  [mutationTypes.addToFavoritesSuccess]() {},
  [mutationTypes.addToFavoritesFailure]() {},
}

const actions = {
  [actionTypes.addToFavorites](context, {slug, isFavorite}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.addToFavoritesStart)
      const promise = isFavorite
        ? addToFavoritesApi.removeFromFavorites(slug)
        : addToFavoritesApi.addToFavorites(slug)

      promise
        .then((article) => {
          context.commit(mutationTypes.addToFavoritesFailure, article)
          resolve(article)
        })
        .catch(() => {
          context.commit(mutationTypes.addToFavoritesFailure)
        })
    })
  },
}

export default {
  mutations,
  actions,
}
