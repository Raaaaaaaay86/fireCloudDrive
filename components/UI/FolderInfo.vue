<template>
  <div class="grid grid-cols-12 text-gray-700 text-xl rounded relative hover:bg-blue-200">
    <div class="col-span-5 py-4 pl-4 flex cursor-pointer">
      <img
        :src="require(`@/assets/imgs/icon__folder.png`)"
        alt="file-type-logo"
        class="mr-8"
      >
      <span>
        {{ name }}
        <i v-if="archive" class="fas fa-star text-yellow-500" />
      </span>
    </div>
    <div class="col-span-2 py-4">
      <span>
        {{ lastUpdateTime | timestampToDate }}
      </span>
    </div>
    <div class="col-span-2 py-4">
      <span>
        {{ size | fileSize }}
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
      <li @click.prevent="toFile">
        移動到 {{ name }}
      </li>
      <li v-if="archive" @click="toggleArchiveFile">
        移除星號
      </li>
      <li v-else @click="toggleArchiveFile">
        標示星號
      </li>
      <li @click.prevent="deleteFolder()">
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
    author: {
      type: String,
      required: false,
      default: 'undefined',
    },
    archive: {
      type: Boolean,
      require: false,
      default: false,
    },
    path: {
      type: String,
      require: false,
      default: 'unname',
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
    deleteFolder() {
      const vm = this;
      const { name } = vm;
      const dashPath = vm.path.split('/').join('-');
      this.$store.dispatch('deleteFolder', { name, dashPath });
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.fileList = false;
      }
    },
    toggleArchiveFile() {
      const data = {
        path: this.path,
        archive: this.archive,
      };
      this.$store.dispatch('toggleArchiveFolder', data);
    },
    toFile() {
      const pathId = this.path.split('/').join('-');
      this.$router.push(`/files/${pathId}`);
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
