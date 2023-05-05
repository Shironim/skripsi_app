<script setup>
  import { inject } from 'vue'

  let {toogle} = inject('chat')
</script>
<template>
  <div class="sticky bottom-10 flex justify-end mr-4">
    <div @click="toogle" class="bg-lime-900 rounded-full p-4 flex flex-row">
      <Icon name="material-symbols:android-messages" class="text-white mx-2 self-center"></Icon>
      <p class="text-lg self-center font-bold text-white">Chat</p>
    </div>
  </div>
</template>