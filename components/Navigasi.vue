<script setup>
import { inject } from 'vue'
//  inject chat
let { toogle } = inject('chat')
const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;
const token = useCookie('token')
const nama = ref('')
const { data, error } = await useFetch(`${baseApiUrl}/user`, {
  onRequest({ options }) {
    // Set the request headers
    options.headers = options.headers || {}
    options.headers.authorization = `Bearer ${token.value}`
  },
})
watchEffect(()=>{
  if (error.value != null) {
    console.log('error :', error.value)
  }
  if (data.value != null) {
    nama.value = data.value.data[0].nama_depan
  }
})

</script>
<template>
  <nav class="w-full sticky top-0 shadow-md p-4 z-40 bg-white px-4">
    <div class="md:max-w-5xl mx-auto">
      <div class="flex">
        <div class="text-xl self-center basis-1/4">
          <NuxtLink to="/">
            <span class="font-medium text-2xl">ADMS</span>
          </NuxtLink>
        </div>
        <div class="flex basis-3/4 justify-end">
          <div class="flex justify-center border-r-2 border-r-black">
            <div class="self-center">
              <NuxtLink to="/keranjang">
                <span>
                  <Icon name="material-symbols:shopping-cart" size="28" class="text-slate-800 mx-2"></Icon>
                </span>
              </NuxtLink>
              <span>
                <Icon @click="toogle" name="material-symbols:android-messages" size="28"
                  class="text-slate-800 mx-2 cursor-pointer"></Icon>
              </span>
            </div>
          </div>
          <div class="flex">
            <div class="self-center ml-3 mr-2">
              <Icon name="carbon:user-avatar-filled" size="28" class="text-slate-800"></Icon>
            </div>
            <span v-if="nama" class="self-center ml-2">{{ nama }}</span>
            <NuxtLink v-if="!nama" to="/login">
              <button class="border rounded-md px-2 py-1">
                Login
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>