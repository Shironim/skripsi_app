<script setup>
defineProps({
  dataProduct: {
    type: Array,
    required: true,
    default: []
  }
})
import { useToast } from 'tailvue'

const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;
const token = useCookie('token')

const $toast = useToast()
const alert = (type, msg) => {
  // Use sweetalert2
  $toast.show({
    type: type,
    message: msg,
    timeout: 3,
  });
}
const addKeranjang = async (id_produk) => {
  try {
    const { error } = useLazyFetch(`${baseApiUrl}/addcart`, {
      onRequest({ options }) {
        // Set the request headers
        options.headers = options.headers || {}
        options.headers.authorization = `Bearer ${token.value}`
      },
      method: 'POST',
      body: JSON.stringify(
        {
          id_produk: id_produk,
        })
    })
    if (!error) {
      alert('success', 'Berhasil ditambahkan ke keranjang')
    } else {
      if (error.value?.statusCode == 401) {
        alert('danger', 'Silahkan login terlebih dahulu')
      }
    }
  } catch (error) {
    console.log('log error', error)
  }
}

</script>
<template>
  <div v-for="(camera, index) in dataProduct" :key="index" class="basis-1/4 ">
    <div class="border rounded-md mr-3 mb-3 overflow-hidden">
      <figure>
        <NuxtImg :src="`${baseApiUrl}/${camera.thumbnail}`" :alt="camera.nama" class="mx-auto h-[180px]" height="180px"
          width="100%" fit="cover" />
      </figure>
      <figcaption class="flex flex-col">
        <div class="p-4">
          <h1 class="text-md">{{ camera.nama }}</h1>
          <p class="text-lg font-bold">Rp. {{ camera.harga }}K /Day</p>
        </div>
        <div class="flex border-t">
          <NuxtLink :to="`/detail/${camera.id_produk}`"
            class="basis-1/2 transition-all hover:bg-orange-400 hover:text-white">
            <button class="p-2 w-full text-md">
              <Icon name="tabler:camera-search" class="mx-2"></Icon>
              <span>Detail</span>
            </button>
          </NuxtLink>
          <button v-if="camera.status == 'tersedia'" @click="addKeranjang(camera.id_produk)"
            class="basis-1/2 hover:bg-red-400 hover:text-white p-2 w-full text-md">
            <Icon name="ic:baseline-shopping-cart" class="mx-2"></Icon>
            <span>Simpan</span>
          </button>
          <button v-if="camera.status == 'disewa'" @click="alert('danger', 'Kamera sedang disewa')"
            class="basis-1/2 hover:bg-red-400 hover:text-white p-2 w-full text-md">
            <Icon name="tabler:camera-x" class="mx-2"></Icon>
            <span>Disewa</span>
          </button>
        </div>
      </figcaption>
    </div>
  </div>
</template>