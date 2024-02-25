<template>
  <button
    @click="onLike"
    class="btn btn-sm"
    :class="{
      'btn-primary': isFavoriteLoc,
      'btn-outline-primary': !isFavoriteLoc,
    }"
  >
    <i class="ion-heart" />
    <span v-if="prefix">&nbsp; {{ prefix }}</span>
    <span>&nbsp; {{ favoritesCountLoc }}</span>
    <span v-if="suffix">&nbsp; {{ suffix }}</span>
  </button>
</template>

<script>
import {actionTypes} from '@/store/modules/addToFavorites'

export default {
  name: 'McvAddToFavorites',
  props: {
    favoritesCount: {
      type: Number,
      require: true,
    },
    isFavorite: {
      type: Boolean,
      required: false,
    },
    isLoggedIn: {
      type: Boolean,
      required: false,
    },
    articleSlug: {
      type: String,
      require: true,
    },
    prefix: {
      type: String,
      require: true,
    },
    suffix: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      favoritesCountLoc: this.favoritesCount,
      isFavoriteLoc: this.isFavorite,
    }
  },
  methods: {
    onLike() {
      if (!this.isLoggedIn) {
        this.$router.push({name: 'register'})
        return
      }
      this.$store.dispatch(actionTypes.addToFavorites, {
        slug: this.articleSlug,
        isFavorite: this.isFavoriteLoc,
      })
      if (this.isFavoriteLoc) {
        this.favoritesCountLoc -= 1
      } else {
        this.favoritesCountLoc += 1
      }
      this.isFavoriteLoc = !this.isFavoriteLoc
    },
  },
}
</script>
