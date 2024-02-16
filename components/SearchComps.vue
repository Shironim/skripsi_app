<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const router = useRouter();
import { debounce } from "@comps/useDebounce.js";
const emit = defineEmits(["update:modelValue"]);
const debouncedInput = debounce(
  (e) => emit("update:modelValue", e.target.value),
  300 // timeout in ms
);

const toRoute = () => {
  router.push({
    path: "/search",
  });
};

</script>

<template>
  <section class="w-full">
    <div class="flex border rounded-md border-black basis-1/2 px-2">
      <input
        type="text"
        placeholder="Search"
        :value="modelValue"
        @input="debouncedInput"
        class="w-full border-none bg-transparent focus:border-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-transparent"
      />
      <div
        @click="toRoute"
        class="self-center"
      >
        <Icon name="fluent:search-24-filled" class="text-gray-500"></Icon>
      </div>
    </div>
  </section>
</template>
