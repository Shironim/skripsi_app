<script setup>
defineProps({
  dataProduct: {
    type: Array,
    required: true
  }
})
</script>
<template>
  <div v-for="(camera, index) in dataProduct" :key="index" class="basis-1/4 ">
    <div class="border rounded-md mr-3 mb-3 overflow-hidden">
      <figure>
        <NuxtImg :src="camera.img" :alt="camera.name" class="mx-auto lg:min-h-[180px] xl:min-h-[180px]" height="180px" width="100%" fit="cover" />
      </figure>
      <figcaption class="flex flex-col">
        <div class="p-4">
          <h1 class="text-md">{{ camera.name }}</h1>
          <p class="text-lg font-bold">Rp. {{ camera.priceDay }}K /Day</p>
        </div>
        <div class="flex border-t">
          <NuxtLink :to="`detail/${camera.slug}`" class="basis-1/2 transition-all hover:bg-orange-400 hover:text-white">
            <button class="p-2 w-full text-md"> 
              <Icon name="tabler:camera-search" class="mx-2"></Icon>
              <span>Detail</span>
            </button>
          </NuxtLink>
          <NuxtLink :to="`detail/${camera.slug}`" class="basis-1/2 transition-all hover:bg-red-400 hover:text-white">
            <button class=" hover:border-red-400 p-2 w-full text-md"> 
              <Icon name="material-symbols:shopping-cart" class="mx-2"></Icon>
              <span>Simpan</span>  
            </button>
          </NuxtLink>
        </div>
      </figcaption>
    </div>
  </div>
</template>