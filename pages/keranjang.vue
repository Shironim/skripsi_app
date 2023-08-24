<script setup>

import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const dataDate = ref();

watchEffect((dataDate) => {
  console.log(dataDate.value)
})

</script>

<template>
  <section class="max-w-5xl mx-auto">
    <div class="flex space-x-8 mt-12">
      <div class="basis-2/3">
        <h1 class="text-2xl font-semibold">Keranjang Belanja</h1>
        <div class="flex flex-col pt-4">
          <div class="flex flex-col border-b-4 border-gray-200 pb-3 pt-4">
            <div class="flex pb-1">
              <div class="basis-1/6">
                <img src="/images/canon-eos-1200d.png" class="max-w-full" alt="">
              </div>
              <div class="basis-5/6">
                <h2 class="text-lg pb-2 font-semibold">Canon EOS 1200D</h2>
                <p class="text-md">Rp. 125.000 / Day</p>
              </div>
            </div>
            <div class="flex justify-end">
              <div class="flex mr-4 basis-5/12">
                <p class="text-md font-semibold self-center whitespace-nowrap mr-4">
                  Tanggal Sewa
                </p>
                <div class="flex items-cente w-full">
                  <VueDatePicker class="self-center" v-model="dataDate" :enable-time-picker="false"></VueDatePicker>
                </div>
              </div>
              <div class="flex mr-2 basis-4/12">
                <p class="text-md font-semibold self-center whitespace-nowrap mr-4">
                  Lama Sewa
                </p>
                <div class="flex items-cente w-full">
                  <input type="text" name="lama_sewa" id="lama_sewa"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-8 mr-2" /> 
                  <p class="self-center">
                    Hari
                  </p>
                </div>
              </div>
              <div class="basis-2/12 self-center">
                <Icon name="bi:trash-fill" class="mr-3 self-center text-red-500" />
                <span class="text-md font-semibold self-center text-red-500">Hapus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="basis-1/3">
        <div class="fixed min-w-[330px]">
          <div class="rounded-md border px-3 py-4 shadow-sm">
            <h2 class="text-lg font-semibold mb-3">Ringkasan Sewa</h2>
            <div class="mb-3 pb-4 border-b">
              <div class="flex justify-between">
                <p class="text-md text-gray-400">
                  Jumlah Alat
                </p>
                <p class="text-md text-gray-400">
                  1 Alat
                </p>
              </div>
              <div class="flex justify-between">
                <p class="text-md text-gray-400">
                  Camera EOS Canon 700D
                </p>
                <p class="text-md text-gray-400">
                  3 Hari
                </p>
              </div>
            </div>
            <div class="flex justify-between">
              <p class="text-lg font-semibold">
                Total Harga
              </p>
              <p class="text-lg font-semibold">
                Rp. 375.000
              </p>
            </div>
            <div class="w-full">
              <button class="bg-orange-400 text-white font-semibold w-full rounded-md px-4 py-2 mt-4">
                <Icon name="ic:twotone-shopping-cart-checkout" class="mr-3" />
                <span>Checkout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>