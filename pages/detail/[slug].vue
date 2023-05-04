<script setup>
  // route for detail route info
  const route = useRoute();
  // router for navigation
  // const router = useRouter();
  // console.log(router.install)
  // console.log('fullPath', route.fullPath)
  // console.log('hash', route.hash)
  // console.log('params', route.params)
  const data = await $fetch('/api/camera');
  const cameras = data.filter((camera) => camera.slug === route.params.slug);
  // console.log(cameras)
</script>
<template>
  <div>
    <div class="grid grid-cols-3">
      <div>
        <figure>
          <img :src="cameras[0].img" :alt="cameras[0].name">
        </figure>
      </div>
      <div>
        <h2>{{ cameras[0].name }}</h2>
        <p>
          Biaya sewa per hari: Rp. {{ cameras[0].priceDay }}
        </p>
      </div>
    </div>
  </div>
</template>