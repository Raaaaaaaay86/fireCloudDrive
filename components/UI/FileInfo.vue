<template>
  <div class="grid grid-cols-12 text-gray-700 text-xl relative">
    <div class="col-span-5 py-4 pl-4 flex">
      <img
        :src="require('@/assets/imgs/pdf@2x.png')"
        alt="file-type-logo"
        class="mr-8"
      >
      <span class="cursor-pointer" @click.prevent="deleteFile">
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
      <li>下載</li>
      <li>標示星號</li>
      <li>刪除</li>
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
      required: true,
    },
    lastUpdateTime: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: false,
      default: 'undefinedUser',
    },
  },
  data() {
    return {
      fileList: false,
    };
  },
  computed: {
    ...mapGetters(['clickMenu/fileList']),
  },
  mounted() {
    document.addEventListener('click', this.close);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close);
  },
  methods: {
    deleteFile() {
      const key = '-MKi9Wa0s2tn4_Y0Cd0w';
      this.$store.dispatch('storage/deleteFile', key);
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.fileList = false;
      }
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
  }
}
</style>
