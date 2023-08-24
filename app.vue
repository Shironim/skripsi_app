<script setup>

import { provide } from 'vue'

const isChatActive = ref(false)

provide('chat',{
  isChatActive,
  toogle: () => {
    isChatActive.value = !isChatActive.value
  }
})



</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
