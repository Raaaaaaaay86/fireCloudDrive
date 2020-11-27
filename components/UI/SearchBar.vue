<template>
  <div class="h-12 w-112 flex items-center rounded-full bg-gray-400 overflow-hidden text-gray-900 relative">
    <div class="w-12 h-12 absolute bg-blue-400 flex items-center justify-center text-white rounded-full cursor-pointer">
      <i class="fas fa-search" />
    </div>
    <input
      type="text"
      class="ml-16 inline-block h-full w-full text-xl font-bold bg-gray-400 placeholder-gray-700"
      placeholder="搜尋您的檔案"
      @input="$emit('input', $event.target.value)"
    >
    <p
      class="mr-4 text-gray-700 cursor-pointer"
      @click.prevent="$emit('toggleSortList', true)"
    >
      ▼
    </p>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
