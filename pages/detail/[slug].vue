<script setup>
import { useToast } from 'tailvue'
const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;
const token = useCookie('token')
// route for detail route info
const route = useRoute();
const $toast = useToast()
const alert = (type, msg) => {
  // Use sweetalert2
  $toast.show({
    type: type,
    message: msg,
    timeout: 3,
  });
}
// fetch all camera
const allCamera = await $fetch(`${baseApiUrl}/produk`).catch((error) => error.data);

const { data: camera, error } = await useAsyncData(
  'camera',
  () => $fetch(`/produk/${route.params.slug}`, {
    method: 'GET',
    baseURL: `${baseApiUrl}`,
  }), {
  watch: [
    route,
  ]
});
// const camera = await $fetch(`${baseApiUrl}/produk/${route.params.slug}`).catch((error) => error.data);

const spesifikasi = JSON.parse(camera.value.data[0].spesifikasi_detail);

const rekomendasi = allCamera.data.filter((recomen) => {
  return recomen.type_produk == camera.value.data[0].type_produk
})

watchEffect(() => {
  if (error.value != null) {
    console.log('error :', error.value)
  }
})

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
  <div class="">
    <section class="md:max-w-5xl mx-auto py-8">
      <h1 class="text-2xl font-semibold pb-4">{{ camera.data[0].nama }}</h1>
      <div class="flex pb-6">
        <div class="basis-3/12">
          <figure>
            <img :src="`${baseApiUrl}/${camera.data[0].thumbnail}`" :alt="camera.data[0].nama">
          </figure>
        </div>
        <div class="basis-6/12 bg-white py-2 rounded-md">
          <div class="flex mb-4 px-3 ">
            <p class="font-semibold text-lg flex border-b-2 pb-2 border-gray-400">
              <Icon class="self-center" name="material-symbols:android-camera"></Icon>
              <span class="ml-2 self-center">Spesifikasi</span>
            </p>
          </div>
          <div class="px-3">
            <div class="block">
              <div>
                <table class="table" v-if="camera.data[0].type_produk == 'tripod'">
                  <tr>
                    <th class="text-start p-2 border">Tinggi Maksimum</th>
                    <th class="text-end p-2 border">{{ spesifikasi.tinggi_maksimum }}</th>
                  </tr>
                  <tr>
                    <th class="text-start p-2 border">Bahan</th>
                    <th class="text-end p-2 border">{{ spesifikasi.bahan }}</th>
                  </tr>
                </table>
                <table class="table" v-if="camera.data[0].type_produk == 'kamera_foto'">
                  <tr>
                    <th class="text-start p-2 border">ISO</th>
                    <th class="text-end p-2 border">{{ spesifikasi.iso }}</th>
                  </tr>
                  <tr>
                    <th class="text-start p-2 border">Shutter</th>
                    <th class="text-end p-2 border">{{ spesifikasi.shutter }}</th>
                  </tr>
                  <tr>
                    <th class="text-start p-2 border">File Format</th>
                    <th class="text-end p-2 border">{{ spesifikasi.file_format }}</th>
                  </tr>
                  <tr>
                    <th class="text-start p-2 border">Memory Card Type</th>
                    <th class="text-end p-2 border">{{ spesifikasi.memory_card_type }}</th>
                  </tr>
                  <tr>
                    <th class="text-start p-2 border">Dimensi</th>
                    <th class="text-end p-2 border">{{ spesifikasi.dimensi }}</th>
                  </tr>
                  <tr>
                    <th class="text-start p-2 border">Berat</th>
                    <th class="text-end p-2 border">{{ spesifikasi.weight }}</th>
                  </tr>
                </table>
                <table class="table" v-if="camera.data[0].type_produk == 'lensa_kamera'">
                  <tr>
                    <th class="text-start p-2 border">Focal Length</th>
                    <th class="text-end p-2 border">{{ spesifikasi.focal_length }}</th>
                  </tr>
                  <tr>
                    <th class="text-start p-2 border">Image Stabilization</th>
                    <th class="text-end p-2 border">{{ spesifikasi.img_stabilization }}</th>
                  </tr>
                  <tr>
                    <th class="text-start p-2 border">Auto Focus</th>
                    <th class="text-end p-2 border">{{ spesifikasi.auto_focus }}</th>
                  </tr>
                  <tr>
                    <th class="text-start p-2 border">Maks Apperture</th>
                    <th class="text-end p-2 border">{{ spesifikasi.maks_apperture }}</th>
                  </tr>
                  <tr>
                    <th class="text-start p-2 border">Min Apperture</th>
                    <th class="text-end p-2 border">{{ spesifikasi.min_apperture }}</th>
                  </tr>
                  <tr>
                    <th class="text-start p-2 border">Apperture Ring</th>
                    <th class="text-end p-2 border">{{ spesifikasi.apperture_ring }}</th>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="basis-3/12 ">
          <div class="rounded-md border px-3 py-4">
            <h2 class="font-bold text-lg mb-4">Informasi Produk</h2>
            <div class="mb-3 ">
              <div class="pb-2">
                <div class="flex justify-between">
                  <p class="text-md self-center">Status</p>
                  <p v-if="camera.data[0].status == 'tersedia'"
                    class="text-md bg-green-400 px-3 py-1 rounded-lg font-semibold text-white">Tersedia</p>
                  <p v-if="camera.data[0].status == 'disewa'"
                    class="text-md bg-red-400 px-3 py-1 rounded-lg font-semibold text-white">Disewa</p>
                </div>
              </div>
              <div class="flex justify-between">
                <p class="text-md font-semibold">Harga Sewa</p>
                <p class="text-md font-semibold">{{ camera.data[0].harga }} K / Day</p>
              </div>
            </div>
            <div class="flex flex-col gap-y-4 mb-2">
              <button type="button"
                class="btn border font-semibold rounded-md  text-white px-2 py-1"
                :class="camera.data[0].status == 'disewa' ? 'bg-red-400' : 'bg-orange-400'">
                <div v-if="camera.data[0].status == 'tersedia'" @click="addKeranjang(camera.data[0].id_produk)">
                  <Icon name="ion:cart" size="24px"></Icon>
                  <span class="self-center ml-2">Simpan</span>
                </div>
                <div v-else>
                  <!-- <Icon name="ion:cart" size="24px"></Icon> -->
                  <span class="self-center ml-2">Masih Disewa</span>
                </div>
              </button>
            </div>
            <div class="flex flex-col gap-y-4">
              <button class="btn border font-semibold rounded-md bg-green-400 text-white px-2 py-1">
                <Icon name="ion:cart" size="24px"></Icon>
                <span class="self-center ml-2">Tanya Chatbot</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row">
        <div class="basis-10/12 bg-white py-2 rounded-md">
          <div class="font-semibold text-lg flex pb-4">
            <div class="border-b-2 pb-2 border-gray-400">
              <Icon class="self-center" name="akar-icons:shipping-box-02"></Icon>
              <span class="ml-2 self-center">Deskripsi</span>
            </div>
          </div>
          <p>{{ camera.data[0].deskripsi }}</p>
        </div>
      </div>
    </section>
  </div>
  <section class="md:max-w-5xl mx-auto">
    <div class="my-8 p-4">
      <h2 class="mb-4 font-bold text-xl">Rekomendasi</h2>
      <div class="flex">
        <ComponentProduct :dataProduct="rekomendasi" />
      </div>
    </div>
  </section>
</template>