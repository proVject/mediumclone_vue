<template>
  <button
    class="btn btn-sm action-btn"
    :class="{
      'btn-outline-secondary': !isFollowingLoc,
      'btn-secondary': isFollowingLoc,
    }"
    @click="onFollow"
  >
    <i class="ion-plus-round"></i>
    &nbsp; {{ label }} {{ profileSlug }}
  </button>
</template>

<script>
import {actionTypes} from '@/store/modules/followProfile'

export default {
  name: 'McvFollowProfile',
  props: {
    isFollowing: {
      type: Boolean,
      required: true,
    },
    profileSlug: {
      type: String,
      required: true,
    },
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isFollowingLoc: this.isFollowing,
    }
  },
  computed: {
    label() {
      return this.isFollowingLoc ? 'Unfollow' : 'Follow'
    },
  },
  methods: {
    onFollow() {
      if (!this.isLoggedIn) {
        return this.$router.push({name: 'register'})
      }
      this.$store.dispatch(actionTypes.followProfile, {
        isFollowing: this.isFollowingLoc,
        slug: this.profileSlug,
      })
      this.isFollowingLoc = !this.isFollowingLoc
    },
  },
}
</script>
