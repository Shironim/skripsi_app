<script setup>
import { onMounted } from 'vue'

</script>

<template>
  <AdminNavbar />
  <AdminSidebar />
  
  <div class="p-4 sm:ml-64 mt-12 ">
    <slot />
  </div>
</template>