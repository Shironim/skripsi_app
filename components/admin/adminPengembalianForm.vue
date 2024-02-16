<script setup>
import { useDateFormat } from "@comps/useDateFormat";
import { useUtils } from "@comps/useUtils";
import { useFormatCurrency } from "@comps/useFormatCurrency";
const props = defineProps({
  modalShow: {
    type: Boolean,
    required: true,
  },
  dataForm: {
    type: Object,
    default: {},
  },
  dataProduk: {
    type: Object,
    default: [],
  },
  stats: {
    type: String,
    required: true,
  },
  pengembalianStatus: {
    type: String,
    required: true,
  },
  allStatus: {
    type: Array,
    required: true,
  },
});

defineEmits(["closeModal", "changeStatus", "editPengembalian", "selectFile"]);

const { formatDateTime } = useDateFormat();
const { capitalizeFirstLetter } = useUtils();
const { formatCurrencyIDR } = useFormatCurrency();

const statusPengembalian = computed(() => {
  switch (props.dataForm.status_pengembalian) {
    case "blm_diambil":
      return "bg-red-500";
    case "diambil":
      return "bg-yellow-500";
    case "dikembalikan":
      return "bg-green-500";
    default:
      return "bg-slate-500";
  }
});

const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;
const baseApiImg = useRuntimeConfig().public.IMAGE_URL;

const isVisible = ref(false);

const setStatus = (stats) => {
  let status = "";
  switch (stats) {
    case "belum_diambil":
      status = "Belum Diambil";
      break;
    case "diambil":
      status = "Diambil";
      break;
    case "dikembalikan":
      status = "Dikembalikan";
      break;
    default:
      status = "DEFAULT";
      break;
  }
  return status;
};
</script>

<template>
  <div
    id="createProduct"
    tabindex="-1"
    aria-hidden="true"
    :class="props.modalShow ? 'block bg-gray-800 bg-opacity-75' : 'hidden'"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto">
      <!-- Modal content -->
      <div
        class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5"
      >
        <!-- Modal header -->
        <div
          class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
        >
          <h3 class="text-lg text-gray-900 font-semibold dark:text-white">
            {{ capitalizeFirstLetter(stats) }} Pengembalian
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
            <span class="sr-only" @click="$emit('closeModal')"
              >Close modal</span
            >
          </button>
        </div>
        <!-- Modal body -->
        <form
          action="#"
          @submit.prevent="
            $emit('editPengembalian', props.dataForm.kode_invoice)
          "
        >
          <div class="pb-6">
            <div class="flex justify-between">
              <div class="flex flex-col">
                <span class="text-xl pb-1"
                  >#{{ props.dataForm.kode_invoice }}</span
                >
                <span class="text-sm text-gray-800"
                  >Tgl. {{ formatDateTime(props.dataForm.created_at) }}</span
                >
              </div>
              <div class="self-center">
                <p
                  class="text-xl px-3 py-1 rounded-md text-white"
                  :class="statusPengembalian"
                >
                  {{ setStatus(props.dataForm.status_pengembalian) }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex gap-x-4 pb-4 border-b">
            <div class="flex flex-col basis-1/3">
              <p class="font-semibold pb-2">Nama Peminjam</p>
              <span class="border rounded px-2 py-1">{{
                props.dataForm.nama_penyewa
              }}</span>
            </div>
            <div class="flex flex-col basis-1/3">
              <p class="font-semibold pb-2">Tanggal Ambil</p>
              <span class="border rounded px-2 py-1">
                {{ formatDateTime(props.dataForm.tgl_ambil) }}
              </span>
            </div>
            <div class="flex flex-col basis-1/3">
              <p class="font-semibold pb-2">Tanggal Kembali</p>
              <span class="border rounded px-2 py-1">
                {{ formatDateTime(props.dataForm.tgl_kembali) }}
              </span>
            </div>
          </div>
          <div class="mt-4 mb-6 border-b-2 pb-4">
            <h2 class="text-lg font-semibold mb-4">Alat yang disewa</h2>
            <div class="flex mb-2 text-center">
              <div class="basis-3/6 text-left">
                <span class="font-semibold">Nama Alat</span>
              </div>
              <div class="basis-2/6">
                <span class="font-semibold">Gambar</span>
              </div>
              <div class="basis-1/6">
                <span class="font-semibold">Harga</span>
              </div>
            </div>
            <div v-for="item in props.dataProduk" class="flex my-2">
              <div class="basis-3/6 self-center">{{ item.nama }}</div>
              <div class="basis-2/6 self-center">
                <img
                  :src="`${baseApiImg}/${item.thumbnail}`"
                  width="100"
                  height="100"
                  alt=""
                  class="mx-auto"
                />
              </div>
              <div class="basis-1/6 self-center text-center">
                {{ formatCurrencyIDR(item.harga) }}
              </div>
            </div>
          </div>
          <div>
            <div class="flex mt-4 justify-end">
              <div class="basis-3/6 text-xl">Total</div>
              <div class="basis-2/6"></div>
              <div class="basis-1/6 text-3xl text-center">
                {{ formatCurrencyIDR(props.dataForm.total_harga) }}
              </div>
            </div>
          </div>
          <div
            v-if="
              props.stats === 'edit' && props.dataForm.status_sewa !== 'lunas'
            "
            class="mb-4"
          >
            <div class="grid gap-4 mb-6 sm:grid-cols-2">
              <div>
                <label
                  for="update_status"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Update Status</label
                >
                <select
                  class="appearance-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="update_status"
                  @change="$emit('changeStatus', $event)"
                  id=""
                >
                  <option value="">Status</option>
                  <option v-for="item in props.allStatus" :value="item.value">
                    {{ item.label }}
                  </option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input"
                  >Upload Foto</label
                >
                <input
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  @change="$emit('selectFile', $event)"
                  ref="file"
                  name="file"
                  id="file"
                  type="file"
                />
              </div>
            </div>
            <button
              v-if="stats === 'edit'"
              type="submit"
              class="w-full border bg-green-500 font-semibold focus:ring-4 focus:outline-none focus:ring-primary-300 text-white rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <Icon name="dashicons:update" size="24" class="mr-2 text-white" />
              <span class="font-semibold text-white">Perbarui</span>
            </button>
          </div>
        </form>

        <div v-if="stats === 'detail'" class="border-t-4 pt-4 mt-4">
          <div class="flex justify-between">
            <p class="text-2xl mb-4">Bukti Pengembalian</p>
            <Icon
              name="bxs:down-arrow"
              class="transition-all ease-in-out"
              :class="isVisible ? '-rotate-90' : ''"
              @click="isVisible = !isVisible"
            />
          </div>
          <div
            class="transition-all ease-in-out"
            :class="isVisible ? 'hidden' : 'block'"
          >
            <div v-if="props.dataForm.bukti_ambil">
              <p class="pb-2">Pengambilan Alat</p>
              <img
                :src="`${baseApiImg}/${props.dataForm.bukti_ambil}`"
                alt=""
                width="300"
                height="300"
                class="mr-auto rounded"
              />
            </div>
            <div v-if="props.dataForm.bukti_kembali">
              <p class="pb-2 pt-4">Pengembalian Alat</p>
              <img
                :src="`${baseApiImg}/${props.dataForm.bukti_kembali}`"
                alt=""
                width="300"
                height="300"
                class="mr-auto rounded"
              />
            </div>
            <div
              v-if="
                props.dataForm.bukti_ambil === null &&
                props.dataForm.bukti_kembali === null
              "
            >
              Belum Ada Pengembalian Alat
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
