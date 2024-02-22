<template>
  <ul class="error-messages">
    <li v-for="message of errorMessages" :key="message">
      {{ message }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'McvValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorMessages() {
      return Object.entries(this.validationErrors).reduce(
        (acc, [name, messages]) => {
          messages.forEach((message) => acc.push(`${name} ${message}`))
          return acc
        },
        []
      )
    },
  },
}
</script>
