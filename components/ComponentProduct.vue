<script setup>
defineProps({
  dataProduct: {
    type: Array,
    required: true
  }
})
import { useToast } from 'tailvue'
let { idUser } = inject('idUser')
const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;

const $toast = useToast()
const alertDisewa = () => {
  // Use sweetalert2
  $toast.show({
    type: 'danger',
    message: 'Alat ini sedang disewa',
    timeout: 3,
  });
}
const alertKeranjang = () => {
  // Use sweetalert2
  $toast.show({
    type: 'success',
    message: 'Berhasil ditambahkan ke keranjang',
    timeout: 3,
  });
}
const alertLogin = () => {
  // Use sweetalert2
  $toast.show({
    type: 'info',
    message: 'Anda belum login',
    timeout: 3,
  });
}
const addKeranjang = async (id_produk) => {
  if (idUser.value) {
    try {
      await $fetch(`${baseApiUrl}/addcart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            id_user: idUser.value,
            id_produk: id_produk,
          })
      })
      alertKeranjang()
    } catch (error) {
      console.log(error)
    }
  }else{
    alertLogin()
  }

}

</script>
<template>
  <div v-for="(camera, index) in dataProduct" :key="index" class="basis-1/4 ">
    <div class="border rounded-md mr-3 mb-3 overflow-hidden">
      <figure>
        <NuxtImg :src="`${baseApiUrl}/${camera.thumbnail}`" :alt="camera.nama" class="mx-auto h-[180px]"
          height="180px" width="100%" fit="cover" />
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
          <button v-if="camera.status == 'disewa'" @click="alertDisewa"
            class="basis-1/2 hover:bg-red-400 hover:text-white p-2 w-full text-md">
            <Icon name="tabler:camera-x" class="mx-2"></Icon>
            <span>Disewa</span>
          </button>
        </div>
      </figcaption>
    </div>
  </div>
</template>