<script setup>
// route for detail route info
const route = useRoute();
// router for navigation
// const router = useRouter();
// console.log(router.install)
// console.log('fullPath', route.fullPath)
// console.log('hash', route.hash)
// console.log('params', route.params)
const data = await $fetch('/api/camera');
const cameras = data.filter((camera) => camera.slug === route.params.slug);
const allCamera = data.filter((camera) => camera.name.includes('Camera'));
// console.log(cameras)

const naf = ref('spesification')
const showLaporkan = ref(false)
const change = (nav) => {
  naf.value = nav
}
const toogleLaporkan = () => {
  showLaporkan.value = !showLaporkan.value
}

const count = ref(1);
const selectedProduct = ref(0)
const selectedMediaProduct = ref(0)

const changeSelectedProduct = (index) => {
  count.value = 1
  selectedProduct.value = index
  selectedMediaProduct.value = 0
}

const minCount = () => {
  if (count.value > 1) {
    count.value = count.value - 1
  }
}
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(number);
}

const totalHarga = () => {
  return rupiah(currentProduct.variant[selectedProduct.value].harga * count.value)
}

</script>
<template>
  <div class="">
    <section class="md:max-w-5xl mx-auto py-8">
      <h1 class="text-2xl font-semibold pb-4">{{ cameras[0].name }}</h1>
      <div class="flex pb-6">
        <div class="basis-3/12">
          <figure>
            <img :src="cameras[0].img" :alt="cameras[0].name">
          </figure>
        </div>
        <div class="basis-6/12 bg-white py-2 rounded-md">
          <div class="flex mb-4 px-3 ">
            <p class="font-semibold text-lg flex border-b-2 pb-2 border-gray-400">
              <Icon class="self-center" name="material-symbols:android-camera"></Icon>
              <span class="ml-2 self-center">Spesifikasi</span>
            </p>
          </div>
          <div class="px-3">
            <div class="block">
              <div>
                <table class="table">
                  <tr>
                    <th class="text-start p-2 border">ISO</th>
                    <th class="text-end p-2 border">100 - 12800</th>
                  </tr>
                  <tr>
                    <th class="text-start p-2 border">Shutter</th>
                    <th class="text-end p-2 border">30 - 1/4000 seconds</th>
                  </tr>
                  <tr>
                    <th class="text-start p-2 border">File Format</th>
                    <th class="text-end p-2 border">JPEG</th>
                  </tr>
                  <tr>
                    <th class="text-start p-2 border">Memory Card Type</th>
                    <th class="text-end p-2 border">SD, SDHC, SDXC</th>
                  </tr>
                  <tr>
                    <th class="text-start p-2 border">Dimensi</th>
                    <th class="text-end p-2 border">133 x 99 x 78 mm</th>
                  </tr>
                  <tr>
                    <th class="text-start p-2 border">Berat</th>
                    <th class="text-end p-2 border">580 gr</th>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="basis-3/12 ">
          <div class="rounded-md border px-3 py-4">
            <h2 class="font-bold text-lg mb-4">Informasi Produk</h2>
            <div class="mb-3 ">
              <div class="pb-2">
                <div class="flex justify-between">
                  <p class="text-md self-center">Status</p>
                  <p class="text-md bg-green-400 px-3 py-1 rounded-lg font-semibold text-white">Tersedia</p>
                </div>
              </div>
              <div class="flex justify-between">
                <p class="text-md font-semibold">Harga Sewa</p>
                <p class="text-md font-semibold">Rp. 125k / Day</p>
              </div>
            </div>
            <div class="flex flex-col gap-y-4">
              <button class="btn border font-semibold rounded-md bg-orange-400 text-white px-2 py-1">
                <Icon name="ion:cart" size="24px"></Icon>
                <span class="self-center ml-2">Simpan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row">
        <div class="basis-10/12 bg-white py-2 rounded-md">
          <div class="font-semibold text-lg flex pb-4">
            <div class="border-b-2 pb-2 border-gray-400">
              <Icon class="self-center" name="akar-icons:shipping-box-02"></Icon>
              <span class="ml-2 self-center">Deskripsi</span>
            </div>
          </div>
          <p>EOS 700D menawarkan kinerja yang padat dan penuh, merupakan salah satu DSLR yang terbaik pada entry level
            dengan kualitas gambar yang tinggi, berbagai fungsi Live View AF dan video. Layar yang bisa dilipat dan
            diputar serta dengan kemampuan layar sentuh kapasitif serta desain Mode Dialed 360 derajat yang baru dan
            Creative Filter juga pasti akan memperluas inspirasi dan ekspresi kreatif.</p>
        </div>
      </div>
    </section>
  </div>
  <section class="md:max-w-5xl mx-auto">
    <div class="my-8 p-4">
      <h2 class="mb-4 font-bold text-xl">Rekomendasi</h2>
      <div class="flex">
        <ComponentProduct :dataProduct="allCamera" />
      </div>
    </div>
</section></template>