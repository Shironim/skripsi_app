<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
useHead({
  title: "ADMIN AD/MS",
  meta: [{ name: "description", content: "Persewaan Kamera" }],
});
</script>

<template>
  <AdminNavbar />
  <AdminSidebar />
  
  <div class="p-4 sm:ml-64 mt-12 bg-slate-50 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <slot />
    </div>
  </div>
</template>