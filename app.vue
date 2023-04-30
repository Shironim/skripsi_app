<template>
  <div>
    <nav class="bg-slate-200 p-4">
      <div class="md:container mx-auto">
        <div class="grid grid-cols-12">
          <div class="text-xl self-center col-span-2">
            Logo
          </div>
          <input type="text" placeholder="Cari di toko" class="border rounded-md p-2 col-span-6">
          <div class="col-span-2 flex justify-center">
            <div class="self-center">
              <span>Chat</span>
            </div>
          </div>
          <div class="flex justify-end col-span-2">
            <div class="bg-slate-400 h-10 w-10 rounded-full"></div>
            <span class="self-center ml-2">Dimas Seto</span>
          </div>
        </div>
      </div>
    </nav>
    <section class="md:container mx-auto mb-12">
      <div class="flex pt-8">
        <span class="px-4 py-2 border rounded-xl text-neutral-500 mx-3">Kamera</span>
        <span class="px-4 py-2 border rounded-xl text-neutral-500 mx-3">Lensa</span>
        <span class="px-4 py-2 border rounded-xl text-neutral-500 mx-3">Aksesoris</span>
        <span class="px-4 py-2 border rounded-xl text-neutral-500 mx-3">Lampu</span>
      </div>
    </section>
    <section class="md:container mx-auto">
      <div class="flex p-8">
        <div class="w-[300px] h-[400px] rounded-xl bg-lime-800"></div>
        <div class="grid grid-cols-5">
          <div class="border rounded-xl overflow-hidden">
            <img src="/img/baju2.jpeg" class="h-[220] w-[200px] object-cover" alt="">
            <figcaption>
              <div class="p-4">
                <h1 class="text-xl font-bold">Baju</h1>
                <p class="text-sm">Rp. 100.000</p>
              </div>
            </figcaption>
          </div>
        </div>
      </div>
    </section>
    <!-- <NuxtWelcome /> -->
  </div>
</template>
