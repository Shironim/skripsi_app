<script setup>
  import { inject } from 'vue'

  const {isChatActive} = inject('chat')
  const {toogle} = inject('chat')

</script>
<template>
  <div v-if="isChatActive" class="fixed bg-white border border-slate-400 overflow-hidden">
    <div class="w-full relative h-screen">
      <header class="flex flex-row p-3">
        <div class="flex">
          <figure class="self-center mr-2">
          <!-- <img src="" alt=""> -->
            <div class="w-10 h-10 bg-slate-300 rounded-full"></div>
          </figure>
          <div class="flex flex-col self-center">
            <p class="font-bold">
              ChatBot
            </p>
            <span class="text-xs">Online</span>
          </div>
        </div>
        <div class="ml-auto">
          <Icon @click="toogle" name="gg:close-o"></Icon>
        </div>
      </header>
      <main class="bg-slate-100 h-screen overflow-auto p-4">
        <div class="grid grid-cols-12 mb-4 bg-white pl-3 py-2 rounded-md">
          <div class="col-span-10">
            <p class="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, pariatur saepe. Sapiente minus ducimus distinctio nemo veniam rerum quam. 
            </p>
          </div>
        </div>
        <div class="grid grid-cols-12 mb-4 bg-white pr-3 py-2 rounded-md">
            <div class="col-start-3 col-span-12">
              <p class="text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, pariatur saepe. Sapiente minus ducimus distinctio nemo veniam rerum quam. 
              </p>
            </div>
        </div>
      </main>
      <footer class="absolute bottom-0 w-full">
        <div class="flex flex-row">
          <input type="text" class="w-full border-none focus:outline-none focus:ring-1 focus:ring-transparent" placeholder="ini input" />
          <button class="p-2 bg-slate-300">
            <Icon name="material-symbols:send"></Icon>
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>