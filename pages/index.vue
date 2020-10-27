<template>
  <div class="p-16">
    <SearchBar class="ml-auto mb-8" />
    <FilesTable title="我的檔案" class="mb-8" />
    <FilesTable title="檔案共享" />
  </div>
</template>

<script>
import SearchBar from '@/components/UI/SearchBar';
import FilesTable from '@/components/UI/FilesTable';

export default {
  components: {
    SearchBar,
    FilesTable,
  },
};
</script>

<style>

</style>
