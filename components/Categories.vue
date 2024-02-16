<script setup>
// trigger function in index
const props = defineProps({
  kategori: {
    type: String,
  },
});
defineEmits(["change-kategori"]);
</script>

<template>
  <section class="md:max-w-5xl mx-auto mb-4 px-4">
    <h2 class="text-2xl font-semibold pb-2 mb-2">Kategori Pilihan</h2>
    <div class="relative w-full">
      <div class="flex flex-wrap whitespace-nowrap overflow-x-hidden">
        <div
          @click="$emit('change-kategori', '')"
          :class="
            props.kategori == ''
              ? 'bg-green-400 text-white transition-all ease-in-out'
              : ''
          "
          class="hover:cursor-pointer border rounded-xl text-neutral-500 mb-3 mr-3 px-3 py-1"
        >
          <Icon
            name="fluent:border-all-16-filled"
            class="self-center mr-2"
          ></Icon>
          <span class="self-center">Semua</span>
        </div>
        <div
          @click="$emit('change-kategori', 'kamera')"
          :class="
            props.kategori == 'kamera'
              ? 'bg-green-400 text-white transition-all ease-in-out'
              : ''
          "
          class="hover:cursor-pointer border rounded-xl text-neutral-500 mb-3 mr-3 px-3 py-1"
        >
          <Icon name="clarity:camera-solid" class="self-center mr-2"></Icon>
          <span class="self-center">Kamera Foto</span>
        </div>
        <div
          @click="$emit('change-kategori', 'camcorder')"
          :class="
            props.kategori == 'camcorder'
              ? 'bg-green-400 text-white transition-all ease-in-out'
              : ''
          "
          class="hover:cursor-pointer border rounded-xl text-neutral-500 mb-3 mr-3 px-3 py-1"
        >
          <Icon name="typcn:video" class="self-center mr-2"></Icon>
          <span class="self-center">Kamera Video</span>
        </div>
        <div
          @click="$emit('change-kategori', 'lensa')"
          :class="
            props.kategori == 'lensa'
              ? 'bg-green-400 text-white transition-all ease-in-out'
              : ''
          "
          class="hover:cursor-pointer border rounded-xl text-neutral-500 mb-3 mr-3 px-3 py-1"
        >
          <Icon name="ic:round-camera" class="self-center mr-2"></Icon>
          <span class="self-center">Lensa</span>
        </div>
        <div
          @click="$emit('change-kategori', 'kabel')"
          :class="
            props.kategori == 'kabel'
              ? 'bg-green-400 text-white transition-all ease-in-out'
              : ''
          "
          class="hover:cursor-pointer border rounded-xl text-neutral-500 mb-3 mr-3 px-3 py-1"
        >
          <Icon name="ic:twotone-cable" class="self-center mr-2"></Icon>
          <span class="self-center">Kabel</span>
        </div>
        <!-- <div :class="props.kategori == '' ? 'bg-green-400 text-white transition-all ease-in-out' : '' " class="hover:cursor-pointer border rounded-xl text-neutral-500 mb-3 mr-3 px-3 py-1">
          <Icon name="bxl:zoom" class="self-center mr-2"></Icon>
          <span class="self-center">Paket Streaming</span>
        </div>
        <div :class="props.kategori == '' ? 'bg-green-400 text-white transition-all ease-in-out' : '' " class="hover:cursor-pointer border rounded-xl text-neutral-500 mb-3 mr-3 px-3 py-1">
          <Icon name="mdi:mixer-settings" class="self-center mr-2"></Icon>
          <span class="self-center">Mixer Video</span>
        </div> -->
        <!-- <div :class="props.kategori == '' ? 'bg-green-400 text-white transition-all ease-in-out' : '' " class="hover:cursor-pointer border rounded-xl text-neutral-500 mb-3 mr-3 px-3 py-1">
          <Icon name="mdi:cast-audio" class="self-center mr-2"></Icon>
          <span class="self-center">Audio</span>
        </div>
        <div :class="props.kategori == '' ? 'bg-green-400 text-white transition-all ease-in-out' : '' " class="hover:cursor-pointer border rounded-xl text-neutral-500 mb-3 mr-3 px-3 py-1">
          <Icon name="mdi:radio-handheld" class="self-center mr-2"></Icon>
          <span class="self-center">Komunikasi</span>
        </div> -->
      </div>
    </div>
  </section>
</template>
