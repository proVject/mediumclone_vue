<template>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="userProfile.image" alt="avatar" />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <template v-if="!isAnonymous">
              <mcv-follow-profile
                v-if="!isCurrentUserProfile"
                :is-logged-in="isLoggedIn"
                :profile-slug="userProfile.username"
                :is-following="userProfile.following"
              />
              <router-link
                v-if="isCurrentUserProfile"
                class="btn btn-sm btn-outline-secondary pull-xs-right"
                :to="{name: 'settings'}"
                >Edit Profile Settings
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  :to="{
                    name: 'userProfile',
                    params: {slug: userProfile.username},
                  }"
                  exact
                >
                  My Posts
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  active-class="active"
                  class="nav-link"
                  :to="{
                    name: 'userProfileFavorites',
                    params: {slug: userProfile.username},
                  }"
                >
                  Favorite Posts
                </router-link>
              </li>
            </ul>
          </div>
          <mcv-feed :api-url="apiUrl" />
        </div>
      </div>
    </div>
  </div>
  <mcv-loading v-else-if="isLoading" />
  <mcv-error-message v-else-if="error" :message="error" />
</template>

<script>
import {mapGetters} from 'vuex'
import {
  actionTypes,
  getterTypes as userProfileGetterTypes,
} from '@/store/modules/userProfile'
import McvFeed from '@/components/Feed.vue'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
import McvErrorMessage from '@/components/ErrorMessage'
import McvLoading from '@/components/Loading'
import McvFollowProfile from '@/components/FollowProfile.vue'

export default {
  name: 'McvUserProfile',
  components: {McvFollowProfile, McvErrorMessage, McvFeed, McvLoading},
  computed: {
    ...mapGetters({
      userProfile: userProfileGetterTypes.data,
      isLoading: userProfileGetterTypes.isLoading,
      error: userProfileGetterTypes.error,
      currentUser: authGetterTypes.currentUser,
      isAnonymous: authGetterTypes.isAnonymous,
      isLoggedIn: authGetterTypes.isLoggedIn,
    }),
    isCurrentUserProfile() {
      return this.currentUser.username === this.userProfile.username
    },
    apiUrl() {
      if (this.$route.name === 'userProfile')
        return `/articles?author=${this.userProfile.username}`
      if (this.$route.name === 'userProfileFavorites')
        return `/articles?favorited=${this.userProfile.username}`
      return ''
    },
  },
  mounted() {
    this.fetchUserProfile()
  },
  methods: {
    fetchUserProfile() {
      this.$store.dispatch(actionTypes.getUserProfile, {
        slug: this.$route.params.slug,
      })
    },
  },
  watch: {
    '$route.params.slug'() {
      this.fetchUserProfile()
    },
  },
}
</script>
