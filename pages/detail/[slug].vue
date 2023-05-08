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
  const change = (nav) =>{
    naf.value = nav
  }
  const toogleLaporkan = () =>{
    showLaporkan.value = !showLaporkan.value
  }

</script>
<template>
  <section class="md:max-w-5xl mx-auto">
    <div class="flex my-8">
      <div class="basis-1/3">
        <figure>
          <img :src="cameras[0].img" :alt="cameras[0].name">
        </figure>
      </div>
      <div class="basis-1/3 flex flex-wrap">
        <div class="basis-1/2">
          <img :src="cameras[0].img" :alt="cameras[0].name" class="w-full">
        </div>
        <div class="basis-1/2">
          <img :src="cameras[0].img" :alt="cameras[0].name" class="w-full">
        </div>
        <div class="basis-1/2">
          <img :src="cameras[0].img" :alt="cameras[0].name" class="w-full">
        </div>
        <div class="basis-1/2">
          <img :src="cameras[0].img" :alt="cameras[0].name" class="w-full">
        </div>
      </div>
    </div>
    <!-- <div class="basis-1/3">
      <div class="sticky top-0 w-full">
        <h2>{{ cameras[0].name }}</h2>
        <p>
          Biaya sewa per hari: Rp. {{ cameras[0].priceDay }}
        </p>
      </div>
    </div> -->
  </section>
  <section class="md:max-w-5xl mx-auto">
    <div class="flex">
      <div class="basis-2/3">
        <div class="flex justify-around mb-4">
          <p @click="change('spesification')" class="font-semibold text-lg flex">
           <Icon class="self-center" name="material-symbols:android-camera"></Icon>
           <span class="ml-2 self-center">Spesification</span>
          </p>
          <p @click="change('included')" class="font-semibold text-lg flex">
            <Icon class="self-center" name="akar-icons:shipping-box-02"></Icon>
            <span class="ml-2 self-center">Whats Included</span>
          </p>
        </div>
        <div id="spesification" :class="naf === 'spesification' ? 'block' : 'hidden' ">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni beatae nobis reiciendis eligendi iure veritatis placeat recusandae fugiat tenetur voluptatum maiores debitis, dignissimos assumenda adipisci nemo, est sint. Magni, error.</p>
        </div>
        <div id="whats-included" :class="naf === 'included' ? 'block' : 'hidden' ">
          <p>
            lorem whats included
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="md:max-w-5xl mx-auto py-8 flex">
    <div class="basis-2/3">
      <h2 class="font-semibold text-xl mb-4">Review Product</h2>
      <section class="flex flex-row justify-between pb-8">
        <div>
          <h3>Review pilihan</h3>
          <p>Menampilkan 5 dari 12 ulasan</p>
        </div>
        <div class="flex flex-row">
          <p class="self-center mr-2">Urutkan</p>
          <select class="rounded-md" name="" id="">
            <option value="">Terbaru</option>
            <option value="">Rating Tertinggi</option>
            <option value="">Rating Terendah</option>
          </select>
        </div>
      </section>
      <section>
        <div class="pb-8">
          <div class="flex relative justify-between pb-2">
            <div class="flex flex-row self-center">
              <Icon name="ic:sharp-star-purple500" class="text-yellow-300"></Icon>
              <Icon name="ic:sharp-star-purple500" class="text-yellow-300"></Icon>
              <Icon name="ic:sharp-star-purple500" class="text-yellow-300"></Icon>
              <Icon name="ic:sharp-star-purple500" class="text-yellow-300"></Icon>
              <Icon name="ic:sharp-star-purple500" class="text-yellow-300"></Icon>
            </div>
            <div class="self-center">
              <Icon @click="toogleLaporkan" name="ph:dots-three-outline-vertical-fill"></Icon>
            </div>
            <div v-if="showLaporkan" class="absolute top-8 right-0">
              <p class="px-3 py-2 bg-white rounded-md border-2 border-slate-200">
                Laporkan Ulasan
              </p>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="flex flex-row pb-2">
              <div class="w-[40px] h-[40px] bg-slate-300 rounded-full mr-2"></div>
              <p class="self-center font-semibold">Akbar</p>
            </div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, tempore possimus. Eum eos dolor est aperiam officiis alias nam optio aliquid odit, sunt aut sapiente voluptatem iure sequi blanditiis. Quod?
            </p>
          </div>
        </div>
        <div class="pb-8">
          <div class="flex relative justify-between pb-2">
            <div class="flex flex-row self-center">
              <Icon name="ic:sharp-star-purple500" class="text-yellow-300"></Icon>
              <Icon name="ic:sharp-star-purple500" class="text-yellow-300"></Icon>
              <Icon name="ic:sharp-star-purple500" class="text-yellow-300"></Icon>
              <Icon name="ic:sharp-star-purple500" class="text-yellow-300"></Icon>
              <Icon name="ic:sharp-star-purple500" class="text-yellow-300"></Icon>
            </div>
            <div class="self-center">
              <Icon @click="toogleLaporkan" name="ph:dots-three-outline-vertical-fill"></Icon>
            </div>
            <div v-if="showLaporkan" class="absolute top-8 right-0">
              <p class="px-3 py-2 bg-white rounded-md border-2 border-slate-200">
                Laporkan Ulasan
              </p>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="flex flex-row pb-2">
              <div class="w-[40px] h-[40px] bg-slate-300 rounded-full mr-2"></div>
              <p class="self-center font-semibold">Akbar</p>
            </div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, tempore possimus. Eum eos dolor est aperiam officiis alias nam optio aliquid odit, sunt aut sapiente voluptatem iure sequi blanditiis. Quod?
            </p>
          </div>
        </div>
      </section>
      <div>
    </div>
    </div>
  </section>
  <section class="md:max-w-5xl mx-auto">
    <div class="my-8">
      <h2 class="mb-4 font-bold text-xl">Rekomendasi</h2>
      <div class="flex">
        <div class="flex flex-row flex-wrap">
          <ComponentProduct :dataProduct="allCamera" />
        </div>
      </div>
    </div>
  </section>
</template>