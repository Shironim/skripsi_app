<script setup>
  const router = useRouter()
  const keyword = ref('')

  import { inject } from 'vue'

  let {toogle} = inject('chat')

  const handleSearch = (e) => {
    // how to check if enter key is pressed?
    if (e.keyCode === 13) {
      console.log('enter')
      router.push({
        path: '/search',
        query: {
          keyword: keyword.value
        }
      })
      keyword.value = ''
    }
  }
</script>
<template>
  <nav class="bg-white shadow-sm p-4">
    <div class="md:max-w-5xl mx-auto">
      <div class="grid grid-cols-12">
        <div class="text-xl self-center col-span-2">
          <NuxtLink to="/">
            <span class="font-medium text-2xl">AD/MS</span>
          </NuxtLink>
        </div>
        <input @keypress="handleSearch" v-model="keyword" type="text" placeholder="Cari di toko" class="border rounded-md p-2 col-span-6">
        <div class="col-span-2 flex justify-center border-r-2 border-r-black">
          <div class="self-center">
            <Icon name="material-symbols:shopping-cart" class="text-slate-800 mx-2"></Icon>
            <Icon name="material-symbols:notifications" class="text-slate-800 mx-2"></Icon>
            <Icon @click="toogle" name="material-symbols:android-messages" class="text-slate-800 mx-2"></Icon>
          </div>
        </div>
        <div class="flex justify-end col-span-2">
          <div class="bg-slate-400 h-8 w-8 rounded-full self-center"></div>
          <span class="self-center ml-2">Dimas Seto</span>
        </div>
      </div>
    </div>
  </nav>
</template>