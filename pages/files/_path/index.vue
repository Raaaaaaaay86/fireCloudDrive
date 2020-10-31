<template>
  <div
    class="p-16"
    style="min-height: 100vh"
  >
    <div
      ref="searchBarArea"
      class="float-right relative ml-auto mb-8"
    >
      <SearchBar
        @toggleSortList=" sortList = !sortList"
      />
      <ul
        class="sortList"
        :class=" sortList ? 'block' : 'hidden' "
      >
        <li>依上傳時間</li>
        <li>依修改時間</li>
        <li>依檔案大小</li>
        <li>依擁有者</li>
      </ul>
    </div>
    <FilesTable :title="`資料夾 (${folderName})`" class="mb-8">
      <template v-for="prop in pathFiles">
        <div :key="prop.key">
          <FileInfo
            v-if="prop.type === 'file'"
            :file="prop"
          />
          <FolderInfo
            v-if="prop.type === 'folder'"
            :folder="prop"
          />
        </div>
      </template>
    </FilesTable>
  </div>
</template>

<script>
import SearchBar from '@/components/UI/SearchBar';
import FilesTable from '@/components/UI/FilesTable';
import FileInfo from '@/components/UI/FileInfo';
import FolderInfo from '@/components/UI/FolderInfo';
import { mapGetters } from 'vuex';

export default {
  components: {
    SearchBar,
    FilesTable,
    FileInfo,
    FolderInfo,
  },
  middleware({ route, store }) {
    const { path } = route.params;
    const slashPath = path.replace(/-/g, '/');
    store.dispatch('updateCurrentPath', slashPath);
    return store.dispatch('fetchPathFiles', { path });
  },
  data() {
    return {
      sortList: false,
    };
  },
  computed: {
    ...mapGetters(['pathFiles']),
    folderName() {
      const pathArray = this.$route.params.path.split('-');
      const name = pathArray[pathArray.length - 1];
      return name;
    },
  },
  mounted() {
    document.addEventListener('click', this.close);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close);
  },
  methods: {
    close(e) {
      if (!this.$refs.searchBarArea.contains(e.target)) {
        this.sortList = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sortList{
  position: absolute;
  z-index: 999;
  padding: 16px 0 16px 0;
  width: 420px;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
  background-color: #fff;
  color: #2d3748;
  border: 1px solid rgba(45, 55, 72, .1);
  border-radius: 5px;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)!important;
  li{
    padding: 8px 16px 8px 16px;
    font-weight: 600;
    &:hover{
      background-color: #e2e8f0;
    }
  }
}
</style>
