<script setup>
definePageMeta({
  layout: "admin",
});
import { useToast } from "tailvue";
import { usePagination } from "@comps/usePagination";
import { useFormatCurrency } from "@comps/useFormatCurrency";

const route = useRouter();
const $toast = useToast();
let { idUser } = inject("idUser");
const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;
const dataDate = ref();

const page = ref(1);
const limit = ref(5);

const {
  data: produk,
  pending,
  error,
  refresh,
} = await useFetch(`/produk`, {
  query: { page, limit },
  method: "GET",
  baseURL: baseApiUrl,
});

const alertDelete = () => {
  // Use sweetalert2
  $toast.show({
    type: "danger",
    message: "Berhasil dihapus",
    timeout: 3,
  });
};
const alertCheckout = () => {
  // Use sweetalert2
  $toast.show({
    type: "success",
    message: "Berhasil Checkout",
    timeout: 3,
  });
};
const { formatCurrencyIDR } = useFormatCurrency();

const modalShow = ref(false);
const stats = ref("");
const slugUrl = ref();
const fetchData = ref();
const kategori = ref();
const spesifikasi = ref();
const searchProduct = ref();

const deleteProduk = async (idProduk) => {
  console.log("deleteProduk called");
  try {
    await $fetch(`${baseApiUrl}/produk`, {
      method: "DELETE",
      body: {
        idProduk,
      },
    }).then((res) => {
      console.log(res);
      refresh();
    });
  } catch (error) {
    console.log(error);
  }
};

const loadProduct = async () => {
  console.log("loadProduct called");
  // Menggunakan useLazyAsyncData untuk memuat data produk secara malas (lazy)
  const { pending, data } = await useLazyAsyncData("data", () =>
    $fetch(`${baseApiUrl}/produk/${slugUrl.value}`)
  );
  if (!pending.value) {
    fetchData.value = data?.value?.data[0];
    kategori.value = data?.value?.data[0].type_produk;
    spesifikasi.value = JSON.parse(data?.value?.data[0].spesifikasi_detail);
  }
};

const showModal = (status, slug) => {
  console.log("showModal called");
  modalShow.value = true;
  stats.value = status;
  slugUrl.value = slug;
  if (status !== "add") {
    return loadProduct();
  }
  if (fetchData.value !== null && status === "add") {
    fetchData.value = {};
    kategori.value = "";
    spesifikasi.value = {};
  }
};

const closeModal = () => {
  modalShow.value = false;
  fetchData.value = {};
  stats.value = "";
  refresh();
};
const changeCategory = () => {
  spesifikasi.value = {};
};

const list = computed(() => {
  return produk.value.data.slice(startIndex.value, endIndex.value);
});

const filterProduct = computed(() => {
  if (searchProduct.value !== "" && searchProduct.value !== undefined) {
    return produk.value.data.filter((fil) =>
      fil.nama.toString().toLowerCase().includes(searchProduct.value)
    );
  }
  return list.value;
});

const totalListProduk = computed(() => {
  if (searchProduct.value !== "" && searchProduct.value !== undefined) {
    return filterProduct.value.length;
  } else {
    return produk.value.data?.length;
  }
});

const totalPage = computed(() => {
  if (searchProduct.value !== "" && searchProduct.value !== undefined) {
    return Math.ceil(filterProduct.value.length / limit.value);
  }
  return Math.ceil(produk.value?.data?.length / limit.value);
});
const startIndex = computed(() => {
  return (page.value - 1) * limit.value;
});
const endIndex = computed(() => {
  if (searchProduct.value !== "" && searchProduct.value !== undefined) {
    return totalListProduk.value;
  } else if (produk.value.data?.length < page.value * limit.value) {
    return produk.value.data?.length;
  } else {
    return page.value * limit.value;
  }
});

const changeLimit = (e) => {
  limit.value = e.target.value;
  page.value = 1;
};

// watchEffect(() => {
//   // console.log("produk : ", produk.value.data.length);
//   console.log("list : ", list.value.length);
//   console.log("page : ", page.value);
//   // console.log("limit : ", limit.value);
//   // console.log("produk : ", produk.value.data.length);
//   console.log(
//     "searchProduct : ",
//     searchProduct.value !== "" && searchProduct.value !== undefined
//   );
//   console.log("startIndex : ", startIndex.value);
//   console.log("endIndex : ", endIndex.value);
//   console.log("totalPage : ", totalPage.value);
//   console.log("filterProduct : ", filterProduct.value.length);
//   // console.log("totalPage : ", totalPage.value);
//   // console.log("totalListProduk : ", totalListProduk.value);
// });
</script>

<template>
  <section class="">
    <div class="mt-4">
      <div
        class="bg-white dark:bg-gray-800 relative border sm:rounded-lg overflow-hidden"
      >
        <div class="flex flex-col space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div class="mb-4">
            <h1 class="font-semibold text-xl">Data Produk</h1>
          </div>
          <div class="flex !ml-0 justify-between">
            <div class="w-full md:w-1/3">
              <SearchComps v-model="searchProduct" />
            </div>
            <div
              class="w-full md:w-auto flex mr-4 flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
            >
              <button
                type="button"
                @click="showModal('add')"
                class="flex items-center justify-center border bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <Icon
                  name="octicon:plus-16"
                  class="mr-2 self-center"
                  size="20"
                ></Icon>
                Add product
              </button>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-4 py-3 w-auto text-center">No</th>
                <th scope="col" class="px-4 py-3 w-3/5">Nama Produk</th>
                <th scope="col" class="px-4 py-3 w-auto">Kategori</th>
                <th scope="col" class="px-4 py-3 text-center w-auto">Status</th>
                <th scope="col" class="px-4 py-3 w-auto">Brand</th>
                <th scope="col" class="px-4 py-3 w-auto">Harga</th>
                <th scope="col" class="px-4 py-3 text-center">
                  <span>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(data, index) in filterProduct"
                class="group border-b relative transition-all ease-in-out"
              >
                <td
                  class="px-4 py-3 text-center group-hover:text-gray-500 group-hover:bg-slate-200 transition-all ease-in-out"
                >
                  {{ index + 1 }}
                </td>
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap group-hover:text-gray-500 group-hover:bg-slate-200 transition-all ease-in-out"
                >
                  {{ data.nama }}
                </th>
                <td
                  class="px-4 py-3 capitalize group-hover:text-gray-500 group-hover:bg-slate-200 transition-all ease-in-out"
                >
                  {{ data.type_produk }}
                </td>
                <td
                  class="px-4 py-3 text-center group-hover:text-gray-500 group-hover:bg-slate-200 transition-all ease-in-out"
                >
                  <span
                    class="px-4 py-1 text-white capitalize text-center"
                    :class="
                      data.status === 'disewa'
                        ? 'rounded-full bg-red-500'
                        : 'rounded-full bg-green-500'
                    "
                  >
                    {{ data.status }}
                  </span>
                </td>
                <td
                  class="px-4 py-3 group-hover:text-gray-500 group-hover:bg-slate-200 transition-all ease-in-out"
                >
                  {{ data.merk }}
                </td>
                <td
                  class="px-4 py-3 group-hover:text-gray-500 group-hover:bg-slate-200 transition-all ease-in-out"
                >
                  {{ formatCurrencyIDR(data.harga) }}
                </td>
                <td class="px-4 py-3 flex items-center justify-center">
                  <span
                    @click="showModal('edit', data.slug)"
                    class="mx-1 px-2 border rounded py-1 hover:cursor-pointer hover:bg-green-300 transition-all ease-in-out hover:border-green-300"
                  >
                    <Icon name="bxs:edit" class="text-green-500" />
                  </span>
                  <span
                    @click="deleteProduk(data.id_produk)"
                    class="mx-1 px-2 border rounded py-1 hover:cursor-pointer hover:bg-red-300 transition-all ease-in-out hover:border-red-300"
                  >
                    <Icon name="icon-park-solid:delete" class="text-red-500" />
                  </span>
                  <!-- <Menu :idProduct="data.id_produk" @show-modal="showModal" /> -->
                </td>
                <span
                  class="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border rounded-full px-3 bg-green-500 hover:cursor-pointer"
                  @click="showModal('detail', data.slug)"
                >
                  <span class="self-center pr-2 text-white">View</span>
                  <Icon name="raphael:view" class="text-white self-center" />
                </span>
              </tr>
            </tbody>
          </table>
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
            <select
              @change="changeLimit($event)"
              class="items-center justify-center h-full py-1 ml-4 px-3 text-gray-500 bg-white rounded border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              name=""
              id=""
            >
              <option :selected="limit === 5 ? true : false" value="5">
                5
              </option>
              <option :selected="limit === 10 ? true : false" value="10">
                10
              </option>
              <option :selected="limit === 15 ? true : false" value="15">
                15
              </option>
            </select>
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
                class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
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
      </div>
    </div>
  </section>
  <div
    tabindex="-1"
    aria-hidden="true"
    :class="modalShow ? 'block bg-gray-800 bg-opacity-75' : 'hidden'"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
  >
    <AdminFormProduct
      :dataForm="fetchData"
      :kategori="kategori"
      :spesifikasi="spesifikasi"
      :modalShow="modalShow"
      :stats="stats"
      @change-category="changeCategory"
      @close-modal="closeModal"
    />
  </div>
</template>
