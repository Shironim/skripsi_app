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


const allCamera = await $fetch('/api/camera');
</script>
<template>
  <div>
    <CarouselBanner />
    <Categories />
    <section class="md:max-w-5xl mx-auto mb-12">
      <div class="flex">
        <div class="flex flex-row flex-wrap">
          <ComponentProduct :dataProduct="allCamera" />
        </div>
      </div>
    </section>
  </div>
</template>