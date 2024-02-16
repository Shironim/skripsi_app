<script setup>
definePageMeta({
  layout: "admin",
});
import { useDateFormat } from "@comps/useDateFormat";
import { useUtils } from "@comps/useUtils";
import { useUpload } from "@comps/useUpload";
import { useFormatCurrency } from "@comps/useFormatCurrency";

const search = ref();
const modalShow = ref(false);
const invoice = ref();
const stats = ref("");
const kodeInvoice = ref();
const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;
const fileInput = ref({});
const invoiceStatus = ref("");
const page = ref(1);
const limit = ref(5);

const { data, pending, error, refresh } = await useFetch("/allinvoice", {
  query: { page, limit },
  method: "GET",
  baseURL: baseApiUrl,
});

const fetchData = ref();
const fetchProduk = ref();

const { formatDateTime } = useDateFormat();
const { handleUpload } = useUpload();
const { renameFile, convertStringToArray } = useUtils();
const { formatCurrencyIDR } = useFormatCurrency();

const allStatus = [
  {
    value: "belum_bayar",
    label: "Belum Bayar",
  },
  {
    value: "dp",
    label: "Down Payment",
  },
  {
    value: "lunas",
    label: "Lunas",
  },
];

const changeStatus = (e) => {
  invoiceStatus.value = e.target.value;
};
const selectFile = (e) => {
  fileInput.value = e.target.files[0];
};

watchEffect(() => {
  if (!pending.value) {
    invoice.value = data?.value?.data;
  }

  if (error.value) {
    console.warn("error", error.value);
  }
});

const deleteInvoice = async (kodeInvoice) => {
  console.log("deleteInvoice called");
  try {
    await $fetch(`${baseApiUrl}/invoice`, {
      method: "DELETE",
      body: {
        kodeInvoice,
      },
    }).then((res) => {
      console.log(res);
      refresh();
    });
  } catch (error) {
    console.log(error);
  }
};
const editInvoice = async (kodeInvoice) => {
  console.log("editInvoice called");
  try {
    await $fetch(`${baseApiUrl}/invoice`, {
      method: "PATCH",
      body: {
        kodeInvoice: kodeInvoice,
        status_sewa: invoiceStatus.value,
        bukti_pembayaran: renameFile(fileInput.value.name),
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

const loadTransaksi = async () => {
  console.log("loadTransaksi called");
  // Menggunakan useLazyAsyncData untuk memuat data produk secara malas (lazy)
  const { pending, data } = await useLazyAsyncData(
    "data",
    () => $fetch(`${baseApiUrl}/invoice/${kodeInvoice.value}`),
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

const showModal = async (status, invoice) => {
  modalShow.value = true;
  stats.value = status;
  kodeInvoice.value = invoice;
  if (status !== "delete") {
    return await loadTransaksi();
  }
};

const closeModal = () => {
  modalShow.value = false;
  fetchData.value = {};
  fetchProduk.value = {};
  kodeInvoice.value = "";
  stats.value = "";
};

const searchInvoice = computed(() => {
  if (search.value !== "" && search.value !== undefined) {
    return invoice.value.filter((fil) =>
      fil.kode_invoice.toString().toLowerCase().includes(search.value)
    );
  }
  return list.value;
});

const list = computed(() => {
  return data.value.data.slice(startIndex.value, endIndex.value);
});

const totalList = computed(() => {
  if (search.value !== "" && search.value !== undefined) {
    return searchInvoice.value.length;
  } else {
    return data.value.data?.length;
  }
});
const totalPage = computed(() => {
  if (search.value !== "" && search.value !== undefined) {
    return Math.ceil(searchInvoice.value.length / limit.value);
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

const changeLimit = (e) => {
  limit.value = e.target.value;
  page.value = 1;
};

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
            <h1 class="font-semibold text-xl">Data Transaksi</h1>
          </div>
          <div class="flex !ml-0 justify-between">
            <div class="w-full md:w-1/3">
              <SearchComps v-model="search" />
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 text-left">
              <tr>
                <th scope="col" class="px-4 py-3 w-auto text-center">No</th>
                <th scope="col" class="px-4 py-3 w-3/12">Invoice</th>
                <th scope="col" class="px-4 py-3 w-2/12">Peminjam</th>
                <th scope="col" class="px-4 py-3 w-auto">Total Harga</th>
                <th scope="col" class="px-4 py-3 w-1/12 text-center">Status</th>
                <th scope="col" class="px-4 py-3 w-auto text-center">Date</th>
                <th scope="col" class="px-4 py-3 text-center w-auto">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(data, index) in searchInvoice"
                class="group border-b relative transition-all ease-in-out"
              >
                <td
                  class="px-4 py-3 text-center group-hover:text-gray-500 group-hover:bg-slate-200 transition-all ease-in-out"
                >
                  {{ index + 1 }}
                </td>
                <th
                  scope="row"
                  class="text-left px-4 py-3 font-medium group-hover:text-gray-500 group-hover:bg-slate-200 whitespace-nowrap transition-all ease-in-out"
                >
                  {{ data.kode_invoice }}
                </th>
                <td
                  class="px-4 py-3 group-hover:text-gray-500 group-hover:bg-slate-200 transition-all ease-in-out"
                >
                  {{ data.nama_penyewa }}
                </td>
                <td
                  class="px-4 py-3 group-hover:text-gray-500 group-hover:bg-slate-200 transition-all ease-in-out"
                >
                  {{ formatCurrencyIDR(data.total_harga) }}
                </td>
                <td
                  class="px-4 py-3 text-center group-hover:text-gray-500 group-hover:bg-slate-200 transition-all ease-in-out"
                >
                  <div
                    v-if="data.status_sewa == 'belum_bayar'"
                    class="w8 h-2 rounded-full bg-red-500 mx-auto"
                  ></div>
                  <div
                    v-if="data.status_sewa == 'dp'"
                    class="w8 h-2 rounded-full bg-yellow-500 mx-auto"
                  ></div>
                  <div
                    v-if="data.status_sewa == 'lunas'"
                    class="w8 h-2 rounded-full bg-green-500 mx-auto"
                  ></div>
                </td>
                <td
                  class="px-4 py-3 text-center group-hover:text-gray-500 group-hover:bg-slate-200 transition-all ease-in-out"
                >
                  {{ formatDateTime(data.created_at) || "-" }}
                </td>

                <td class="px-4 py-3 flex items-center justify-center">
                  <span
                    class="mx-1 px-2 border rounded py-1 hover:cursor-pointer hover:bg-green-300 transition-all ease-in-out hover:border-green-300"
                    @click="showModal('edit', data.kode_invoice)"
                  >
                    <Icon name="bxs:edit" class="text-green-500" />
                  </span>
                  <!-- <span
                    class="mx-1 px-2 border rounded py-1 hover:cursor-pointer hover:bg-red-300 transition-all ease-in-out hover:border-red-300"
                    @click="deleteInvoice(data.kode_invoice)"
                  >
                    <Icon name="icon-park-solid:delete" class="text-red-500" />
                  </span> -->
                </td>
                <span
                  class="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border rounded-full px-3 bg-green-500 hover:cursor-pointer"
                  @click="showModal('detail', data.kode_invoice)"
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
  <AdminDetailTransaksi
    :dataForm="fetchData"
    :invoiceStatus="invoiceStatus"
    :allStatus="allStatus"
    :dataProduk="fetchProduk"
    :stats="stats"
    :modalShow="modalShow"
    @close-modal="closeModal"
    @change-status="changeStatus"
    @edit-invoice="editInvoice"
    @select-file="selectFile"
  />
</template>
