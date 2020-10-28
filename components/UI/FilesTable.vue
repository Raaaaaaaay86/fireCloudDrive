<template>
  <div>
    <div class="mb-4 w-full flex justify-between items-center">
      <h2 class="font-bold text-2xl">
        {{ title }}
      </h2>
      <MoreInfo />
    </div>
    <div class="grid grid-cols-12 text-gray-800 text-xl font-bold">
      <div class="col-span-5 py-4 pl-4 border-b border-gray-400">
        名稱 ▼
      </div>
      <div class="col-span-2 py-4 border-b border-gray-400">
        上次修改
      </div>
      <div class="col-span-2 py-4 border-b border-gray-400">
        檔案大小
      </div>
      <div class="col-span-2 py-4 border-b border-gray-400">
        擁有者
      </div>
      <div class="col-span-1 py-4 border-b border-gray-400">
        更多
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import MoreInfo from '@/components/UI/MoreInfo';

export default {
  components: {
    MoreInfo,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
