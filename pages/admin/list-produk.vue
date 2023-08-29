<script setup>
definePageMeta({
  layout: 'admin',
})
import { useToast } from 'tailvue'
const route = useRouter();
const $toast = useToast()
let { idUser } = inject('idUser')
const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;
const dataDate = ref();
const { data: produk, error, pending, refresh } = await useFetch(`${baseApiUrl}/produk`).catch((error) => error.data);
const alertDelete = () => {
  // Use sweetalert2
  $toast.show({
    type: 'danger',
    message: 'Berhasil dihapus',
    timeout: 3,
  });
}
const alertCheckout = () => {
  // Use sweetalert2
  $toast.show({
    type: 'success',
    message: 'Berhasil Checkout',
    timeout: 3,
  });
}
const fileInput = ref();
const modalShow = ref(false);
const kategori = ref('');

const dispKategori = computed(() => {
  switch (kategori.value) {
    case 'kamera_foto':
      return 'Kamera Foto';
    case 'kamera_video':
      return 'Kamera Video';
    case 'lensa':
      return 'Lensa';
    case 'tv_monitor':
      return 'TV/Monitors';
    case 'tripod':
      return 'Tripod';
    default:
      return 'Belum dipilih';
  }
});


const dataForm = reactive({})
const spesifikasi = ref({})

const changeCategori = (value) => {
  kategori.value = value;
  spesifikasi.value = {}
}
const changeFile = (event) => {
  fileInput.value = event.target.files[0];
}
watchEffect(() => {
  console.log('ini file', fileInput.value)
})
const handleAddProduk = async () => {
  try {
    await $fetch(`${baseApiUrl}/addproduct/`, {
      method: 'POST',
      body: JSON.stringify(
        {
          nama: dataForm.nama,
          merk: dataForm.brand,
          harga: dataForm.harga,
          thumbnail: "thumbnail",
          deskripsi: dataForm.deskripsi,
          type_produk: kategori.value,
          status: "tersedia",
        })
    })
    alertCheckout()
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <section class="">
    <div class="mt-4">
      <div class="bg-white dark:bg-gray-800 relative border sm:rounded-lg overflow-hidden">
        <div class="flex flex-col space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div class="mb-4">
            <h1 class="font-semibold text-xl">Data Produk</h1>
          </div>
          <div class="flex m-0 justify-between">
            <div class="w-full md:w-1/3">
              <form class="flex items-center">
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                      viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input type="text" id="simple-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search" required="">
                </div>
              </form>
            </div>
            <div
              class="w-full md:w-auto flex mr-4 flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button type="button" @click="modalShow = true"
                class="flex items-center justify-center border bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                <Icon name="octicon:plus-16" class="mr-2 self-center" size="20"></Icon>
                Add product
              </button>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3">Nama Produk</th>
                <th scope="col" class="px-4 py-3">Kategori</th>
                <th scope="col" class="px-4 py-3">Brand</th>
                <th scope="col" class="px-4 py-3">Harga</th>
                <th scope="col" class="px-4 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in produk.data" class="border-b dark:border-gray-700">
                <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ data.nama }}</th>
                <td class="px-4 py-3">
                  {{ data.type_produk }}
                </td>
                <td class="px-4 py-3">
                  {{ data.merk }}
                </td>
                <td class="px-4 py-3">Rp. {{ data.harga }}.000 </td>
                <td class="px-4 py-3 flex items-center justify-end">
                  <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown"
                    class="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                    type="button">
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                  <div id="apple-imac-27-dropdown"
                    class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="apple-imac-27-dropdown-button">
                      <li>
                        <a href="#"
                          class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                      </li>
                      <li>
                        <a href="#"
                          class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Update</a>
                      </li>
                    </ul>
                    <div class="py-1">
                      <a href="#"
                        class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  <div tabindex="-1" aria-hidden="true" :class="modalShow ? 'block bg-gray-800 bg-opacity-75' : 'hidden'"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full ">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto">
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Tambah Produk
          </h3>
          <button type="button" @click="modalShow = false"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only" @click="modalShow = false">Close modal</span>
          </button>
        </div>
        <div action="#">
          <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="text" name="nama" id="nama" v-model="dataForm.nama"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Nikon D700" required="">
            </div>
            <div>
              <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
              <input type="text" name="brand" id="brand" v-model="dataForm.brand"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Nikon / Sony" required="">
            </div>
            <div>
              <label for="harga" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga</label>
              <input type="number" name="harga" id="harga" v-model="dataForm.harga"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="120000" required="">
            </div>
            <div>
              <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori</label>
              <select id="category" @change="changeCategori($event.target.value)"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                <option selected="">Kategori</option>
                <option value="kamera_foto">Kamera Foto</option>
                <option value="lensa">Lensa</option>
                <option value="tv_monitor">TV/Monitors</option>
                <option value="tripod">Tripod</option>
              </select>
            </div>
            <div class="sm:col-span-2">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Gambar</label>
              <input @change="changeFile($event)" value="" ref="fileInput" name="thumbnail"
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input" type="file">
            </div>
            <div class="sm:col-span-2">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Spesifikasi {{
                dispKategori }}</label>
              <div v-if="kategori == 'kamera_foto'">
                <div class="flex space-x-4 mb-4">
                  <div class="basis-1/3">
                    <label for="dimensi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dimensions
                      (WxHxD)</label>
                    <input type="text" name="dimensi" id="dimensi" v-model="spesifikasi.dimensi"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="129.0 x 98.0 x 78.0 mm" required="">
                  </div>
                  <div class="basis-1/3">
                    <label for="weight"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weight</label>
                    <input type="text" name="weight" id="weight" v-model="spesifikasi.weight"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="500 gr" required="">
                  </div>
                  <div class="basis-1/3">
                    <label for="iso" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ISO</label>
                    <input type="text" name="iso" id="iso" v-model="spesifikasi.iso"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="400 x 6000" required="">
                  </div>
                </div>
                <div class="flex space-x-4">
                  <div class="basis-1/3">
                    <label for="shutter"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shutter</label>
                    <input type="text" name="shutter" id="shutter" v-model="spesifikasi.shutter"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="10 - 1/2000 seconds" required="">
                  </div>
                  <div class="basis-1/3">
                    <label for="file_format" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File
                      Formats</label>
                    <input type="text" name="file_format" id="file_format"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="JPEG / JPG" required="">
                  </div>
                  <div class="basis-1/3">
                    <label for="memory_card_type"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Memory Card Type</label>
                    <input type="text" name="memory_card_type" id="memory_card_type"
                      v-model="spesifikasi.memory_card_type"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="SD / SDHC" required="">
                  </div>
                </div>
              </div>
              <div v-if="kategori == 'lensa'">
                <div class="flex space-x-4 mb-4">
                  <div class="basis-1/3">
                    <label for="focal_length" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Focal
                      Length</label>
                    <input type="text" name="focal_length" id="focal_length" v-model="spesifikasi.focal_length"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="50 mm" required="">
                  </div>
                  <div class="basis-1/3">
                    <label for="img_stabilization"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Stabilization</label>
                    <input type="text" name="img_stabilization" id="img_stabilization"
                      v-model="spesifikasi.img_stabilization"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Tidak" required="">
                  </div>
                  <div class="basis-1/3">
                    <label for="auto_focus"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Autofocus</label>
                    <input type="text" name="auto_focus" id="auto_focus" v-model="spesifikasi.auto_focus"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Ya" required="">
                  </div>
                </div>
                <div class="flex space-x-4">
                  <div class="basis-1/3">
                    <label for="maks_apperture"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Maksimal Aperture</label>
                    <input type="text" name="maks_apperture" id="maks_apperture" v-model="spesifikasi.maks_apperture"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="F1.8" required="">
                  </div>
                  <div class="basis-1/3">
                    <label for="min_apperture"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Minimal Aperture</label>
                    <input type="text" name="min_apperture" id="min_apperture" v-model="spesifikasi.min_apperture"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="F16" required="">
                  </div>
                  <div class="basis-1/3">
                    <label for="apperture_ring"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Aperture Ring</label>
                    <input type="text" name="apperture_ring" id="apperture_ring" v-model="spesifikasi.apperture_ring"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Tidak" required="">
                  </div>
                </div>
              </div>
              <div v-if="kategori == 'tv_monitor'">
                <div class="flex space-x-4 mb-4">
                  <div class="basis-1/3">
                    <label for="screen_type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Screen
                      Type</label>
                    <input type="text" name="screen_type" id="screen_type" v-model="spesifikasi.screen_type"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="LCD" required="">
                  </div>
                  <div class="basis-1/3">
                    <label for="screen_size" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Screen
                      size</label>
                    <input type="text" name="screen_size" id="screen_size" v-model="spesifikasi.screen_size"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="55″ (139cm)" required="">
                  </div>
                  <div class="basis-1/3">
                    <label for="resolution"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Resolution</label>
                    <input type="text" name="resolution" id="resolution" v-model="spesifikasi.resolution"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="3840 x 2160" required="">
                  </div>
                </div>
                <div class="flex space-x-4">
                  <div class="basis-1/3">
                    <label for="dimensi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dimensi /
                      Ukuran </label>
                    <input type="text" name="maks_apperture" id="dimensi" v-model="spesifikasi.dimensi"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="1237mm x 259.2mm x775mm" required="">
                  </div>
                  <div class="basis-1/3">
                    <label for="refresh_rate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Field
                      Refresh Rate</label>
                    <input type="text" name="refresh_rate" id="refresh_rate" v-model="spesifikasi.refresh_rate"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="100" required="">
                  </div>
                  <div class="basis-1/3">
                    <label for="connections"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Connections</label>
                    <input type="text" name="connections" id="connections" v-model="spesifikasi.connections"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="HDMI, USB 2.0" required="">
                  </div>
                </div>
              </div>
              <div v-if="kategori == 'tripod'">
                <div class="flex space-x-4 mb-4">
                  <div class="basis-1/3">
                    <label for="panjang"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Panjang</label>
                    <input type="text" name="panjang" id="panjang" v-model="spesifikasi.panjang"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="3 meter" required="">
                  </div>
                  <div class="basis-1/3">
                    <label for="bahan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bahan</label>
                    <input type="text" name="bahan" id="bahan" v-model="spesifikasi.bahan"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Stainlestell" required="">
                  </div>
                </div>
              </div>
            </div>
            <div class="sm:col-span-2">
              <label for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi</label>
              <textarea id="description" rows="4" v-model="dataForm.deskripsi"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Deskripsi"></textarea>
            </div>
          </div>
          <button type="submit" @click="handleAddProduk"
            class="w-full border bg-green-500 font-semibold focus:ring-4 focus:outline-none focus:ring-primary-300 text-white rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            <Icon name="ic:round-add" size="24" class="mr-2 text-white" />
            <span class="text-white font-semibold">Tambah</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>