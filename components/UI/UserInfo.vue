<template>
  <div class="mt-auto flex flex-col items-center text-white">
    <div class="mb-4 flex items-center justify-center">
      <div
        id="avatar"
        class="h-20 w-20 mr-2 rounded-full bg-cover bg-center"
        :style="'backgroundImage:' + 'url(' + require('@/assets/imgs/avatar.jpg') + ')'"
      />
      <div>
        <p class="font-bold text-xl">
          Ray Lin
        </p>
        <span>
          Test Account
        </span>
      </div>
    </div>
    <div class="h-3 w-48 mb-4 bg-white relative rounded-full">
      <div class="h-full bg-blue-400 border border-white rounded-full" :style="{ width: usedProportion }" />
    </div>
    <p>
      容量 {{ usedStorage | fileSize }} / {{ 10240000000 | fileSize }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    usedStorage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    usedProportion() {
      let percent = this.usedStorage / 10240000000;
      if (percent < 1) percent = 10;
      return `${percent}%`;
    },
  },
};
</script>

<style>
</style>
