<script setup>
definePageMeta({
  layout: "admin",
});

import { useDateFormat } from "@comps/useDateFormat";
import { useUtils } from "@comps/useUtils";

const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;

const search = ref();
const modalShow = ref(false);
const kodeInvoice = ref();
const stats = ref("");
const fetchData = ref();
const fetchProduk = ref();
const pengembalianStatus = ref("");
const fileInput = ref({});
const page = ref(1);
const limit = ref(5);

const { data, error, pending, refresh } = await useFetch(`/pengembalian`, {
  query: { page, limit },
  method: "GET",
  baseURL: baseApiUrl,
});

const { formatDateTime } = useDateFormat();
const { handleUpload } = useUpload();
const { renameFile, convertStringToArray } = useUtils();

const allStatus = [
  {
    value: "belum_ambil",
    label: "Belum Diambil",
  },
  {
    value: "diambil",
    label: "Diambil",
  },
  {
    value: "dikembalikan",
    label: "Dikembalikan",
  },
];

const changeStatus = (e) => {
  pengembalianStatus.value = e.target.value;
};
const selectFile = (e) => {
  fileInput.value = e.target.files[0];
};
const status = (status) => {
  switch (status) {
    case "belum_diambil":
      return "Belum Diambil";
    case "diambil":
      return "Diambil";
    case "dikembalikan":
      return "Dikembalikan";
    default:
      return "DEFAULT";
  }
};
const showModal = async (status, invoice) => {
  console.log("showModal called");
  modalShow.value = true;
  stats.value = status;
  kodeInvoice.value = invoice;
  if (status !== "delete") {
    return await loadDetailPengembalian();
  }
};

const editPengembalian = async (kodeInvoice) => {
  let listProduk = fetchProduk.value.map((item) => item.id_produk);
  console.log("editPengembalian called");
  try {
    await $fetch(`${baseApiUrl}/pengembalian`, {
      method: "PATCH",
      body: {
        kodeInvoice: kodeInvoice,
        status_pengembalian: pengembalianStatus.value,
        bukti_pengembalian: renameFile(fileInput.value.name),
        produk: listProduk,
      },
    }).then((res) => {
      console.log(res);
      refresh();
      closeModal();
    });
    await handleUpload(fileInput.value, baseApiUrl);
  } catch (error) {
    console.log(error);
  }
};

const loadProduct = async (fetch) => {
  console.log("loadProduct called");
  try {
    await $fetch(`${baseApiUrl}/getSeveralProduct/`, {
      method: "POST",
      body: {
        produk: convertStringToArray(fetch.produk),
      },
    }).then((res) => {
      fetchProduk.value = res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

const loadDetailPengembalian = async () => {
  console.log("loadDetailPengembalian called");
  // Menggunakan useLazyAsyncData untuk memuat data produk secara malas (lazy)
  const { pending, data } = await useLazyAsyncData(
    "data",
    () => $fetch(`${baseApiUrl}/pengembalian/${kodeInvoice.value}`),
    {
      method: "GET",
      pick: ["data"],
    }
  );
  if (!pending.value) {
    fetchData.value = data?.value?.data[0];
    return await loadProduct(data?.value?.data[0]);
  }
};

const closeModal = () => {
  modalShow.value = false;
  fetchData.value = {};
  fetchProduk.value = {};
  kodeInvoice.value = "";
  stats.value = "";
  pengembalianStatus.value = "";
};

const changeLimit = (e) => {
  limit.value = e.target.value;
  page.value = 1;
};

const list = computed(() => {
  return data.value.data.slice(startIndex.value, endIndex.value);
});

const filterData = computed(() => {
  if (search.value !== "" && search.value !== undefined) {
    return data.value.data.filter((fil) =>
      fil.kode_invoice.toString().toLowerCase().includes(search.value)
    );
  }
  return list.value;
});

const totalList = computed(() => {
  if (search.value !== "" && search.value !== undefined) {
    return filterData.value.length;
  } else {
    return data.value.data?.length;
  }
});
const totalPage = computed(() => {
  if (search.value !== "" && search.value !== undefined) {
    return Math.ceil(filterData.value.length / limit.value);
  }
  return Math.ceil(data.value?.data?.length / limit.value);
});
const startIndex = computed(() => {
  return (page.value - 1) * limit.value;
});
const endIndex = computed(() => {
  if (search.value !== "" && search.value !== undefined) {
    return totalList.value;
  } else if (data.value.data?.length < page.value * limit.value) {
    return data.value.data?.length;
  } else {
    return page.value * limit.value;
  }
});

</script>

<template>
  <section class="">
    <div class="mt-4">
      <!-- Start coding here -->
      <div
        class="bg-white dark:bg-gray-800 relative border sm:rounded-lg overflow-hidden"
      >
        <div class="flex flex-col space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div class="mb-4">
            <h1 class="font-semibold text-xl">Data Pengembalian</h1>
          </div>
          <div class="flex !ml-0 justify-between">
            <div class="w-full md:w-1/3">
              <SearchComps v-model="search" />
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-4 py-3 text-center">No</th>
                <th scope="col" class="px-4 py-3">Invoice</th>
                <th scope="col" class="px-4 py-3">Peminjam</th>
                <th scope="col" class="px-4 py-3">Status</th>
                <th scope="col" class="px-4 py-3">Tanggal Diambil</th>
                <th scope="col" class="px-4 py-3">Tanggal Kembali</th>
                <th scope="col" class="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in filterData"
                class="group border-b relative transition-all ease-in-out"
              >
                <th
                  scope="row"
                  class="px-4 py-3 font-medium text-center group-hover:text-gray-500 group-hover:bg-slate-200 transition-all ease-in-out"
                >
                  {{ index + 1 }}
                </th>
                <th
                  scope="row"
                  class="px-4 py-3 font-medium group-hover:text-gray-500 group-hover:bg-slate-200 transition-all ease-in-out"
                >
                  {{ item.kode_invoice }}
                </th>
                <td
                  class="px-4 py-3 group-hover:text-gray-500 group-hover:bg-slate-200 transition-all ease-in-out"
                >
                  {{ item.nama_penyewa }}
                </td>
                <td
                  class="px-4 py-3 group-hover:text-gray-500 group-hover:bg-slate-200 transition-all ease-in-out"
                >
                  {{ status(item.status_pengembalian) }}
                </td>
                <td
                  class="px-4 py-3 group-hover:text-gray-500 group-hover:bg-slate-200 transition-all ease-in-out"
                >
                  {{ formatDateTime(item.tgl_ambil) }}
                </td>
                <td
                  class="px-4 py-3 group-hover:text-gray-500 group-hover:bg-slate-200 transition-all ease-in-out"
                >
                  {{ formatDateTime(item.tgl_kembali) }}
                </td>
                <td class="px-4 py-3 flex items-center justify-center">
                  <span
                    class="mx-1 px-2 border rounded py-1 hover:cursor-pointer hover:bg-green-300 transition-all ease-in-out hover:border-green-300"
                    @click="showModal('edit', item.kode_invoice)"
                  >
                    <Icon name="bxs:edit" class="text-green-500" />
                  </span>
                  <!-- <span
                    class="mx-1 px-2 border rounded py-1 hover:cursor-pointer hover:bg-red-300 transition-all ease-in-out hover:border-red-300"
                    @click="showModal('delete', item.kode_invoice)"
                  >
                    <Icon name="icon-park-solid:delete" class="text-red-500" />
                  </span> -->
                </td>
                <span
                  class="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border rounded-full px-3 bg-green-500 hover:cursor-pointer"
                  @click="showModal('detail', item.kode_invoice)"
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
                totalList
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
  <!-- Main modal -->

  <AdminPengembalianForm
    :dataForm="fetchData"
    :stats="stats"
    :modalShow="modalShow"
    :pengembalianStatus="pengembalianStatus"
    :allStatus="allStatus"
    :dataProduk="fetchProduk"
    @close-modal="closeModal"
    @change-status="changeStatus"
    @edit-pengembalian="editPengembalian"
    @select-file="selectFile"
  />
</template>
