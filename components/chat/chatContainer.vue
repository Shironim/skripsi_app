<script setup>
import { inject } from 'vue'

const { isChatActive } = inject('chat')
const { toogle } = inject('chat')

</script>
<template>
  <div v-if="isChatActive" class="fixed min-w-[341px] bg-white border border-slate-400 overflow-hidden">
    <div class="w-full relative h-screen">
      <header class="flex flex-row p-3">
        <div class="flex">
          <figure class="self-center mr-2">
            <!-- <img src="" alt=""> -->
            <Icon name="fluent:bot-24-filled" size="30" class="text-green-400"></Icon>
          </figure>
          <div class="flex flex-col self-center">
            <p class="font-semibold">
              Chatbot
            </p>
            <span class="text-xs">Online</span>
          </div>
        </div>
        <div class="ml-auto">
          <Icon @click="toogle" name="gg:close-o"></Icon>
        </div>
      </header>
      <main class="bg-slate-100 h-screen overflow-auto p-4">
        <div class="flex mb-4 odd:justify-start">
          <p class="text-xs w-3/4 bg-white pl-3 pr-4 py-2 rounded-md">
            Hi, Selamat siang
          </p>
        </div>
        <div class="flex mb-4 even:justify-end">
          <p class="text-xs w-3/4 bg-white pl-3 pr-4 py-2 rounded-md">
            Selamat datang, boleh dijelaskan apa kebutuhannya ?
          </p>
        </div>
        <div class="flex mb-4 odd:justify-start">
          <p class="text-xs w-3/4 bg-white pl-3 pr-4 py-2 rounded-md">
            Apa saja syarat menyewa kamera ? 
          </p>
        </div>
        <div class="flex mb-4 even:justify-end">
          <p class="text-xs w-3/4 bg-white pl-3 pr-4 py-2 rounded-md">
            Untuk syarat sewa nya cukup perlu meninggalkan sementara KTP yaa.
          </p>
        </div>
        <div class="flex mb-4 odd:justify-start">
          <p class="text-xs w-3/4 bg-white pl-3 pr-4 py-2 rounded-md">
            Baik, Terimakasih 
          </p>
        </div>
        <div class="flex mb-4 even:justify-end">
          <p class="text-xs w-3/4 bg-white pl-3 pr-4 py-2 rounded-md">
            Siap, saya siap membantu
          </p>
        </div>
      </main>
      <footer class="absolute bottom-0 w-full">
        <div class="flex flex-row">
          <input type="text" class="w-full border-none focus:outline-none focus:ring-1 focus:ring-transparent"
            placeholder="Tanyakan pada chatbot" />
          <button class="p-2 bg-green-400">
            <Icon name="material-symbols:send" class="text-white"></Icon>
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>