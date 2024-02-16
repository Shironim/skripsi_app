<script setup>
const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;
let { search } = inject("search");

const { data: listProduk, error } = await useAsyncData(
  "listProduk",
  () =>
    $fetch(`/search/${search.value || 'all'}`, {
      method: "GET",
      baseURL: `${baseApiUrl}`,
    }),
  {
    watch: [search],
  }
);

</script>
<template>
  <div class="md:max-w-5xl mx-auto grid grid-cols-12 pt-12 gap-x-12">
    <div class="col-span-12">
      <div class="flex justify-between">
        <p v-if="search !== ''" class="self-center">
          Menampilkan 1 - {{ listProduk.data.length }} barang untuk <b>"{{ search }}"</b>
        </p>
        <p v-else class="self-center">
          Menampilkan semua barang 
        </p>
        <!-- <div class="flex flex-row">
          <p class="self-center mr-2">Urutkan</p>
          <select name="urutkan" id="" class="rounded-md pl-3 px-0 py-2">
            <option value="">Paling Sesuai</option>
            <option value="">Harga Tertinggi</option>
            <option value="">Harga Termurah</option>
          </select>
        </div> -->
      </div>
      <div class="pt-4">
        <section class="md:max-w-5xl mx-auto px-4">
          <div class="mb-12">
            <div class="flex flex-row flex-wrap">
              <client-only placeholder=" loading...">
                <div
                  v-for="(produk, index) in listProduk.data"
                  class="basis-1/4"
                >
                  <ComponentProduct :dataProduct="produk" :key="index" />
                </div>
              </client-only>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
