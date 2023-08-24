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
  <!-- dibuat paralax, info branding sebagai penyedia sewa kamera di semarang -->
  <ParallaxBanner />
  <!-- Branding ADMS Foto video => 2 grid, video + menyediakan jasa apa saja -->
  <!-- <section id="sediakan" class="md:max-w-5xl mx-auto">
    <div class="flex mb-16">
      <div class="basis-full">
        <div class="text-center pt-16 pb-20">
          <h1 class="text-4xl font-semibold pb-2">Kami Sediakan Kebutuhan Anda</h1>
          <p class="text-xl pb-2">Peralatan Kamera Foto, Video, Jasa Foto, Editing</p>
        </div>
        <div class="aspect-w-16 aspect-h-9">
          <iframe src="https://www.youtube.com/embed/5qap5aO4i9A" width="100%" height="600px" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </section> -->
  <!-- Kategori Pilihan (Tokped) (2 baris => 6 item) -->
  <Categories />
  <!-- <Search /> -->
  <section class="md:max-w-5xl mx-auto px-4">
    <div class="flex mb-12">
      <div class="flex flex-row flex-wrap">
        <ComponentProduct :dataProduct="allCamera" />
      </div>
    </div>
  </section>
</template>