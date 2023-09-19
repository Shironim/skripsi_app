<script setup>

// import { ref } from 'vue';
// import VueDatePicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css'
// import { inject } from 'vue'
import { useToast } from 'tailvue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
definePageMeta({
  middleware: ["auth-user"]
})

const $toast = useToast()
const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;
const token = useCookie('token')

const rangeReservation = ref([
  [
    "Mon Sep 04 2023 00:01:00 GMT+0700 (Indochina Time)",
    "Fri Sep 08 2023 00:01:00 GMT+0700 (Indochina Time)"
  ],
  [
    "Mon Sep 04 2023 00:01:00 GMT+0700 (Indochina Time)",
    "Fri Sep 08 2023 00:01:00 GMT+0700 (Indochina Time)"
  ],
])

const { data: cart, error: errrGetCart, refresh } = await useFetch(`${baseApiUrl}/getcart`, {
  onRequest({ options }) {
    // Set the request headers
    options.headers = options.headers || {}
    options.headers.authorization = `Bearer ${token.value}`
  },
})

const updateCart = async (update, id, jumlah_hari) => {
  // console.log('update :', update)
  // console.log('id :', id)
  // console.log('jumlah_hari :', jumlah_hari)
  if (update == 'add') {
    const { error } = useLazyFetch(`${baseApiUrl}/updatecart`, {
      method: 'PATCH',
      body: JSON.stringify(
        {
          jumlah_hari: jumlah_hari + 1,
          id_cart: id,
        })
    })
    if (error.value != null) {
      console.log('error add cart :', error.value)
    } else {
      alert('info', 'Berhasil memperbarui')
      refresh()
    }
  }
  if (update == 'minus') {
    if (jumlah_hari > 1) {
      const { error } = useLazyFetch(`${baseApiUrl}/updatecart`, {
        method: 'PATCH',
        body: JSON.stringify(
          {
            jumlah_hari: jumlah_hari - 1,
            id_cart: id,
          })
      })
      if (error.value != null) {
        console.log('error minus cart :', error.value)
      } else {
        alert('info', 'Berhasil memperbarui')
        refresh()
      }
    }
  }
}
const alert = (type, msg) => {
  // Use sweetalert2
  $toast.show({
    type: type,
    message: msg,
    timeout: 3,
  });
}

const toDate = (inputDate) => {
  const date = new Date(inputDate); // Mengonversi string tanggal ke objek Date
  const year = date.getFullYear(); // Mendapatkan tahun
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mendapatkan bulan (ditambah 1 karena bulan dimulai dari 0)
  const day = String(date.getDate()).padStart(2, '0'); // Mendapatkan hari

  return `${year}-${month}-${day}`;
}
const getDate = (date, index) => {
  rangeReservation.value[index] = date
  console.log('getDate', rangeReservation.value)
}
const updateDate = (e, id) => {
  const { error } = useLazyFetch(`${baseApiUrl}/tanggalsewa`, {
    method: 'PATCH',
    body: JSON.stringify(
      {
        tanggal_sewa: e.target.value,
        id_cart: id,
      })
  })
  if (error.value != null) {
    console.log('error update cart :', error.value)
  } else {
    alert('info', 'Berhasil memperbarui')
    refresh()
  }
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
    refresh()
    alert('danger', 'Berhasil dihapus')
  } catch (error) {
    console.log(error)
  }
}

const totalHarga = () => {
  let total = 0
  cart.value?.data.forEach((data) => {
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
    alert('success', 'Berhasil checkout')
  } catch (error) {
    console.log(error)
  }
}

watchEffect(() => {
  // console.log('cart', cart.value.data)
  // console.log('camera', camera.value)
  if (errrGetCart.value != null) {
    console.log('errrGetCart :', errrGetCart.value)
  }
  console.log('rangeReservation', rangeReservation.value)
})

</script>
<template>
  <section class="max-w-5xl mx-auto">
    <div class="flex space-x-8 mt-12">
      <div class="basis-2/3">
        <h1 class="text-2xl font-semibold">Alat yang akan disewa</h1>
        <div v-if="cart" class="flex flex-col pt-4">
          <div v-for="(data, index) in cart.data" class="flex flex-col border-b-4 border-gray-200 pb-3 pt-4">
            <div class="flex pb-1">
              <div class="basis-1/6">
                <img :src="`${baseApiUrl}/${data.thumbnail}`" class="max-w-full" alt="">
              </div>
              <div class="basis-4/6 ml-4 ">
                <h2 class="text-md pb-2 ">{{ data.nama }}</h2>
                <p class="text-md pb-4 font-semibold">Rp. {{ data.harga }} K / Day</p>
                <div class="flex mr-4 mb-4">
                  <p class="text-md font-semibold self-center whitespace-nowrap mr-4">
                    Reservasi
                  </p>
                  <div class="flex items-center">
                    <VueDatePicker :model-value="rangeReservation[index]" v-on:update:model-value="(e) => getDate(e, index)" range
                      :enable-time-picker="false" />
                    <!-- <input type="date" :value="toDate(data.tanggal_sewa)" @input="(e) => updateDate(e, data.id_cart)"  class="rounded-md"> -->
                  </div>
                </div>
              </div>
              <div @click="deleteCart(data.id_cart)" class="basis-1/6 text-end cursor-pointer">
                <Icon name="bi:trash-fill" class="mr-1 self-center text-red-500" />
                <span class="text-md font-semibold self-center text-red-500">Hapus</span>
              </div>
            </div>
            <div class="flex justify-between">
              <div class="flex flex-col">
                <!-- <div class="flex mr-2 ">
                  <p class="text-md font-semibold self-center whitespace-nowrap mr-4">
                    Lama Sewa
                  </p>
                  <div class="flex items-cente w-full">
                    <div class="flex">
                      <Icon @click="updateCart('add', data.id_cart, data.jumlah_hari)" name="octicon:plus-16" size="28"
                        class="self-center mr-2" />
                      <span class="self-center">{{ data.jumlah_hari }}</span>
                      <Icon @click="updateCart('minus', data.id_cart, data.jumlah_hari)" name="majesticons:minus"
                        size="28" class="self-center ml-2" />
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="basis-1/3">
        <div class="fixed min-w-[330px]">
          <div class="rounded-md border px-3 py-4 shadow-sm">
            <h2 class="text-lg font-semibold mb-3">Ringkasan Sewa</h2>
            <div v-if="cart" class="mb-3 pb-4 border-b">
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