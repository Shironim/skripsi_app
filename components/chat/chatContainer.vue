<script setup>
import { inject } from "vue";

const { isChatActive, toogle } = inject("chat");
const { historyChat, saveHistory } = inject("historyChat");
const { isChatLoading, toogleChatLoading } = inject("isChatLoading");
const inputChat = ref("");
const baseApiUrl = useRuntimeConfig().public.BASE_API_URL;
const productSearch = ref();

const userToken = localStorage.getItem("usr-token");
import { useFormatCurrency } from "@comps/useFormatCurrency";

const { formatCurrencyIDR } = useFormatCurrency();
const submitInput = async (input) => {
  try {
    toogleChatLoading(true);
    const request = {
      sender: userToken,
      message: input,
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
    inputChat.value = "";
  }
};
const addProductToCart = async (produk) => {
  try {
    toogleChatLoading(true);
    const request = {
      sender: userToken,
      message: `Saya mau menambah ${produk} ke keranjang belanja`,
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

</script>
<template>
  <div
    v-if="isChatActive"
    class="fixed overflow-hidden bg-white rounded-md border w-[500px] h-[600px] bottom-28 right-3 flex justify-end mr-4"
  >
    <div class="relative w-full bg-slate-100">
      <header class="flex flex-row p-3 border-b bg-white">
        <div class="flex">
          <figure class="self-center mr-2">
            <!-- <img src="" alt=""> -->
            <Icon
              name="fluent:bot-24-filled"
              size="30"
              class="text-green-400"
            ></Icon>
          </figure>
          <div class="flex flex-col self-center">
            <p class="font-semibold">Chatbot</p>
            <span class="text-xs">Online</span>
          </div>
        </div>
        <div class="ml-auto cursor-pointer">
          <Icon @click="toogle(false)" name="gg:close-o"></Icon>
        </div>
      </header>
      <main class="overflow-auto p-4 h-[450px]">
        <div
          v-for="(data, index) in historyChat"
          class="flex mb-4"
          :class="data.isBot ? 'justify-end' : 'justify-start'"
        >
          <p
            v-if="typeof data.message === 'string'"
            class="text-xs w-auto bg-white pl-3 pr-4 py-2 rounded-md"
            :class="data.isBot ? 'ml-12' : ''"
          >
            {{ data.message }}
          </p>
          <div
            v-if="typeof data.message === 'object'"
            class="text-xs w-auto bg-white pl-3 pr-4 py-2 rounded-md"
            :class="data.isBot ? 'ml-12' : ''"
          >
            <div>
              <p class="pb-2 text-md">{{ data.message.nama }}</p>
              <NuxtImg
                :src="`${baseApiUrl}/${data.message.thumbnail}`"
                width="80px"
                height="80px"
                class="pb-2"
              />
              <div class="flex flex-col">
                <p class="font-bold text-md mb-2">
                  {{ formatCurrencyIDR(data.message.harga) }}
                </p>
                <button
                  @click="addProductToCart(data.message.nama)"
                  class="bg-green-400 px-4 py-1 rounded-sm text-white"
                >
                  Pilih
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer class="absolute bg-white bottom-0 w-full p-2 pb-3">
        <div class="pb-2">
          <div class="flex overflow-x-auto whitespace-nowrap gap-x-2">
            <button
              @click="submitInput('lihat keranjang belanja')"
              class="flex text-green-500 justify-center text-xs text-center flex-nowrap overflow-hidden whitespace-nowrap cursor-pointer h-[32px] border px-2 py-1 border-green-400 rounded-full"
            >
              <span
                class="self-center max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis"
                >lihat keranjang belanja dong</span
              >
            </button>
            <button
              @click="submitInput('Apa saja ketentuan sewa ?')"
              class="flex text-green-500 justify-center text-xs text-center flex-nowrap overflow-hidden whitespace-nowrap cursor-pointer h-[32px] border px-2 py-1 border-green-400 rounded-full"
            >
              <span
                class="self-center max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis"
                >Apa saja ketentuan sewa ?</span
              >
            </button>
            <button
              @click="
                submitInput('Pembayarannya apakah bisa transfer atau cash ?')
              "
              class="flex text-green-500 justify-center text-xs text-center flex-nowrap overflow-hidden whitespace-nowrap cursor-pointer h-[32px] border px-2 py-1 border-green-400 rounded-full"
            >
              <span
                class="self-center max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis"
                >Pembayarannya apakah bisa transfer atau cash ?</span
              >
            </button>
            <div
              class="rounded-full justify-center ml-auto cursor-pointer self-center"
            >
              <Icon
                name="mingcute:up-fill"
                class="text-green-400 mx-auto w-[32px] self-center"
              ></Icon>
            </div>
          </div>
        </div>
        <div class="flex flex-row gap-x-2">
          <input
            type="text"
            v-model="inputChat"
            class="w-full border-green-400 focus:border-green-400 focus:outline-none focus:ring focus:ring-green-400 rounded-full"
            placeholder="Tanyakan pada chatbot"
          />
          <button class="bg-green-400 px-1 rounded-full justify-center">
            <Icon
              v-if="!isChatLoading"
              @click="submitInput(inputChat)"
              name="material-symbols:send"
              class="text-white mx-auto w-[32px] self-center"
            ></Icon>
            <div v-if="isChatLoading" class="loader"></div>
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>
