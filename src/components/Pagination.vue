<template>
  <nav>
    <ul class="pagination">
      <li
        v-for="page in pages"
        :key="page"
        class="page-item"
        :class="{active: currentPage === page}"
      >
        <router-link class="page-link" :to="{path: url, query: {page}}">{{
          page
        }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import {range} from '@/helpers/utils'

export default {
  name: 'McvPagination',
  props: {
    total: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    url() {
      return this.$route.path
    },
    pages() {
      // return Math.ceil(this.total / this.limit)
      const pagesCount = Math.ceil(this.total / this.limit)
      return range(1, pagesCount)
    },
  },
}
</script>
