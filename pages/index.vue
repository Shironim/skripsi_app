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

// import { useToast, useModal } from 'tailvue'
// const $toast = useToast()
// const $modal = useModal()
// const showAlert = () => {
//   // Use sweetalert2
//   $toast.show('this is a test');
//   $modal.show('this is a test');
// }

const kategori = ref('')

const changeKategori = (val) => {
  // console.log('changekatgeori called')
  // console.log('val :', val)
  kategori.value = val
}

const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;
// // const allCamera = await $fetch(`${baseApiUrl}/produk`).catch((error) => error.data);
const { data: camera, error } = await useAsyncData(
  'camera',
  () => $fetch(`/produk`, {
    method: 'GET',
    baseURL: `${baseApiUrl}`,
  })
);
const data = computed(() => {
  // check if kategori and search is not empty
  if (kategori.value && search.value) {
    return camera.value.data.filter((data) => {
      return data.type_produk == kategori.value && data.nama.toLowerCase().includes(search.value.toLowerCase())
    })
    // check if kategori is not empty
  } else if (kategori.value) {
    return camera.value.data.filter((data) => {
      return data.type_produk == kategori.value
    })
    // check if search is not empty
  } 
  // else if (search.value) {
  //   return camera.value.data.filter((data) => {
  //     return data.nama.toLowerCase().includes(search.value.toLowerCase())
  //   })
  // } 
  // if all empty then return all data
  else {
    return camera.value.data
  }
})

watchEffect(()=>{
  if (error.value != null) {
    console.log('error /produk : ', error.value)
  }
})

// if (error) {
//   console.log('error /produk : ', error.value)
// }
</script>
<template>
  <ParallaxBanner />
  <Categories @change-kategori="changeKategori" />
  <section class="md:max-w-5xl mx-auto px-4">
    <div class="mb-12">
      <div class="flex flex-row flex-wrap">
        <client-only placeholder=" loading...">
          <ComponentProduct :dataProduct="data" />
        </client-only>
      </div>
    </div>
  </section>
  <Footer />
</template>