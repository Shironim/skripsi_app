<script setup>
  import { inject } from 'vue'

  let {toogle} = inject('chat')

</script>
<template>
  <nav class="w-full shadow-sm p-4 z-40 bg-white px-4 xl:px-0">
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
              <Icon name="material-symbols:shopping-cart" size="28" class="text-slate-800 mx-2"></Icon>
              <Icon @click="toogle" name="material-symbols:android-messages" size="28" class="text-slate-800 mx-2"></Icon>
            </div>
          </div>
          <div class="flex">
            <div class="bg-slate-400 h-8 w-8 rounded-full self-center ml-3"></div>
            <span class="self-center ml-2">Dimas Seto</span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>