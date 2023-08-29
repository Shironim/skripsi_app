<script setup>

import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { inject } from 'vue'
import { useToast } from 'tailvue'
const route = useRouter();
const $toast = useToast()
let { idUser } = inject('idUser')
const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;
const dataDate = ref();
const { data: cart, error, pending, refresh } = await useFetch(`${baseApiUrl}/getcart/${idUser.value}`).catch((error) => error.data);
const alertDelete = () => {
  // Use sweetalert2
  $toast.show({
    type: 'danger',
    message: 'Berhasil dihapus',
    timeout: 3,
  });
}
const alertCheckout = () => {
  // Use sweetalert2
  $toast.show({
    type: 'success',
    message: 'Berhasil Checkout',
    timeout: 3,
  });
}
const deleteCart = async (idCart) => {
  try {
    await $fetch(`${baseApiUrl}/cart/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          id_cart: idCart,
        })
    })
    alertDelete()
  } catch (error) {
    console.log(error)
  }
}
if (!idUser.value) {
  route.push('/login')
}

const totalHarga = () => {
  let total = 0
  cart.value.data.forEach((data) => {
    total += data.harga * data.jumlah_hari
  })
  return total
}

const checkout = async () => {
  try {
    await $fetch(`${baseApiUrl}/invoice/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          id_user: idUser.value,
          produk: cart.value?.data?.map((data) => { return data.id_produk }),
          tanggal_sewa: dataDate.value,
          tanggal_kembali: dataDate.value,
          total_harga: totalHarga(),
          status_sewa: 'belum_bayar'
        })
    })
    alertCheckout()
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <section class="max-w-5xl mx-auto">
    <div class="flex space-x-8 mt-12">
      <div class="basis-2/3">
        <h1 class="text-2xl font-semibold">Alat yang akan disewa</h1>
        <div v-if="cart" class="flex flex-col pt-4">
          <div v-for="data in cart.data" class="flex flex-col border-b-4 border-gray-200 pb-3 pt-4">
            <div class="flex pb-1">
              <div class="basis-1/6">
                <img src="/images/canon-eos-700d.png" class="max-w-full" alt="">
              </div>
              <div class="basis-5/6">
                <h2 class="text-lg pb-2 font-semibold">{{ data.nama }}</h2>
                <p class="text-md">Rp. {{ data.harga }} K / Day</p>
              </div>
            </div>
            <div class="flex justify-end">
              <div class="flex mr-4 basis-5/12">
                <p class="text-md font-semibold self-center whitespace-nowrap mr-4">
                  Tanggal Sewa
                </p>
                <div class="flex items-cente w-full">
                  <input type="date" v-model="dataDate" class="rounded-md">
                </div>
              </div>
              <div class="flex mr-2 basis-4/12">
                <p class="text-md font-semibold self-center whitespace-nowrap mr-4">
                  Lama Sewa
                </p>
                <div class="flex items-cente w-full">
                  <div class="flex">
                    <Icon name="octicon:plus-16" size="28" class="self-center mr-2" />
                    <input type="text" class="w-full rounded-md" :value="data.jumlah_hari">
                    <Icon name="majesticons:minus" size="28" class="self-center ml-2" />
                  </div>
                </div>
              </div>
              <div @click="deleteCart(data.id_cart)" class="basis-2/12 self-center cursor-pointer">
                <Icon name="bi:trash-fill" class="mr-1 self-center text-red-500" />
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
                  {{ cart.data.length }} Alat
                </p>
              </div>
              <div>
                <div v-for="alat in cart.data" class="flex justify-between">
                  <p class="text-md text-gray-400">
                    {{ alat.nama }}
                  </p>
                  <p class="text-md text-gray-400">
                    {{ alat.jumlah_hari }} Hari
                  </p>
                </div>
              </div>
            </div>
            <div class="flex justify-between">
              <p class="text-lg font-semibold">
                Total Harga
              </p>
              <p class="text-lg font-semibold">
                Rp. {{ totalHarga() }} K
              </p>
            </div>
            <div class="w-full">
              <button @click="checkout" class="bg-orange-400 text-white font-semibold w-full rounded-md px-4 py-2 mt-4">
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