<template>
  <ul class="tag-list">
    <li
      class="tag-default tag-pill tag-outline"
      v-for="tag in tagList"
      :key="tag"
    >
      {{ tag }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'McvTagList',
  props: {
    tagList: {
      type: Array,
      required: true,
    },
  },
}
</script>
