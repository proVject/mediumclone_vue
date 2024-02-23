<template>
  <div class="home-page">
    <mcv-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed-toggle />
          <mcv-feed :api-url="apiUrlWithTag" />
        </div>
        <div class="col-md-3">
          <mcv-popular-tags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed'
import McvPopularTags from '@/components/PopularTags.vue'
import queryString from 'query-string'
import McvBanner from '@/components/Banner.vue'
import McvFeedToggle from '@/components/FeedToggle.vue'

export default {
  name: 'McvYourFeed',
  components: {
    McvFeedToggle,
    McvBanner,
    McvPopularTags,
    McvFeed,
  },
  data() {
    return {
      apiUrl: '/articles/feed',
    }
  },
  computed: {
    apiUrlWithTag() {
      const parsedUrl = queryString.parseUrl(this.apiUrl)
      parsedUrl.query.tag = this.$route.params.slug
      return queryString.stringifyUrl(parsedUrl)
    },
  },
}
</script>
