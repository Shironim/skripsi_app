<script setup>
definePageMeta({
  layout: 'default',
})
useHead({
  title: 'AD/MS',
  meta: [
    { name: 'description', content: 'Persewaan Kamera' }
  ]
})

import { useToast, useModal } from 'tailvue'
const $toast = useToast()
const $modal = useModal()
const showAlert = () => {
  // Use sweetalert2
  $toast.show('this is a test');
  $modal.show('this is a test');
}

const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;
const allCamera = await $fetch(`${baseApiUrl}/produk`).catch((error) => error.data);
</script>
<template>
  <ParallaxBanner />
  <Categories />
  <section class="md:max-w-5xl mx-auto px-4">
    <div class="flex mb-12">
      <div class="flex flex-row flex-wrap">
        <ComponentProduct :dataProduct="allCamera.data" />
      </div>
    </div>
  </section>
</template>