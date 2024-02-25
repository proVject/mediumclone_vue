<template>
  <div class="article-page">
    <div class="banner" v-if="article">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" alt="avatar" />
          </router-link>
          <div class="info">
            <router-link
              class="author"
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username},
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{name: 'editArticle', params: {slug: article.slug}}"
            >
              <i class="ion-edit" />
              Edit Article
            </router-link>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="onDeleteArticle"
            >
              <i class="ion-trash-a" />
              Delete Article
            </button>
          </span>
          <span v-else-if="!isAuthor">
            <mcv-follow-profile
              :is-logged-in="isLoggedIn"
              :profile-slug="article.author.username"
              :is-following="article.author.following"
            />
            <mcv-add-to-favorites
              :article-slug="article.slug"
              :is-favorite="article.favorited"
              :favorites-count="article.favoritesCount"
              :is-logged-in="isLoggedIn"
              prefix="Favorite Article"
            />
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <mcv-loading v-if="isLoading" />
      <mcv-error-message v-if="error" :message="error" />
      <div v-if="article" class="row article-content">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <mcv-tag-list :tag-list="article.tagList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {actionTypes, getterTypes} from '@/store/modules/article'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
import McvLoading from '@/components/Loading.vue'
import McvErrorMessage from '@/components/ErrorMessage.vue'
import McvTagList from '@/components/TagList.vue'
import McvAddToFavorites from '@/components/AddToFavorites.vue'
import McvFollowProfile from '@/components/FollowProfile.vue'

export default {
  name: 'McvArticle',
  components: {
    McvFollowProfile,
    McvAddToFavorites,
    McvTagList,
    McvErrorMessage,
    McvLoading,
  },
  computed: {
    ...mapGetters({
      article: getterTypes.data,
      error: getterTypes.error,
      isLoading: getterTypes.isLoading,
      currentUser: authGetterTypes.currentUser,
      isLoggedIn: authGetterTypes.isLoggedIn,
    }),
    isAuthor() {
      if (!this.article || !this.currentUser) return false
      return this.article.author.username === this.currentUser.username
    },
  },
  mounted() {
    const slug = this.$route.params.slug
    this.$store.dispatch(actionTypes.getArticle, {slug})
  },
  methods: {
    onDeleteArticle() {
      const slug = this.$route.params.slug
      this.$store.dispatch(actionTypes.deleteArticle, {slug}).then(() => {
        this.$router.push({name: 'globalFeed'})
      })
    },
  },
}
</script>
