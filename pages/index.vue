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
        v-model="filterString"
        @toggleSortList=" sortList = !sortList"
      />
      <ul
        class="sortList"
        :class=" sortList ? 'block' : 'hidden' "
      >
        <li @click.prevent="sortMethod = 'nameAscending'; sortList = !sortList">
          依檔案名稱(A > Z)
        </li>
        <li @click.prevent="sortMethod = 'nameDescending'; sortList = !sortList">
          依檔案名稱(Z > A)
        </li>
        <li @click.prevent="sortMethod = 'updateTimeAscending'; sortList = !sortList">
          依上傳時間(新 > 舊)
        </li>
        <li @click.prevent="sortMethod = 'updateTimeDescending'; sortList = !sortList">
          依上傳時間(舊 > 新)
        </li>
        <li @click.prevent="sortMethod = 'sizeAscending'; sortList = !sortList">
          依檔案大小(小 > 大)
        </li>
        <li @click.prevent="sortMethod = 'sizeDescending'; sortList = !sortList">
          依檔案大小(大 > 小)
        </li>
        <li @click.prevent="sortMethod = 'authorAscending'; sortList = !sortList">
          依擁有者 (A > Z)
        </li>
        <li @click.prevent="sortMethod = 'authorDescending'; sortList = !sortList">
          依擁有者 (Z > A)
        </li>
      </ul>
    </div>
    <FilesTable title="我的檔案" class="mb-8">
      <template v-for="(prop, index) in fetchedFiles">
        <div :key="index">
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

export default {
  middleware({ store }) {
    store.dispatch('updateCurrentPath', 'root');
  },
  components: {
    SearchBar,
    FilesTable,
    FileInfo,
    FolderInfo,
  },
  data() {
    return {
      sortList: false,
      sortMethod: 'typeDescending',
      filterString: '',
    };
  },
  computed: {
    fetchedFiles() {
      const vm = this;
      const data = { ...this.$store.getters.fetchedFiles };
      const dataArray = [];
      // convert the data type from Object to Array in order to use Array.sort().
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === 'object') dataArray.push(data[key]);
      });
      // to change sort condition if vm.sortMethod changed.
      if (vm.sortMethod === 'updateTimeAscending') {
        dataArray.sort((a, b) => b.updateTime - a.updateTime);
      } else if (vm.sortMethod === 'updateTimeDescending') {
        dataArray.sort((a, b) => a.updateTime - b.updateTime);
      } else if (vm.sortMethod === 'sizeAscending') {
        dataArray.sort((a, b) => a.size - b.size);
      } else if (vm.sortMethod === 'sizeDescending') {
        dataArray.sort((a, b) => b.size - a.size);
      } else if (vm.sortMethod === 'authorAscending') {
        dataArray.sort((a, b) => a.author - b.author);
      } else if (vm.sortMethod === 'authorDescending') {
        dataArray.sort((a, b) => b.author - a.author);
      } else if (vm.sortMethod === 'nameAscending') {
        dataArray.sort((a, b) => a.name.localeCompare(b.name));
      } else if (vm.sortMethod === 'nameDescending') {
        dataArray.sort((a, b) => b.name.localeCompare(a.name));
      } else if (vm.sortMethod === 'typeDescending') {
        dataArray.sort((a, b) => a.type - b.type);
      }

      if (vm.filterString.length !== 0) {
        const filteredResult = dataArray.filter((file) => {
          const string = vm.filterString.toUpperCase().trim();
          return file.name.toUpperCase().trim().includes(string);
        });
        return filteredResult;
      }

      return dataArray;
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
