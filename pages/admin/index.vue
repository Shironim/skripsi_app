<script setup>
definePageMeta({
  layout: 'admin',
})
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
                  <th scope="col" class="px-2 py-3">No</th>
                  <th scope="col" class="px-4 py-3">Nama Produk</th>
                  <th scope="col" class="px-4 py-3">Kategori</th>
                  <th scope="col" class="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b dark:border-gray-700">
                  <td class="px-2 py-3">1</td>
                  <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Camera EOS Canon 700D</th>
                  <td class="px-4 py-3">
                    Kamera Foto
                  </td>
                  <td class="px-4 py-3">
                    <span class="text-red-500 font-semibold">Disewa</span>
                  </td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="px-2 py-3">2</td>
                  <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Camera Nikon D7100</th>
                  <td class="px-4 py-3">
                    Kamera Foto
                  </td>
                  <td class="px-4 py-3">
                    <span class="text-red-500 font-semibold">Disewa</span>
                  </td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="px-2 py-3">3</td>
                  <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Nikon AF-S 50 f/1.8G</th>
                  <td class="px-4 py-3">
                    Lensa
                  </td>
                  <td class="px-4 py-3">
                    <span class="text-green-500 font-semibold">Tersedia</span>
                  </td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="px-2 py-3">4</td>
                  <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Canon EF 135 f/2L USM</th>
                  <td class="px-4 py-3">
                    Lensa
                  </td>
                  <td class="px-4 py-3">
                    <span class="text-green-500 font-semibold">Tersedia</span>
                  </td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="px-2 py-3">5</td>
                  <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Tripod Manfrotto</th>
                  <td class="px-4 py-3">
                    Tripod
                  </td>
                  <td class="px-4 py-3">
                    <span class="text-red-500 font-semibold">Disewa</span>
                  </td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="px-2 py-3">6</td>
                  <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Camera Nikon D500</th>
                  <td class="px-4 py-3">
                    Kamera Foto
                  </td>
                  <td class="px-4 py-3">
                    <span class="text-green-500 font-semibold">Tersedia</span>
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
                  <th scope="col" class="px-2 py-3">No</th>
                  <th scope="col" class="px-4 py-3">Invoice</th>
                  <th scope="col" class="px-4 py-3">Peminjam</th>
                  <th scope="col" class="px-4 py-3">Status</th>
                  <th scope="col" class="px-4 py-3">Total Harga</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b dark:border-gray-700">
                  <td class="px-2 py-3">1</td>
                  <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">INV-08-23-02</th>
                  <td class="px-4 py-3">
                    Dimas Seto
                  </td>
                  <td class="px-4 py-3">
                    Belum Bayar
                  </td>
                  <td class="px-4 py-3">
                    Rp. 375.000
                  </td>
                </tr>
                <tr class="border-b dark:border-gray-700">
                  <td class="px-2 py-3">2</td>
                  <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">INV-08-23-01</th>
                  <td class="px-4 py-3">
                    Dimas Seto
                  </td>
                  <td class="px-4 py-3">
                    DP
                  </td>
                  <td class="px-4 py-3">
                    Rp. 200.000
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</section></template>