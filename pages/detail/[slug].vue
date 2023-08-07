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
      <div class="flex pb-6">
        <div class="basis-1/3">
          <figure>
            <img :src="cameras[0].img" :alt="cameras[0].name">
          </figure>
        </div>
        <div class="basis-1/3 bg-white py-2 rounded-md">
          <div class="flex mb-4 px-3 ">
            <p class="font-semibold text-lg flex">
              <Icon class="self-center" name="material-symbols:android-camera"></Icon>
              <span class="ml-2 self-center">Spesification</span>
            </p>
          </div>
          <div class="px-3">
            <div class="block">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni beatae nobis reiciendis eligendi iure
                veritatis placeat recusandae fugiat tenetur voluptatum maiores debitis, dignissimos assumenda adipisci
                nemo, est sint. Magni, error.</p>
            </div>
          </div>
        </div>
        <div class="basis-1/4 ml-auto">
          <h2 class="font-bold text-lg">Atur Jumlah dan Catatan</h2>
          <div class="flex sm:flex-row md:flex-col flex-col">
            <div class="flex my-4 basis-full">
            </div>
            <div class="flex my-4 basis-full">
              <div class="flex h-[34px] self-center">
                <button @click="minCount"
                  class="self-center max-h-[34px] btn border px-2 py-1 rounded-tl-md rounded-bl-md"
                  :class="count == 1 ? 'bg-slate-300' : ''">
                  <Icon name="ph:minus-bold"></Icon>
                </button>
                <p class=" border-t border-b py-1 w-[60px] h-full text-center self-center">
                  {{ count }}
                </p>
                <button @click="count += 1"
                  class="self-center max-h-[34px] btn border px-2 py-1 rounded-tr-md rounded-br-md">
                  <Icon name="ph:plus-bold"></Icon>
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-y-4">
            <button class="btn border font-semibold rounded-md bg-orange-400 text-white px-2 py-1">
              <Icon name="ion:cart" size="24px"></Icon>
              <span class="self-center ml-2">Beli Sekarang</span>
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-row">
        <div class="basis-10/12 bg-white py-2 rounded-md">
          <p class="font-semibold text-lg flex">
            <Icon class="self-center" name="akar-icons:shipping-box-02"></Icon>
            <span class="ml-2 self-center">Whats Included</span>
          </p>
          <div class="block">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni beatae nobis reiciendis eligendi iure
              veritatis placeat recusandae fugiat tenetur voluptatum maiores debitis, dignissimos assumenda adipisci nemo,
              est sint. Magni, error.</p>
          </div>
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
  </section>
</template>