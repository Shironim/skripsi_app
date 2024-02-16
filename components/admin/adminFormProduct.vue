<script setup>
import { useUtils } from "@comps/useUtils";
import { useUpload } from "@comps/useUpload";

const props = defineProps({
  modalShow: {
    type: Boolean,
    required: true,
  },
  dataForm: {
    type: Object,
    required: true,
    default: {},
  },
  kategori: {
    type: String,
    required: true,
    default: "",
  },
  spesifikasi: {
    type: Object,
    required: true,
    default: {},
  },
  stats: {
    type: String,
  },
});

const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;
const fileInput = ref({});
const selectedCategory = computed(() => {
  return props.kategori || "";
})

const emit = defineEmits(["closeModal", "changeCategori"]);

const allKategori = [
  {
    value: "kamera",
    label: "Kamera Foto",
  },
  {
    value: "lensa",
    label: "Lensa",
  },
  {
    value: "tripod",
    label: "Tripod",
  },
  {
    value: "kabel",
    label: "Kabel",
  },
  {
    value: "camcorder",
    label: "Camcorder",
  },
];
const dispKategori = computed(() => {
  switch (selectedCategory.value) {
    case "kamera":
      return "Kamera Foto";
    case "lensa":
      return "Lensa";
    case "tv_monitor":
      return "TV/Monitors";
    case "tripod":
      return "Tripod";
    case "kabel":
      return "Kabel";
    case "camcorder":
      return "Camcorder";
    default:
      return "Belum dipilih";
  }
});
const changeCategori = (value) => {
  selectedCategory.value = value;
  emit("changeCategori");
};
const selectFile = async (event) => {
  fileInput.value = event.target.files[0];
};
const { capitalizeFirstLetter, renameFile } = useUtils();
const { handleUpload } = useUpload();

const editProduk = async () => {
  console.log("editProduk called");
  try {
    if (fileInput.value.name === undefined) {
      await $fetch(`${baseApiUrl}/produk`, {
        method: "PATCH",
        body: JSON.stringify({
          idProduk: props.dataForm.id_produk,
          nama: props.dataForm.nama,
          merk: props.dataForm.merk,
          harga: props.dataForm.harga,
          deskripsi: props.dataForm.deskripsi,
          type_produk: selectedCategory.value,
          focal_length: props.spesifikasi.focal_length || null,
          spesifikasi: props.spesifikasi,
        }),
      });
    } else {
      await $fetch(`${baseApiUrl}/produk`, {
        method: "PATCH",
        body: JSON.stringify({
          idProduk: props.dataForm.id_produk,
          nama: props.dataForm.nama,
          merk: props.dataForm.merk,
          harga: props.dataForm.harga,
          deskripsi: props.dataForm.deskripsi,
          type_produk: selectedCategory.value,
          focal_length: props.spesifikasi.focal_length || null,
          spesifikasi: props.spesifikasi,
          thumbnail: renameFile(fileInput.value.name),
        }),
      });
      await handleUpload(fileInput.value, baseApiUrl);
    }
    emit("closeModal");
    fileInput.value = {};
  } catch (error) {
    console.log(error);
  }
};

const handleAddProduk = async () => {
  try {
    await $fetch(`${baseApiUrl}/addproduct/`, {
      method: "POST",
      body: JSON.stringify({
        nama: props.dataForm.nama,
        merk: props.dataForm.merk,
        harga: props.dataForm.harga,
        deskripsi: props.dataForm.deskripsi,
        type_produk: selectedCategory.value,
        focal_length: props.spesifikasi.focal_length || null,
        status: "tersedia",
        spesifikasi: props.spesifikasi,
        thumbnail: renameFile(fileInput.value.name),
      }),
    }).then((res) => {
      console.log(res);
    });
    await handleUpload(fileInput.value, baseApiUrl);
    fileInput.value = {};
    emit("closeModal");
  } catch (error) {
    console.log(error);
  }
};

</script>
<template>
  <form
    id="formElem"
    @submit.prevent="
      stats == 'add' ? handleAddProduk() : editProduk(props.dataForm.id_produk)
    "
    enctype="multipart/form-data"
    class="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto"
  >
    <div
      class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
    >
      <div
        class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ capitalizeFirstLetter(stats) }} Produk
        </h3>
        <button
          type="button"
          @click="$emit('closeModal')"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only" @click="$emit('closeModal')">Close modal</span>
        </button>
      </div>
      <div action="#">
        <div class="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Name</label
            >
            <input
              type="text"
              name="nama"
              id="nama"
              v-model="dataForm.nama"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Nikon D700"
              required=""
              :disabled="stats == 'detail' ? true : false"
              :class="stats === 'detail' ? 'hover:cursor-not-allowed' : ''"
            />
          </div>
          <div>
            <label
              for="merk"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Brand</label
            >
            <input
              type="text"
              name="merk"
              id="merk"
              v-model="dataForm.merk"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Nikon / Sony"
              required=""
              :disabled="stats == 'detail' ? true : false"
              :class="stats === 'detail' ? 'hover:cursor-not-allowed' : ''"
            />
          </div>
          <div>
            <label
              for="harga"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Harga</label
            >
            <input
              type="number"
              name="harga"
              id="harga"
              v-model="dataForm.harga"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="120000"
              required=""
              :disabled="stats == 'detail' ? true : false"
              :class="stats === 'detail' ? 'hover:cursor-not-allowed' : ''"
            />
          </div>
          <div>
            <label
              for="category"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Kategori</label
            >
            <select
              id="category"
              :disabled="stats == 'detail' ? true : false"
              @change="changeCategori($event.target.value)"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option>Kategori</option>
              <option
                v-for="(item, index) in allKategori"
                :key="index"
                :value="item.value"
                :selected="item.value == props.kategori ? true : false"
              >
                {{ item.label }}
              </option>
            </select>
          </div>
          <div class="sm:col-span-2">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              <span v-if="stats == 'add' || stats == 'edit'"
                >Upload Gambar</span
              >
              <span v-else>Gambar</span>
            </label>
            <input
              v-if="stats == 'add' || stats == 'edit'"
              @change="selectFile($event)"
              ref="file"
              name="file"
              id="file"
              type="file"
              accept="image/*"
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />

            <NuxtImg
              class="w-1/2 border rounded mt-4"
              v-if="stats == 'detail' || stats == 'edit'"
              :src="`${baseApiUrl}/${props.dataForm.thumbnail}`"
              alt=""
            />
          </div>
          <div class="sm:col-span-2">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
              >Spesifikasi {{ dispKategori }}</label
            >
            <div v-if="selectedCategory == 'kamera'">
              <div class="flex space-x-4 mb-4">
                <div class="basis-1/3">
                  <label
                    for="dimensi"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Dimensions (WxHxD)</label
                  >
                  <input
                    type="text"
                    name="dimensi"
                    id="dimensi"
                    v-model="spesifikasi.dimensi"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="129.0 x 98.0 x 78.0 mm"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
                <div class="basis-1/3">
                  <label
                    for="weight"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Weight</label
                  >
                  <input
                    type="text"
                    name="weight"
                    id="weight"
                    v-model="spesifikasi.weight"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="500 gr"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
                <div class="basis-1/3">
                  <label
                    for="iso"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >ISO</label
                  >
                  <input
                    type="text"
                    name="iso"
                    id="iso"
                    v-model="spesifikasi.iso"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="400 x 6000"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
              </div>
              <div class="flex space-x-4">
                <div class="basis-1/3">
                  <label
                    for="shutter"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Shutter</label
                  >
                  <input
                    type="text"
                    name="shutter"
                    id="shutter"
                    v-model="spesifikasi.shutter"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="10 - 1/2000 seconds"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
                <div class="basis-1/3">
                  <label
                    for="file_format"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >File Formats</label
                  >
                  <input
                    type="text"
                    name="file_format"
                    id="file_format"
                    v-model="spesifikasi.file_format"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="JPEG / JPG"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
                <div class="basis-1/3">
                  <label
                    for="memory_card_type"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Memory Card Type</label
                  >
                  <input
                    type="text"
                    name="memory_card_type"
                    id="memory_card_type"
                    v-model="spesifikasi.memory_card_type"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="SD / SDHC"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
              </div>
            </div>
            <div v-if="selectedCategory == 'camcorder'">
              <div class="flex space-x-4 mb-4">
                <div class="basis-1/3">
                  <label
                    for="dimensi"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Dimensions (WxHxD)</label
                  >
                  <input
                    type="text"
                    name="dimensi"
                    id="dimensi"
                    v-model="spesifikasi.dimensi"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="129.0 x 98.0 x 78.0 mm"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
                <div class="basis-1/3">
                  <label
                    for="weight"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Weight</label
                  >
                  <input
                    type="text"
                    name="weight"
                    id="weight"
                    v-model="spesifikasi.weight"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="500 gr"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
                <div class="basis-1/3">
                  <label
                    for="iso"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >ISO</label
                  >
                  <input
                    type="text"
                    name="iso"
                    id="iso"
                    v-model="spesifikasi.iso"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="400 x 6000"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
              </div>
              <div class="flex space-x-4">
                <div class="basis-1/3">
                  <label
                    for="shutter"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Shutter</label
                  >
                  <input
                    type="text"
                    name="shutter"
                    id="shutter"
                    v-model="spesifikasi.shutter"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="10 - 1/2000 seconds"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
                <div class="basis-1/3">
                  <label
                    for="file_format"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >File Formats</label
                  >
                  <input
                    type="text"
                    name="file_format"
                    id="file_format"
                    v-model="spesifikasi.file_format"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="JPEG / JPG"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
                <div class="basis-1/3">
                  <label
                    for="memory_card_type"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Memory Card Type</label
                  >
                  <input
                    type="text"
                    name="memory_card_type"
                    id="memory_card_type"
                    v-model="spesifikasi.memory_card_type"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="SD / SDHC"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
              </div>
            </div>
            <div v-if="selectedCategory == 'lensa'">
              <div class="flex space-x-4 mb-4">
                <div class="basis-1/3">
                  <label
                    for="focal_length"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Focal Length</label
                  >
                  <input
                    type="text"
                    name="focal_length"
                    id="focal_length"
                    v-model="spesifikasi.focal_length"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="50 mm"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
                <div class="basis-1/3">
                  <label
                    for="img_stabilization"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Image Stabilization</label
                  >
                  <input
                    type="text"
                    name="img_stabilization"
                    id="img_stabilization"
                    v-model="spesifikasi.img_stabilization"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="Tidak"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
                <div class="basis-1/3">
                  <label
                    for="auto_focus"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Autofocus</label
                  >
                  <input
                    type="text"
                    name="auto_focus"
                    id="auto_focus"
                    v-model="spesifikasi.auto_focus"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="Ya"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
              </div>
              <div class="flex space-x-4">
                <div class="basis-1/3">
                  <label
                    for="maks_apperture"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Maksimal Aperture</label
                  >
                  <input
                    type="text"
                    name="maks_apperture"
                    id="maks_apperture"
                    v-model="spesifikasi.maks_apperture"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="F1.8"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
                <div class="basis-1/3">
                  <label
                    for="min_apperture"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Minimal Aperture</label
                  >
                  <input
                    type="text"
                    name="min_apperture"
                    id="min_apperture"
                    v-model="spesifikasi.min_apperture"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="F16"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
                <div class="basis-1/3">
                  <label
                    for="apperture_ring"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Aperture Ring</label
                  >
                  <input
                    type="text"
                    name="apperture_ring"
                    id="apperture_ring"
                    v-model="spesifikasi.apperture_ring"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="Tidak"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
              </div>
            </div>
            <div v-if="selectedCategory == 'kabel'">
              <div class="flex space-x-4 mb-4">
                <div class="basis-1/3">
                  <label
                    for="panjang"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Panjang</label
                  >
                  <input
                    type="text"
                    name="panjang"
                    id="panjang"
                    v-model="spesifikasi.panjang"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="10 M"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
              </div>
            </div>
            <div v-if="selectedCategory == 'tripod'">
              <div class="flex space-x-4 mb-4">
                <div class="basis-1/3">
                  <label
                    for="panjang"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Panjang</label
                  >
                  <input
                    type="text"
                    name="panjang"
                    id="panjang"
                    v-model="spesifikasi.tinggi_maksimum"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="3 meter"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
                <div class="basis-1/3">
                  <label
                    for="bahan"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Bahan</label
                  >
                  <input
                    type="text"
                    name="bahan"
                    id="bahan"
                    v-model="spesifikasi.bahan"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    :class="
                      stats === 'detail' ? 'hover:cursor-not-allowed' : ''
                    "
                    placeholder="Stainlestell"
                    required=""
                    :disabled="stats == 'detail' ? true : false"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="sm:col-span-2">
            <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Deskripsi</label
            >
            <textarea
              id="description"
              rows="6"
              v-model="dataForm.deskripsi"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              :disabled="stats == 'detail' ? true : false"
              :class="stats === 'detail' ? 'hover:cursor-not-allowed' : ''"
              placeholder="Deskripsi"
            ></textarea>
          </div>
        </div>
        <button
          v-if="stats == 'add' || stats == 'edit'"
          type="submit"
          class="w-full border bg-green-500 font-semibold focus:ring-4 focus:outline-none focus:ring-primary-300 text-white rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <Icon name="ic:round-add" size="24" class="mr-2 text-white" />
          <span v-if="stats === 'add'" class="text-white font-semibold"
            >Tambah</span
          >
          <span v-if="stats === 'edit'" class="text-white font-semibold"
            >Perbarui</span
          >
        </button>
      </div>
    </div>
  </form>
</template>
