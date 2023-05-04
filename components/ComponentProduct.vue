<script setup>
defineProps({
  dataProduct: {
    type: Array,
    required: true
  }
})
</script>
<template>
  <div v-for="(camera, index) in dataProduct" :key="index" class="basis-1/4">
    <div class="border rounded-xl m-2">
      <figure>
        <NuxtImg :src="camera.img" :alt="camera.name" fit="cover" />
      </figure>
      <figcaption class="flex flex-col">
        <div class="p-4">
          <h1 class="text-lg font-bold">{{ camera.name }}</h1>
          <p class="text-sm">Rp. {{ camera.priceDay }} / Hari</p>
        </div>
        <NuxtLink :to="`detail/${camera.slug}`" class="mt-auto">
          <button class="border p-2 rounded-md text-md"> Detail </button>
        </NuxtLink>
      </figcaption>
    </div>
  </div>
</template>