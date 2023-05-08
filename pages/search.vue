<script setup>
  const allCamera = await $fetch('/api/camera');
  const route = useRoute();
  let produk = reactive()
  watchEffect(() => {
    // console.log(route.query.keyword)
    produk = (allCamera.filter((item) => item.name.includes(route.query.keyword)))
    // console.log(produk)
  })
</script>
<template>
  <div class="md:max-w-5xl mx-auto grid grid-cols-12">
    <div class="col-span-3 bg-slate-200">
      <p>
        Filter
      </p>
      <div class="border rounded-sm p-2">
        <p>Kategori</p>
        <ul>
          <li>Kamera</li>
          <li>Lensa</li>
          <li>Tripod</li>
          <li>Aksesoris</li>
        </ul>
      </div>
    </div>
    <div class="col-span-9 bg-slate-300">
      <div class="flex justify-between">
        <p class="self-center">
          Menampilkan 10 dari 100 <b>Kamera Mirrorless</b>
        </p>
        <div class="flex flex-row">
          <p class="self-center mr-2">Urutkan</p>
          <select name="urutkan" id="" class="rounded-md pl-3 px-0 py-2">
            <option value="">Paling Sesuai</option>
            <option value="">Harga Tertinggi</option>
            <option value="">Harga Termurah</option>
          </select>
        </div>
      </div>
      <div class="pt-4">
        <div class="flex flex-row flex-wrap">
          <ComponentProduct :dataProduct="produk" />
        </div>
      </div>
    </div>
  </div>
</template>