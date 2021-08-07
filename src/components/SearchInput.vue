<template>
  <div>
    <b-form-input
      v-model="searchValue"
      placeholder="search all of npm"
      @keyup.enter="search(searchValue)"
    ></b-form-input>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SearchInput',
  data() {
    return {
      searchValue: '',
    }
  },
  methods: {
    ...mapActions(['SEARCH_PACKAGES']),
    search(query) {
      this.SEARCH_PACKAGES({ query: query })
    },
  },
}
</script>

<style></style>
