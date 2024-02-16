<script setup>
import { useToast } from "tailvue";
import { useFormatCurrency } from "@comps/useFormatCurrency";

const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;
const baseApiImg = useRuntimeConfig().public.IMAGE_URL;
const token = useCookie("token");
// route for detail route info
const $toast = useToast();
const { toogle } = inject("chat");
const { saveHistory } = inject("historyChat");
const { toogleChatLoading } = inject("isChatLoading");
const { formatCurrencyIDR } = useFormatCurrency();
const productSearch = ref();
const namaProduk = ref("");
const route = useRoute();

const alert = (type, msg) => {
  // Use sweetalert2
  $toast.show({
    type: type,
    message: msg,
    timeout: 3,
  });
};
// fetch all camera
const { data: allCamera, loading: loadingCamera } = await useFetch("/produk", {
  method: "GET",
  baseURL: baseApiUrl,
});

const { data: produk, error } = await useAsyncData(
  "produk",
  () =>
    $fetch(`/produk/${route.params.slug}`, {
      method: "GET",
      baseURL: `${baseApiUrl}`,
    }),
  {
    watch: [route],
  }
);

const spesifikasi = JSON.parse(produk.value.data[0].spesifikasi_detail);


// Function to shuffle an array (using Fisher-Yates shuffle algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Shuffle the array of product IDs
const shuffledProduct = shuffleArray(allCamera.value?.data);

// Get the first 5 product IDs after shuffling
const rekomendasi = shuffledProduct.slice(0, 4);

const addKeranjang = async (id_produk) => {
  try {
    const { error } = useLazyFetch(`${baseApiUrl}/addcart`, {
      onRequest({ options }) {
        // Set the request headers
        options.headers = options.headers || {};
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

const userToken = localStorage.getItem("usr-token");

const submitInput = async () => {
  try {
    toogle(true);
    toogleChatLoading(true);
    const request = {
      sender: userToken,
      message: `saya mau menyewa ${namaProduk.value}`,
    };
    const { error, data: chat } = await useFetch(
      `http://localhost:5005/webhooks/rest/webhook`,
      {
        method: "POST",
        body: request,
      }
    );
    saveHistory({
      isBot: false,
      message: request.message,
    });
    if (chat.value.length > 1) {
      for (let index = 0; index < chat.value.length; index++) {
        if (chat.value[index].hasOwnProperty("custom")) {
          productSearch.value = chat.value[index].custom.data;
          for (
            let customIndex = 0;
            customIndex < chat.value[index].custom.data.length;
            customIndex++
          ) {
            saveHistory({
              isBot: true,
              message: chat.value[index].custom.data[customIndex],
            });
          }
        }
        saveHistory({
          isBot: true,
          message: chat.value[index].text,
        });
      }
    } else if (chat.value.length == 1) {
      saveHistory({
        isBot: true,
        message: chat.value[0].text,
      });
    }
  } catch (error) {
    console.log("log error", error);
  } finally {
    toogleChatLoading(false);
  }
};
const removeUnderscore = (kategoriProduk) => {
  return kategoriProduk.split("_").join(" ");
};
watchEffect(() => {
  if (!loadingCamera) {
    namaProduk.value = produk.value.data[0].nama;
  }
  if (error.value != null) {
    console.log("error :", error.value);
  }
});
</script>
<template>
  <Head>
    <Title>{{ produk.data[0].nama }} || ADMS Foto Video</Title>
    <Meta name="description" :content="`Sewa ${produk.data[0].nama} area Kota Semarang, Jawa Tengah`" />
  </Head>
  <div class="">
    <section class="md:max-w-5xl mx-auto py-8">
      <h1 class="text-2xl font-semibold pb-4">{{ produk.data[0].nama }}</h1>
      <div class="flex pb-6">
        <div class="basis-3/12">
          <figure>
            <img
              :src="`${baseApiImg}/${produk.data[0].thumbnail}`"
              :alt="produk.data[0].nama"
            />
          </figure>
        </div>
        <div class="basis-6/12 bg-white py-2 rounded-md">
          <div class="flex mb-4 px-3">
            <p
              class="font-semibold text-lg flex border-b-2 pb-2 border-gray-400"
            >
              <Icon
                class="self-center"
                name="material-symbols:android-camera"
              ></Icon>
              <span class="ml-2 self-center">Spesifikasi</span>
            </p>
          </div>
          <div class="px-3">
            <div class="block">
              <div>
                <table class="table">
                  <tr v-for="(spek, key) in spesifikasi">
                    <th class="text-start p-2 border capitalize">
                      {{ removeUnderscore(key) }}
                    </th>
                    <th class="text-end p-2 border">{{ spek }}</th>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="basis-3/12">
          <div class="rounded-md border px-3 py-4">
            <h2 class="font-bold text-lg mb-4">Informasi Produk</h2>
            <div class="mb-3">
              <p class="text-sm text-gray-700 pb-1">Harga Sewa</p>
              <div class="flex justify-between">
                <p class="text-2xl font-semibold">
                  {{ formatCurrencyIDR(produk.data[0].harga) }}
                </p>
                <p class="self-center">/ Hari</p>
              </div>
            </div>
            <div class="flex flex-col gap-y-4">
              <button
                @click="submitInput"
                class="btn border font-semibold rounded-md bg-green-400 text-white px-2 py-1"
              >
                <Icon
                  name="fluent:bot-24-filled"
                  size="24px"
                  class="text-white"
                ></Icon>
                <span class="self-center ml-2">Cek Produk</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row">
        <div class="basis-10/12 bg-white py-2 rounded-md">
          <div class="font-semibold text-lg flex pb-4">
            <div class="border-b-2 pb-2 border-gray-400">
              <Icon
                class="self-center"
                name="akar-icons:shipping-box-02"
              ></Icon>
              <span class="ml-2 self-center">Deskripsi</span>
            </div>
          </div>
          <p>{{ produk.data[0].deskripsi }}</p>
        </div>
      </div>
    </section>
  </div>
  <section class="md:max-w-5xl mx-auto">
    <div class="my-8 p-4">
      <h2 class="mb-4 font-bold text-xl">Produk Lainnya</h2>
      <div class="mb-12">
        <div class="flex flex-row flex-wrap">
          <client-only placeholder=" loading...">
            <div v-for="(produk, index) in rekomendasi" class="basis-1/4">
              <ComponentProduct :dataProduct="produk" :key="index" />
            </div>
          </client-only>
        </div>
      </div>
    </div>
  </section>
</template>
