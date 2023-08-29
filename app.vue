<script setup>

import { provide } from 'vue'

const isChatActive = ref(false)
const token = ref('')
const idUser = ref('')
const namaUser = ref('')

provide('chat',{
  isChatActive,
  toogle: () => {
    isChatActive.value = !isChatActive.value
  }
})
provide('jwtToken',{
  token,
  setToken: (jwtToken) => {
    token.value = jwtToken
  },
  unSetToken: () => {
    token.value = ""
  },
})
provide('idUser',{
  idUser,
  setId: (id) => {
    idUser.value = id
  },
  unSetId: () => {
    token.value = ""
  },
})
provide('namaUser',{
  namaUser,
  setNama: (nama) => {
    namaUser.value = nama
  },
  unSetNama: () => {
    token.value = ""
  },
})



</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
