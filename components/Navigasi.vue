<script setup>
import { inject } from 'vue'
//  inject chat
let { toogle, isChatActive } = inject('chat')
const search = ref('')
</script>
<template>
  <nav class="w-full sticky top-0 shadow-md p-4 z-40 bg-white px-4">
    <div class="md:max-w-5xl mx-auto">
      <div class="flex">
        <div class="text-xl self-center basis-1/12">
          <NuxtLink to="/">
            <span class="font-medium text-2xl">ADMS</span>
          </NuxtLink>
        </div>
        <div class="basis-8/12">
          <Search v-model="search" />
          <!-- <div class="flex">
            <div class="self-center ml-3 mr-2">
              <Icon name="carbon:user-avatar-filled" size="28" class="text-slate-800"></Icon>
            </div>
          </div> -->
        </div>
        <div class="self-center text-end basis-3/12">
          <!-- <NuxtLink to="/keranjang">
                <span>
                  <Icon name="material-symbols:shopping-cart" size="28" class="text-slate-800 mx-2"></Icon>
                </span>
              </NuxtLink> -->
          <div v-if="!isChatActive" class="flex justify-end">
            <div @click="toogle" class="cursor-pointer border border-slate-900 rounded-md px-3 py-2">
              <span>Ask Chatbot</span>
              <Icon name="fluent:bot-24-filled" class="mx-2 self-center text-green-400"></Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>