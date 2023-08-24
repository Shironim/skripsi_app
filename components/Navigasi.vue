<script setup>
  import { inject } from 'vue'

  let {toogle} = inject('chat')

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
                <Icon name="material-symbols:shopping-cart" size="28" class="text-slate-800 mx-2"></Icon>
              </NuxtLink>
              <Icon @click="toogle" name="material-symbols:android-messages" size="28" class="text-slate-800 mx-2 cursor-pointer"></Icon>
            </div>
          </div>
          <div class="flex">
            <div class="self-center ml-3">
              <Icon name="carbon:user-avatar-filled" size="28" class="text-slate-800"></Icon>
            </div>
            <span class="self-center ml-2">Dimas Seto</span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>