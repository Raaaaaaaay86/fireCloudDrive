<template>
  <div
    v-if="modalVisibility"
    class="fixed w-screen h-screen bg-black bg-opacity-50"
  >
    <div class="modal flex flex-col items-center justify-center text-gray-800 bg-white rounded shadow-lg">
      <div class="w-full flex items-center justify-between mb-4">
        <h1 class="font-bold text-xl self-start">
          建立新資料夾
        </h1>
        <i class="fas fa-times cursor-pointer" @click="closeModal" />
      </div>
      <form class="w-full" @submit.prevent="createNewFolder">
        <input
          v-model="newFolderName"
          type="text"
          class="h-12 w-full mb-4 bg-gray-300"
        >
        <div class="flex justify-center" style="pointer-events: auto;">
          <Button
            class="mr-2 border border-gray-600 cursor-pointer hover:bg-gray-600 hover:text-white"
            @click.native.prevent="closeModal"
          >
            取消
          </Button>
          <Button
            class="bg-blue-400 text-white cursor-pointer"
            @click.native.prevent="createNewFolder"
          >
            建立
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Button from '@/components/UI/Button';
import { mapGetters } from 'vuex';

export default {
  components: {
    Button,
  },
  data() {
    return {
      newFolderName: '',
    };
  },
  computed: {
    modalVisibility() {
      return this.$store.getters['modal/modalVisibility'];
    },
    ...mapGetters(['rootFolderNames', 'pathFolderNames', 'currentPath']),
  },
  methods: {
    closeModal() {
      this.$store.dispatch('modal/close');
    },
    createNewFolder() {
      const vm = this;
      const folderName = vm.newFolderName;
      // If folderName is already existed in the current path, would return alert.
      if (vm.rootFolderNames.includes(folderName) && vm.currentPath === 'root') {
        return alert('資料夾已存在');
      }
      if (vm.pathFolderNames.includes(folderName) && vm.currentPath !== 'root') {
        return alert('資料夾已存在');
      }
      // Sending the CreateNewFolder request.
      this.$store.dispatch('createNewFolder', { folderName })
        .then(() => {
          vm.newFolderName = ''; // If succeed, clear the modal input.
        });
      return this.$store.dispatch('modal/close'); // Close the modal
    },
  },
};
</script>

<style lang="scss" scoped>
  .modal {
    width: 28rem;
    height: 14rem;
    position: absolute;
    padding: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
