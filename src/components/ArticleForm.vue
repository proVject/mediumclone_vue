<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 c">
          <mcv-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article title"
                  v-model="title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Description"
                  v-model="description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  placeholder="What is this article about?"
                  v-model="body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Enter tags"
                  v-model="tagList"
                />
              </fieldset>
              <fieldset class="form-group">
                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  :disabled="isSubmitting"
                >
                  Publish Article
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from '@/components/ValidationErrors.vue'

export default {
  name: 'McvArticleForm',
  components: {McvValidationErrors},
  props: {
    initialValue: {
      type: Object,
      required: true,
    },
    validationErrors: {
      type: Object,
      required: false,
    },
    isSubmitting: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: this.initialValue?.title || '',
      description: this.initialValue?.description || '',
      body: this.initialValue?.body || '',
      tagList: this.initialValue?.tagList?.join(' ') || '',
    }
  },
  methods: {
    onSubmit() {
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList.split(' '),
      }
      this.$emit('articleSubmit', form)
    },
  },
}
</script>
