<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
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
                  v-model="form.image"
                  placeholder="URL of your picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.username"
                  placeholder="Username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  v-model="form.bio"
                  placeholder="Short bio about your"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="password"
                  class="form-control form-control-lg"
                  v-model="form.password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                :disabled="isSubmitting"
              >
                Update settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="onLogout">
            Or click here to logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {
  getterTypes as authGetterTypes,
  actionTypes as authActionTypes,
} from '@/store/modules/auth'
import {getterTypes as settingsGetterTypes} from '@/store/modules/settings'
import McvValidationErrors from '@/components/ValidationErrors.vue'

export default {
  name: 'McvSettings',
  components: {McvValidationErrors},
  computed: {
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
      isSubmitting: settingsGetterTypes.isSubmitting,
      validationErrors: authGetterTypes.validationErrors,
    }),
    form() {
      return {
        image: this.currentUser.image,
        username: this.currentUser.username,
        bio: this.currentUser.bio,
        email: this.currentUser.email,
        password: '',
      }
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch(authActionTypes.logout).then(() => {
        this.$router.push({name: 'globalFeed'})
      })
    },
    onSubmit() {
      this.$store.dispatch(authActionTypes.updateCurrentUser, {
        currentUserInput: this.form,
      })
    },
  },
}
</script>
