<template>
  <div class="grid grid-cols-12 text-gray-700 text-xl font-bold">
    <div class="col-span-5 py-4 pl-4 flex">
      <img
        :src="require('@/assets/imgs/pdf@2x.png')"
        alt="file-type-logo"
        class="mr-8"
      >
      <span class="cursor-pointer">
        走吧 ! 一起用日語去旅行.docx
      </span>
    </div>
    <div class="col-span-2 py-4">
      <span>
        2020/10/07
      </span>
    </div>
    <div class="col-span-2 py-4">
      <span>
        3.2MB
      </span>
    </div>
    <div class="col-span-2 py-4">
      <span>
        RayLin
      </span>
    </div>
    <div class="col-span-1 py-4">
      <i class="fas fa-ellipsis-h cursor-pointer" />
    </div>
  </div>
</template>
