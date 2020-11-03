<template>
  <div
    class="grid grid-cols-12 h-screen"
  >
    <div class="pt-16 px-8 pb-8 flex flex-col items-center col-span-2 bg-blue-400 shadow select-none">
      <img class="mb-12" :src="require('@/assets/imgs/logo@2x.png')" alt="logo">
      <div
        v-if="currentPath !== 'archive'"
        id="uploadButton"
        ref="uploadButton"
        class="inline-block px-8 py-2 mb-8 bg-white text-blue-400 text-xl rounded-full shadow relative cursor-pointer"
        @click.prevent="uploadList = !uploadList"
      >
        <i class="fas fa-cloud-upload-alt" />
        上傳檔案
        <div
          class="uploadDropDown"
          :class=" uploadList ? 'block' : 'hidden' "
        >
          <ul>
            <li @click.prevent="$refs.file.click()">
              <i class="far fa-file" />
              上傳檔案
            </li>
            <li>
              <i class="far fa-folder" />
              上傳資料夾
            </li>
            <li @click.prevent="openModal">
              <i class="far fa-folder-open" />
              新資料夾
            </li>
          </ul>
        </div>
      </div>
      <input
        id="fileUpload"
        ref="file"
        type="file"
        hidden
        @change="onFileChange"
      >
      <div class="w-full flex text-2xl flex-col items-center text-white">
        <nuxt-link to="/" class="w-full text-center mb-6 cursor-pointer rounded hover:bg-blue-500">
          <i class="far fa-folder" />
          <span>
            我的檔案
          </span>
        </nuxt-link>
        <nuxt-link to="/archives" class="w-full text-center mb-6 cursor-pointer rounded hover:bg-blue-500">
          <i class="far fa-star" />
          已加星號
        </nuxt-link>
        <div
          class="w-full text-center mb-6 cursor-pointer rounded hover:bg-blue-500"
          @click="signOut"
        >
          <i class="far fa-trash-alt" />
          登出
        </div>
      </div>
      <UserInfo :used-storage="usedStorage" />
    </div>
    <div class="col-span-10 bg-white overflow-auto">
      <Nuxt />
    </div>
    <NewFileModal />
  </div>
</template>

<script>
import UserInfo from '@/components/UI/UserInfo';
import NewFileModal from '@/components/UI/NewFileModal';
import { mapGetters } from 'vuex';

export default {
  middleware: ['checkbyServer'],
  components: {
    UserInfo,
    NewFileModal,
  },
  data() {
    return {
      uploadList: false,
    };
  },
  computed: {
    ...mapGetters([
      'rootFileNames',
      'pathFileNames',
      'rootFolderNames',
      'currentPath',
      'usedStorage',
    ]),
  },
  mounted() {
    document.addEventListener('click', this.close);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close);
  },
  methods: {
    onFileChange(e) {
      const vm = this;
      const { name } = e.target.files[0];
      // If fileName is already existed in the current path, would return alert.
      if (vm.rootFileNames.includes(name) && vm.currentPath === 'root') {
        return alert('檔名已存在');
      }
      if (vm.pathFileNames.includes(name) && vm.currentPath !== 'root') {
        return alert('檔名已存在');
      }
      // Sending the CreateNewFile request.
      return this.$store.dispatch('uploadFile', e)
        .then(() => {
          this.uploadList = false; // Close the dropdown list.
        });
    },
    openModal() {
      this.$store.dispatch('modal/open');
    },
    close(e) {
      if (!this.$refs.uploadButton.contains(e.target)) {
        this.uploadList = false;
      }
    },
    async signOut() {
      await this.$store.dispatch('auth/logOut');
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
.uploadDropDown{
  position: absolute;
  background-color: #fff;
  color: #2d3748;
  font-size: 16px;
  font-weight: 600;
  min-width: 150px;
  margin-top: 16px;
  padding: 16px 0 16px 0;
  left: 50%;
  transform: translatex(-50%);
  border-radius: 5px;
  ul li{
    padding: 8px 16px 8px 16px;
    &:active{
      background-color: #e2e8f0;
    }
  }
}
</style>
