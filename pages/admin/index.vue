<script setup>
definePageMeta({
  layout: 'admin',
})

const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;
const allCamera = await $fetch(`${baseApiUrl}/produk`).catch((error) => error.data);
const allTransaksi = await $fetch(`${baseApiUrl}/allinvoice`).catch((error) => error.data);
</script>

<template>
  <section class="mt-4">
    <div class="flex space-x-6">
      <div class="flex basis-1/4 flex-col px-4 py-3 border rounded-md bg-white shadow-md">
        <div class="flex">
          <Icon name="mdi:camera-lock" class="self-center mr-4 text-orange-400" size="60" />
          <div>
            <p class="text-md pb-1">Alat Disewa</p>
            <p class="text-4xl font-semibold">3</p>
          </div>
        </div>
      </div>
      <div class="flex basis-1/4 flex-col px-4 py-3 border rounded-md bg-white shadow-md">
        <div class="flex">
          <Icon name="ic:round-camera-enhance" class="self-center mr-4 text-green-500" size="60" />
          <div>
            <p class="text-md pb-1">Alat Tersedia</p>
            <p class="text-4xl font-semibold">3</p>
          </div>
        </div>
      </div>
      <div class="flex basis-1/4 flex-col px-4 py-3 border rounded-md bg-white shadow-md">
        <div class="flex">
          <Icon name="mdi:invoice-clock" class="self-center mr-4 text-orange-400" size="60" />
          <div>
            <p class="text-md pb-1">Invoice Aktif</p>
            <p class="text-4xl font-semibold">2</p>
          </div>
        </div>
      </div>
      <div class="flex basis-1/4 flex-col px-4 py-3 border rounded-md bg-white shadow-md">
        <div class="flex">
          <Icon name="icon-park-solid:sales-report" class="self-center mr-4 text-green-500" size="60" />
          <div>
            <p class="text-md pb-1">Sales</p>
            <p class="text-2xl font-semibold">Rp. 575.000</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex mt-12 space-x-6">
      <div class="basis-5/12">
        <div class="bg-white dark:bg-gray-800 relative border sm:rounded-lg overflow-hidden">
          <div class="flex flex-col space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div class="">
              <h1 class="font-semibold text-xl">Data Produk</h1>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-4 py-3">Nama Produk</th>
                  <th scope="col" class="px-4 py-3">Kategori</th>
                  <th scope="col" class="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="camera in allCamera.data" class="border-b dark:border-gray-700">
                  <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{camera.nama}}</th>
                  <td class="px-4 py-3">
                    {{ camera.type_produk }}
                  </td>
                  <td class="px-4 py-3">
                    <span v-if="camera.status == 'disewa'" class="text-red-500 font-semibold">{{camera.status}}</span>
                    <span v-if="camera.status == 'tersedia'" class="text-green-500 font-semibold">{{camera.status}}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="basis-7/12">
        <div class="bg-white dark:bg-gray-800 relative border sm:rounded-lg overflow-hidden">
          <div class="flex flex-col space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div class="">
              <h1 class="font-semibold text-xl">Transaksi</h1>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-4 py-3">Invoice</th>
                  <th scope="col" class="px-4 py-3">Peminjam</th>
                  <th scope="col" class="px-4 py-3">Status</th>
                  <th scope="col" class="px-4 py-3">Total Harga</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="invoice in allTransaksi.data" class="border-b dark:border-gray-700">
                  <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">INV-08-23-02</th>
                  <td class="px-4 py-3">
                    {{ invoice.nama_depan }}
                  </td>
                  <td class="px-4 py-3">
                    {{ invoice.status_sewa }}
                  </td>
                  <td class="px-4 py-3">
                    Rp. {{ invoice.total_harga}}.000
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</section></template>