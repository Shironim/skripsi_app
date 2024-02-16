<script setup>
//  inject chat
let { search } = inject("search");

</script>

<template>
  <nav class="w-full sticky top-0 shadow-md p-4 z-40 bg-white px-4">
    <div class="md:max-w-5xl mx-auto">
      <div class="flex">
        <div class="text-xl self-center basis-1/12">
          <NuxtLink to="/">
            <span class="font-medium text-2xl">ADMS</span>
          </NuxtLink>
        </div>
        <div class="basis-8/12">
          <SearchComps v-model="search" />
        </div>
        <div class="self-center text-end basis-3/12">
          <!-- <NuxtLink to="/keranjang">
              <span>
                <Icon name="material-symbols:shopping-cart" size="28" class="text-slate-800 mx-2"></Icon>
              </span>
            </NuxtLink> -->
          
        </div>
      </div>
    </div>
  </nav>
</template>
