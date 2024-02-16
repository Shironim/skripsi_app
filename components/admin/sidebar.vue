<script setup>
const router = useRouter();

const currentRouter = computed(() => {
  return router.currentRoute.value.path.split("/")[2];
});

let sidebarList = [
  {
    to: "/admin",
    router: undefined,
    icon: "icon-park-solid:home",
    label: "Dashboard",
  },
  {
    to: "/admin/list-produk",
    router: "list-produk",
    icon: "fluent:box-20-filled",
    label: "Produk",
  },
  {
    to: "/admin/pengembalian-alat",
    router: "pengembalian-alat",
    icon: "fluent:box-arrow-up-20-filled",
    label: "Pengembalian",
  },
  {
    to: "/admin/list-transaksi",
    router: "list-transaksi",
    icon: "basil:invoice-solid",
    label: "Invoice",
  },
];
</script>

<template>
  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li v-for="item in sidebarList">
          <NuxtLink
            :to="item.to"
            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
            :class="currentRouter === item.router ? 'bg-gray-100' : ''"
          >
            <Icon
              :name="item.icon"
              class="transition duration-75"
              :class="
                currentRouter === item.router
                  ? 'text-indigo-700'
                  : 'text-gray-500'
              "
            />

            <span class="ml-3">{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </aside>
</template>
