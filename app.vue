<script setup>

import { onMounted } from 'vue'
import { provide } from 'vue'
import { initFlowbite } from 'flowbite'

const isChatActive = ref(false)

provide('chat',{
  isChatActive,
  toogle: () => {
    isChatActive.value = !isChatActive.value
  }
})

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})

</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
