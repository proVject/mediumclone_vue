<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item">
        <router-link
          v-if="isLoggedIn"
          :class="{active: routeName === 'yourFeed'}"
          class="nav-link"
          :to="{name: 'yourFeed'}"
        >
          Your Feed
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :class="{active: routeName === 'globalFeed'}"
          class="nav-link"
          :to="{name: 'globalFeed'}"
        >
          Global Feed
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          v-if="tagName"
          :class="{active: routeName === 'tagFeed'}"
          class="nav-link"
          :to="{name: 'tagFeed'}"
        >
          <i class="ion-pound" />
          {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getterTypes} from '@/store/modules/auth'

export default {
  name: 'McvFeedToggle',
  props: {
    tagName: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn,
    }),
    routeName() {
      return this.$route.name
    },
  },
}
</script>
