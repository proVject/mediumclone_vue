<template>
  <div>
    <mcv-loading v-if="isLoading" />
    <mcv-article-form
      v-if="article"
      :initial-value="article"
      :validation-errors="validationErrors"
      :is-submitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm.vue'
import {actionTypes, getterTypes} from '@/store/modules/editArticle'
import {mapGetters} from 'vuex'
import McvLoading from '@/components/Loading.vue'

export default {
  name: 'McvEditArticle',
  components: {McvLoading, McvArticleForm},
  computed: {
    ...mapGetters({
      isSubmitting: getterTypes.isSubmitting,
      validationErrors: getterTypes.validationErrors,
      isLoading: getterTypes.isLoading,
      article: getterTypes.data,
    }),
  },
  mounted() {
    const slug = this.$route.params.slug
    this.$store.dispatch(actionTypes.getArticle, {slug})
  },
  methods: {
    onSubmit(articleInput) {
      const slug = this.$route.params.slug
      this.$store
        .dispatch(actionTypes.editArticle, {
          articleInput,
          slug,
        })
        .then((article) => {
          this.$router.push({name: 'article', params: {slug: article.slug}})
        })
    },
  },
}
</script>
