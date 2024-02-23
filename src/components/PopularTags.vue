<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <mcv-loading v-if="isLoading" />
    <mcv-error-message v-if="error" />
    <!--    <div>No tags are here... yet.</div>-->
    <div v-if="popularTags" class="tag-list">
      <router-link
        v-for="popularTag in popularTags"
        :key="popularTag"
        class="tag-default tag-pill"
        :to="{name: 'tagFeed', params: {slug: popularTag}}"
      >
        {{ popularTag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import {actionTypes, getterTypes} from '@/store/modules/PopularTags'
import {mapGetters} from 'vuex'
import McvErrorMessage from '@/components/ErrorMessage.vue'
import McvLoading from '@/components/Loading.vue'

export default {
  name: 'McvPopularTags',
  components: {McvLoading, McvErrorMessage},
  computed: {
    ...mapGetters({
      popularTags: getterTypes.data,
      isLoading: getterTypes.isLoading,
      error: getterTypes.error,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags)
  },
}
</script>
