<template>
  <div class="grid grid-cols-12 text-gray-700 text-xl relative">
    <div class="col-span-5 py-4 pl-4 flex">
      <img
        :src="require(`@/assets/imgs/icon__${fileType}.png`)"
        alt="file-type-logo"
        class="mr-8"
      >
      <span class="cursor-pointer">
        {{ name }}
      </span>
    </div>
    <div class="col-span-2 py-4">
      <span>
        {{ lastUpdateTime }}
      </span>
    </div>
    <div class="col-span-2 py-4">
      <span>
        {{ size }}
      </span>
    </div>
    <div class="col-span-2 py-4">
      <span>
        {{ author }}
      </span>
    </div>
    <div
      class="col-span-1 py-4 listSwitch"
      @click="fileList = !fileList"
    >
      <i class="fas fa-ellipsis-h cursor-pointer" />
    </div>
    <ul
      class="fileList"
      :class=" fileList ? 'block' : 'hidden' "
    >
      <li @click="downloadFile">
        下載
      </li>
      <li>標示星號</li>
      <li @click.prevent="deleteFile(id)">
        刪除
      </li>
      <li>移動</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    name: {
      type: String,
      required: false,
      default: 'undefined',
    },
    lastUpdateTime: {
      type: Number,
      required: false,
      default: 0,
    },
    size: {
      type: Number,
      required: false,
      default: 0,
    },
    id: {
      type: String,
      required: false,
      default: 'noKey',
    },
    downloadUrl: {
      type: String,
      required: false,
      default: '/#',
    },
    author: {
      type: String,
      required: false,
      default: 'undefined',
    },
  },
  data() {
    return {
      fileList: false,
    };
  },
  computed: {
    ...mapGetters(['clickMenu/fileList']),
    fileType() {
      const imgReg = /^.*\.(jpg|JPG|gif|GIF|png|PNG|webp|WEBP)$/;
      const pdfReg = /^.*\.(pdf|PDF)$/;
      // const docReg = /^.*\.(doc|DOC|)$/;
      let type = '';
      if (this.name.match(imgReg)) {
        type = 'img';
      } else if (this.name.match(pdfReg)) {
        type = 'pdf';
      } else {
        type = 'doc';
      }

      return type;
    },
  },
  mounted() {
    document.addEventListener('click', this.close);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close);
  },
  methods: {
    deleteFile(id) {
      this.$store.dispatch('deleteFile', id);
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.fileList = false;
      }
    },
    downloadFile() {
      window.open(this.downloadUrl, 'download');
    },
  },
};
</script>

<style lang="scss" scoped>
.fileList{
  position: absolute;
  z-index: 999;
  top: 75%;
  right: 0;
  padding: 16px 0 16px 0;
  font-weight: 600;
  color: #2d3748;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid rgba(45, 55, 72, .1);
  box-shadow: 0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05)!important;
  li {
    padding: 8px 16px 8px 16px;
    cursor: pointer;
    &:active{
      background-color: #e2e8f0;
    }
  }
}
</style>
