<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
</script>

<template>
  <AdminNavbar />
  <AdminSidebar />
  
  <div class="p-4 sm:ml-64 mt-12 bg-slate-50 h-screen">
    <slot />
  </div>
</template>