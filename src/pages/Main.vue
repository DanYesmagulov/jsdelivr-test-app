<template>
  <b-container>
    <p>Hello World</p>
    <SearchInput />
    <PackagesTable />
  </b-container>
</template>

<script>
import SearchInput from '@/components/SearchInput.vue'
import PackagesTable from '@/components/PackagesTable.vue'

export default {
  name: 'Main',
  components: {
    SearchInput,
    PackagesTable,
  },
}
</script>
