<script setup>
const props = defineProps({
  dataProduct: {
    type: Object,
    default: {},
  },
});
import { useToast } from "tailvue";
import { useFormatCurrency } from "@comps/useFormatCurrency";

const baseApiUrl = useRuntimeConfig().public.IMAGE_URL;
const token = useCookie("token");

const { formatCurrencyIDR } = useFormatCurrency();

const $toast = useToast();
const alert = (type, msg) => {
  // Use sweetalert2
  $toast.show({
    type: type,
    message: msg,
    timeout: 3,
  });
};
const addKeranjang = async (id_produk) => {
  try {
    const { error } = useLazyFetch(`${baseApiUrl}/addcart`, {
      onRequest({ options }) {
        // Set the request headers
        options.headers = options.headers || {};
        options.headers.authorization = `Bearer ${token.value}`;
      },
      method: "POST",
      body: JSON.stringify({
        id_produk: id_produk,
      }),
    });
    if (!error) {
      alert("success", "Berhasil ditambahkan ke keranjang");
    } else {
      if (error.value?.statusCode == 401) {
        alert("danger", "Silahkan login terlebih dahulu");
      }
    }
  } catch (error) {
    console.log("log error", error);
  }
};

const typeProduk = (type) =>{
  switch (type) {
    case 'kamera':
      return 'Kamera'
    case 'lensa':
      return 'Lensa'
    case 'tripod':
      return 'Tripod'
    case 'tv_monitor':
      return 'TV / Monitor'
    case 'kabel':
      return 'Kabel'
    case 'camcorder':
      return 'Camcorder'
    default:
      return 'DEFAULT'
  }
}

</script>
<template>
  <div class="border rounded-md mr-3 mb-3 overflow-hidden">
    <div>
      <NuxtImg
        :src="`${baseApiUrl}/${props.dataProduct.thumbnail}`"
        :alt="props.dataProduct.nama"
        class="mx-auto h-[180px] py-2"
        height="180px"
        width="100%"
        fit="cover"
      />
    </div>
    <div class="flex flex-col">
      <div class="p-4">
        <h1 class="text-md min-h-[48px]">{{ props.dataProduct.nama }}</h1>
        <p class="text-lg font-bold">
          {{ formatCurrencyIDR(props.dataProduct.harga) }} /Hari
        </p>
      </div>
      <div class="flex border-t">
        <NuxtLink
          :to="`/detail/${props.dataProduct.slug}`"
          class="basis-full transition-all hover:bg-orange-400 hover:text-white"
        >
          <button class="p-2 w-full text-md">
            <Icon name="tabler:camera-search" class="mx-2"></Icon>
            <span>Detail {{ typeProduk(props.dataProduct.type_produk) }}</span>
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
