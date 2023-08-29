<script setup>
import { inject } from 'vue'

let { toogle } = inject('chat')
let { namaUser } = inject('namaUser')

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
            <span v-if="namaUser" class="self-center ml-2">{{ namaUser }}</span>
            <NuxtLink v-if="!namaUser" to="/login">
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