<template>
  <div class="p-16">
    <div
      ref="searchBarArea"
      class="float-right relative ml-auto mb-8"
    >
      <SearchBar
        @toggleSortList=" sortList = !sortList"
      />
      <ul
        ref="iinput"
        class="sortList"
        :class=" sortList ? 'block' : 'hidden' "
      >
        <li>依上傳時間</li>
        <li>依修改時間</li>
        <li>依檔案大小</li>
        <li>依擁有者</li>
      </ul>
    </div>
    <FilesTable title="已加星號" class="mb-8">
      <template v-for="file in archivedFiles">
        <div :key="file.key">
          <FileInfo
            :id="file.key"
            :name="file.fileName"
            :size="file.size"
            :last-update-time="file.updateTime"
            :download-url="file.downloadURL"
            :archive="file.archive"
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
import { mapGetters } from 'vuex';

export default {
  components: {
    SearchBar,
    FilesTable,
    FileInfo,
  },
  data() {
    return {
      sortList: false,
    };
  },
  computed: {
    ...mapGetters(['archivedFiles']),
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
