<script setup>

definePageMeta({
  layout: "default",
});

useHead({
  title: "AD/MS",
  meta: [{ name: "description", content: "Persewaan Kamera" }],
});

// import { useToast, useModal } from 'tailvue'
// const $toast = useToast()
// const $modal = useModal()
// const showAlert = () => {
//   // Use sweetalert2
//   $toast.show('this is a test');
//   $modal.show('this is a test');
// }

const page = ref(1);
const limit = ref(8);
const kategori = ref("");

const changeKategori = (val) => {
  kategori.value = val;
};

const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;
const {
  data: listProduk,
  pending,
  error,
  refresh,
} = await useFetch(`/produk`, {
  method: "GET",
  baseURL: baseApiUrl,
});

const list = computed(() => {
  return listProduk.value.data.slice(startIndex.value, endIndex.value);
});

const filteredList = computed(() => {
  // check if kategori and search is not empty
  // check if kategori is not empty
  if (kategori.value) {
    return listProduk.value.data.filter((data) => {
      return data.type_produk == kategori.value;
    });
  }
  return list.value;
});

const totalListProduk = computed(() => {
  if (kategori.value !== "" && kategori.value !== undefined) {
    return filteredList.value.length;
  } else {
    return listProduk.value.data?.length;
  }
});

const totalPage = computed(() => {
  if (kategori.value !== "" && kategori.value !== undefined) {
    return Math.ceil(filteredList.value.length / limit.value);
  }
  return Math.ceil(listProduk.value?.data?.length / limit.value);
});
const startIndex = computed(() => {
  return (page.value - 1) * limit.value;
});
const endIndex = computed(() => {
  if (kategori.value !== "" && kategori.value !== undefined) {
    return totalListProduk.value;
  } else if (listProduk.value.data?.length < page.value * limit.value) {
    return listProduk.value.data?.length;
  } else {
    return page.value * limit.value;
  }
});

watchEffect(() => {
  if (error.value != null) {
    console.log("error /produk : ", error.value);
  }
  console.log("baseApiUrl", baseApiUrl)
});
// console.log("filteredList : ", filteredList.value);
// console.log("kategori : ", kategori.value);
// if (error) {
//   console.log('error /produk : ', error.value)
// }
</script>
<template>
  <ParallaxBanner />
  <Categories :kategori="kategori" @change-kategori="changeKategori" />
  <section class="md:max-w-5xl mx-auto px-4">
    <div class="mb-12">
      <div class="flex flex-row flex-wrap">
        <client-only placeholder=" loading...">
          <div v-for="(produk, index) in filteredList" class="basis-1/4">
            <ComponentProduct :dataProduct="produk" :key="index" />
          </div>
        </client-only>
      </div>
    </div>
    <nav
      class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
      aria-label="Table navigation"
    >
      <div>
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing
          <span class="font-semibold text-gray-900 dark:text-white"
            >{{ startIndex + 1 }} - {{ endIndex }}</span
          >
          of
          <span class="font-semibold text-gray-900 dark:text-white">{{
            totalListProduk
          }}</span>
        </span>
      </div>
      <ul class="inline-flex items-stretch -space-x-px">
        <li>
          <button
            @click="page -= 1"
            class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Previous</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </li>
        <li v-for="index in totalPage" @click="page = index">
          <button
            class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
            :class="page != index ? 'bg-slate-200' : 'bg-white font-bold'"
          >
            {{ index }}
          </button>
        </li>
        <li>
          <button
            @click="page += 1"
            class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Next</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewbox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  </section>
</template>
