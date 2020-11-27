<template>
  <div
    v-if="visible"
    class="fixed flex justify-center items-center w-screen h-screen bg-black bg-opacity-50"
  >
    <div class="w-64 h-32 bg-white rounded-md relative overflow-hidden">
      <div class="h-8 absolute top-0 left-0 right-0 bg-blue-400" />
      <div class="h-full pt-8 flex flex-col justify-center items-center">
        <p class="mb-2">
          上傳中
        </p>
        <i class="fas fa-spinner fa-pulse" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    visible() {
      return this.$store.getters['uploading/visible'];
    },
  },
};
</script>
