<template>
  <div class="grid grid-cols-12 h-screen">
    <div class="pt-16 px-8 pb-8 flex flex-col items-center col-span-2 bg-blue-400 shadow select-none">
      <img class="mb-12" :src="require('@/assets/imgs/logo@2x.png')" alt="logo">
      <div
        class="inline-block px-8 py-2 mb-8 bg-white text-blue-400 text-xl rounded-full shadow cursor-pointer"
        @click="$refs.file.click()"
      >
        <i class="fas fa-cloud-upload-alt" />
        上傳檔案
      </div>
      <input id="fileUpload" ref="file" type="file" hidden @change="onFileChange">
      <div class="w-full flex text-2xl flex-col items-center text-white">
        <nuxt-link to="/" class="w-full text-center mb-6 cursor-pointer rounded hover:bg-blue-500">
          <i class="far fa-folder" />
          <span>
            我的檔案
          </span>
        </nuxt-link>
        <nuxt-link to="/selected" class="w-full text-center mb-6 cursor-pointer rounded hover:bg-blue-500">
          <i class="far fa-star" />
          已加星號
        </nuxt-link>
        <div class="w-full text-center mb-6 cursor-pointer rounded hover:bg-blue-500">
          <i class="far fa-share-square" />
          檔案共享
        </div>
        <div class="w-full text-center mb-6 cursor-pointer rounded hover:bg-blue-500">
          <i class="far fa-trash-alt" />
          垃圾桶
        </div>
      </div>
      <UserInfo />
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

export default {
  components: {
    UserInfo,
    NewFileModal,
  },
  data() {
    return {
      file: '',
    };
  },
  methods: {
    onFileChange(e) {
      this.$store.dispatch('storage/uploadFile', e);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
