<script setup>
  import { inject } from 'vue'

  const {isChatActive} = inject('chat')

</script>
<template>
  <div v-if="isChatActive" class="sticky flex ml-auto mr-4 rounded-md bottom-[110px] w-[400px] h-[400px] bg-white border border-black overflow-hidden">
    <div class="w-full relative">
      <header class="flex flex-row border-b-2 border-b-black p-4">
        <figure class="self-center mr-2">
          <!-- <img src="" alt=""> -->
          <div class="w-10 h-10 bg-slate-300 rounded-full"></div>
        </figure>
        <div class="flex flex-col self-center">
          <p class="font-bold">
            Admin
          </p>
          <span class="text-xs">Online</span>
        </div>
      </header>
      <main class="bg-slate-200 h-screen overflow-y-scroll">
        <div class="p-4">
          <div class="grid grid-cols-12 mb-4">
            <div class="col-span-10">
              <p class="text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, pariatur saepe. Sapiente minus ducimus distinctio nemo veniam rerum quam. 
              </p>
            </div>
          </div>
          <div class="grid grid-cols-12 mb-4">
            <div class="col-start-2 col-span-10">
              <p class="text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              </p>
            </div>
          </div>
          <div class="grid grid-cols-12 mb-4">
            <div class="col-span-10">
              <p class="text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, pariatur saepe. Sapiente minus ducimus distinctio nemo veniam rerum quam. 
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer class="absolute bottom-0 w-full">
        <div class="flex flex-row">
          <input type="text" class=" w-full border-none" placeholder="ini input" />
          <button class="p-2 bg-slate-300">
            <Icon name="material-symbols:send"></Icon>
          </button>
        </div>
      </footer>
    </div>
  </div>
  <ChatToogle/>
</template>