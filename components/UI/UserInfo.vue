<template>
  <div class="mt-auto flex flex-col items-center text-white">
    <div class="mb-4 flex items-center justify-center">
      <div id="avatar" class="h-16 w-16 mr-2 bg-white rounded-full" />
      <div>
        <p class="font-bold text-xl">
          UserName
        </p>
        <span>
          User
        </span>
      </div>
    </div>
    <div class="h-3 w-48 mb-4 bg-white relative rounded-full">
      <div class="h-full bg-blue-400 border border-white rounded-full" :style="{ width: usedStorage }" />
    </div>
    <p>
      容量 1.2 GB / 10 GB
    </p>
  </div>
</template>

<script>
export default {
  props: {
    usedStorage: {
      type: String,
      required: false,
      default: '60%',
    },
  },
};
</script>

<style>
</style>
