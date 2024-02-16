<script setup>
import { provide } from "vue";
import { useUtils } from "@comps/useUtils";
const token = ref("");
const idUser = ref("");
const namaUser = ref("");
const search = ref("");
const isChatActive = ref(false);
const isChatLoading = ref(false);
const historyChat = reactive([]);

const { generateRandomCode } = useUtils();

provide("chat", {
  isChatActive,
  toogle: (value) => {
    isChatActive.value = value;
  },
});
provide("isChatLoading", {
  isChatLoading,
  toogleChatLoading: (value) => {
    isChatLoading.value = value;
  },
});
provide("historyChat", {
  historyChat,
  saveHistory: (history) => {
    historyChat.push(history);
  },
});
provide("search", {
  search,
});
provide("jwtToken", {
  token,
  setToken: (jwtToken) => {
    token.value = jwtToken;
  },
  unSetToken: () => {
    token.value = "";
  },
});
provide("idUser", {
  idUser,
  setId: (id) => {
    idUser.value = id;
  },
  unSetId: () => {
    token.value = "";
  },
});
provide("namaUser", {
  namaUser,
  setNama: (nama) => {
    namaUser.value = nama;
  },
  unSetNama: () => {
    token.value = "";
  },
});

if (!localStorage.getItem("usr-token")) {
  const randomCode = generateRandomCode(12);
  localStorage.setItem("usr-token", `user-${randomCode}`);
}
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
