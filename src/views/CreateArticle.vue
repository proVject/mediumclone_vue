<template>
  <mcv-article-form
    :initial-value="initialValue"
    :validation-errors="validationErrors"
    :is-submitting="isSubmitting"
    @articleSubmit="onSubmit"
  />
</template>

<script>
import McvArticleForm from '@/components/ArticleForm.vue'
import {actionTypes, getterTypes} from '@/store/modules/createArticle'
import {mapGetters} from 'vuex'

export default {
  name: 'McvCreateArticle',
  components: {McvArticleForm},
  data() {
    return {
      initialValue: {
        title: '',
        body: '',
        description: '',
        tagList: [],
      },
    }
  },
  computed: {
    ...mapGetters({
      isSubmitting: getterTypes.isSubmitting,
      validationErrors: getterTypes.validationErrors,
    }),
  },
  methods: {
    onSubmit(articleInput) {
      this.$store
        .dispatch(actionTypes.createArticle, {articleInput})
        .then((article) => {
          this.$router.push({name: 'article', params: {slug: article.slug}})
        })
    },
  },
}
</script>
