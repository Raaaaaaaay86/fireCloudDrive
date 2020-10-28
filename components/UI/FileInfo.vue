<template>
  <div class="grid grid-cols-12 text-gray-700 text-xl font-bold">
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
    <div class="col-span-1 py-4">
      <i class="fas fa-ellipsis-h cursor-pointer" />
    </div>
  </div>
</template>

<script>
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
  methods: {
    deleteFile() {
      const key = '-MKi9Wa0s2tn4_Y0Cd0w';
      this.$store.dispatch('storage/deleteFile', key);
    },
  },
};
</script>
