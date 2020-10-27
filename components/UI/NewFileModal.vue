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
      <input type="text" class="h-12 w-full mb-4 bg-gray-300">
      <div style="pointer-events: auto;">
        <Button
          class="mr-2 border border-gray-600 cursor-pointer hover:bg-gray-600 hover:text-white"
          @click.native.prevent="closeModal"
        >
          取消
        </Button>
        <Button class="bg-blue-400 text-white cursor-pointer">
          建立
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/UI/Button';

export default {
  components: {
    Button,
  },
  computed: {
    modalVisibility() {
      return this.$store.getters['modal/modalVisibility'];
    },
  },
  methods: {
    closeModal() {
      this.$store.dispatch('modal/close');
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
