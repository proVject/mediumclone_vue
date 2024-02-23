<template>
  <div>
    <mcv-loading v-if="isLoading" />
    <mcv-error-message v-if="error" />
    <!--    <div>No articles are here... yet.</div>-->
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, idx) in feed.articles"
        :key="idx"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" alt="avatar" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username},
              }"
              class="author"
            >
              {{ article.author.username }}
            </router-link>
            <div class="date">{{ article.createdAt }}</div>
          </div>
          <div class="pull-xs-right">ADD TO FAVORITES</div>
        </div>
        <router-link
          :to="{name: 'article', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <mcv-tag-list :tag-list="article.tagList" />
        </router-link>
      </div>
      <mcv-pagination
        v-if="feed"
        :current-page="currentPage"
        :limit="limit"
        :total="feed.articlesCount"
      />
    </div>
  </div>
</template>

<script>
import {actionTypes, getterTypes} from '@/store/modules/feed'
import {mapGetters} from 'vuex'
import McvPagination from '@/components/Pagination.vue'
import {limit} from '@/helpers/vars'
import queryString from 'query-string'
import McvLoading from '@/components/Loading.vue'
import McvErrorMessage from '@/components/ErrorMessage.vue'
import McvTagList from '@/components/TagList.vue'

export default {
  name: 'McvFeed',
  components: {McvTagList, McvErrorMessage, McvLoading, McvPagination},
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      limit,
    }
  },
  computed: {
    ...mapGetters({
      isLoading: getterTypes.isLoading,
      feed: getterTypes.data,
      error: getterTypes.error,
    }),
    currentPage() {
      return Number(this.$route.query.page || '1')
    },
    offset() {
      return this.currentPage * this.limit - this.limit
    },
  },
  mounted() {
    this.fetchFeed()
  },
  methods: {
    fetchFeed() {
      const parsedUrl = queryString.parseUrl(this.apiUrl)
      parsedUrl.query.limit = this.limit
      parsedUrl.query.offset = this.offset
      const apiUrl = queryString.stringifyUrl(parsedUrl)
      return this.$store.dispatch(actionTypes.getFeed, {apiUrl})
    },
  },
  watch: {
    '$route.fullPath'() {
      this.fetchFeed()
    },
  },
}
</script>
