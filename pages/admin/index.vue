<script setup>
definePageMeta({
  layout: "admin",
});

import { useFormatCurrency } from "@comps/useFormatCurrency";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import { Bar, Line, Doughnut } from "vue-chartjs";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;
const {
  data: allTransaksi,
  pendingInvoice,
  errorInvoice,
  refreshInvoice,
} = await useFetch("/allinvoice", {
  method: "GET",
  baseURL: baseApiUrl,
});
const {
  data: allCamera,
  pending,
  error,
  refresh,
} = await useFetch("/produk", {
  method: "GET",
  baseURL: baseApiUrl,
});
const { data: incomePerMonth } = await useFetch("/incomepermonth", {
  method: "GET",
  baseURL: baseApiUrl,
  pick: ["data"],
});

const jmlAlatDisewa = computed(() => {
  return allCamera.value?.data.filter((item) => item.status == "disewa").length;
});
const jmlAlatTersedia = computed(() => {
  return allCamera.value?.data.filter((item) => item.status == "tersedia")
    .length;
});
const jmlAlat = computed(() => {
  return allCamera.value?.data.length;
});
const jmlInvoiceAktif = computed(() => {
  return allTransaksi.value?.data.filter((item) => item.status_sewa !== "lunas")
    .length;
});
const jmlInvoiceLunas = computed(() => {
  return allTransaksi.value?.data.filter((item) => item.status_sewa === "lunas")
    .length;
});
const jmlInvoiceDP = computed(() => {
  return allTransaksi.value?.data.filter((item) => item.status_sewa === "dp")
    .length;
});
const jmlInvoiceBlmBayar = computed(() => {
  return allTransaksi.value?.data.filter(
    (item) => item.status_sewa === "belum_bayar"
  ).length;
});

const transaksiLunas = computed(() => {
  return incomePerMonth.value?.data.filter(
    (item) => item.status_sewa === "lunas"
  );
});
const transaksiDP = computed(() => {
  return incomePerMonth.value?.data.filter((item) => item.status_sewa === "dp");
});
const transaksiBlmBayar = computed(() => {
  return incomePerMonth.value?.data.filter(
    (item) => item.status_sewa === "belum_bayar"
  );
});

const today = new Date();

const thisMonth = today.getMonth();

const { formatCurrencyIDR } = useFormatCurrency();

const setStatus = (stats) => {
  let status = "";
  switch (stats) {
    case "belum_bayar":
      status = "Menunggu Pembayaran";
      break;
    case "dp":
      status = "Down Payment";
      break;
    case "lunas":
      status = "Lunas";
      break;
    default:
      status = "DEFAULT";
      break;
  }
  return status;
};

const dataTransaksi = ref({
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Desember",
  ],
  datasets: [
    {
      label: "Pendapatan",
      backgroundColor: "#0e9f6e",
      data: transaksiLunas.value?.map((item) => item.total_revenue),
    },
  ],
});

const ketersediaanData = {
  labels: ["Alat Tersedia", "Alat Disewa"],
  datasets: [
    {
      backgroundColor: ["#0e9f6e", "#f05252"],
      data: [jmlAlatTersedia, jmlAlatDisewa],
    },
  ],
};
const LunasDP = {
  labels: ["Lunas", "DP", "Belum Bayar"],
  datasets: [
    {
      backgroundColor: ["#0e9f6e", "#c27803", "#f05252"],
      data: [jmlInvoiceLunas, jmlInvoiceDP, jmlInvoiceBlmBayar],
    },
  ],
};
const transaksiMenunggu = {
  labels: ["DP", "Belum Bayar"],
  datasets: [
    {
      backgroundColor: ["#c27803", "#f05252"],
      data: [
        transaksiDP.value?.reduce((acc, item) => {
          acc += item.total_revenue;
          return acc;
        }, 0),
        transaksiBlmBayar.value?.reduce((acc, item) => {
          acc += item.total_revenue;
          return acc;
        }, 0),
      ],
    },
  ],
};

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
});
watchEffect(() => {
  console.log("incomePerMonth", incomePerMonth.value.data);
  console.log("thisMonth", thisMonth);
});
</script>

<template>
  <section class="my-4">
    <div class="flex space-x-4">
      <div
        class="flex basis-1/4 flex-col px-4 py-3 rounded-md bg-white shadow-sm"
      >
        <div class="flex justify-between">
          <p class="text-md pb-1 self-center">Total Alat</p>
          <div class="rounded-md bg-blue-50 p-2">
            <Icon
              name="mdi:camera-lock"
              class="self-center text-indigo-700"
              size="32"
            />
          </div>
        </div>
        <p class="text-4xl pb-1 font-semibold">{{ jmlAlat }}</p>
      </div>
      <div
        class="flex basis-1/4 flex-col px-4 py-3 rounded-md bg-white shadow-sm"
      >
        <div class="flex justify-between">
          <p class="text-md pb-1 self-center">Alat Disewa</p>
          <div class="rounded-md bg-blue-50 p-2">
            <Icon
              name="ic:round-camera-enhance"
              class="self-center text-indigo-700"
              size="32"
            />
          </div>
        </div>
        <p class="text-4xl pb-1 font-semibold">{{ jmlAlatDisewa }}</p>
      </div>
      <div
        class="flex basis-1/4 flex-col px-4 py-3 rounded-md bg-white shadow-sm"
      >
        <div class="flex justify-between">
          <p class="text-md pb-1 self-center">Invoice Aktif</p>
          <div class="rounded-md bg-blue-50 p-2">
            <Icon
              name="mdi:invoice-clock"
              class="self-center text-indigo-700"
              size="32"
            />
          </div>
        </div>
        <p class="text-4xl pb-1 font-semibold">{{ jmlInvoiceAktif }}</p>
      </div>
    </div>
    <div class="flex mt-6 space-x-4">
      <div class="bg-white border rounded-md px-4 pb-6 basis-8/12">
        <h1 class="font-semibold text-xl mb-4 pt-4">Income 12 Bulan</h1>
        <div>
          <Bar
            :data="dataTransaksi"
            :options="options"
            class="h-[300px] relative w-full"
          />
        </div>
      </div>
      <div class="bg-white border rounded-md px-4 pb-6 basis-4/12">
        <h1 class="font-semibold text-xl mb-4 pt-4">Transaksi Menunggu</h1>
        <div>
          <Doughnut :data="transaksiMenunggu" :options="options" />
        </div>
      </div>
    </div>
    <div class="flex mt-6 space-x-4">
      <div class="basis-1/2">
        <div
          class="bg-white dark:bg-gray-800 relative border sm:rounded-lg overflow-hidden"
        >
          <div class="bg-white rounded-sm px-4 pb-6 pt-4">
            <div class="flex justify-between mb-4">
              <h1 class="font-semibold text-xl self-center">Data Produk</h1>
              <NuxtLink to="/admin/list-produk">
                <span class="text-sm text-gray-500 self-center"
                  >Selengkapnya</span
                >
              </NuxtLink>
            </div>
            <div>
              <Doughnut :data="ketersediaanData" :options="options" />
            </div>
          </div>
        </div>
      </div>
      <div class="basis-1/2">
        <div
          class="bg-white dark:bg-gray-800 relative border sm:rounded-lg overflow-hidden"
        >
          <div class="bg-white rounded-sm px-4 pb-6 pt-4">
            <div class="flex justify-between mb-4">
              <h1 class="font-semibold text-xl self-center">Data Invoice</h1>
              <NuxtLink to="/admin/list-transaksi">
                <span class="text-sm text-gray-500 self-center"
                  >Selengkapnya</span
                >
              </NuxtLink>
            </div>
            <div>
              <Doughnut :data="LunasDP" :options="options" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
