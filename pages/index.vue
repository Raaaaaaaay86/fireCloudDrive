<template>
  <div class="p-16">
    <SearchBar class="ml-auto mb-8" />
    <FilesTable title="我的檔案" class="mb-8">
      <FileInfo
        v-for="file in fetchedFiles"
        :key="file.key"
        :name="file.fileName"
        :size="file.size"
        :last-update-time="file.updateTime"
      />
    </FilesTable>
  </div>
</template>

<script>
import SearchBar from '@/components/UI/SearchBar';
import FilesTable from '@/components/UI/FilesTable';
import FileInfo from '@/components/UI/FileInfo';
import { mapGetters } from 'vuex';

export default {
  components: {
    SearchBar,
    FilesTable,
    FileInfo,
  },
  computed: {
    ...mapGetters(['fetchedFiles']),
  },
};
</script>

<style>

</style>
