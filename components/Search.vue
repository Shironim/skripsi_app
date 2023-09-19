<script setup>

defineProps({
  modelValue: {
    type: String,
    required: true,
    default: ""
  }
})

</script>

<template>
  <section class="w-full ">
    <div class="flex border rounded-md border-black basis-1/2 px-2 py-1">
      <input type="text" placeholder="Search" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
        class="w-full border-none bg-transparent focus:border-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-transparent">
      <Icon name="icon-park-outline:search" class="self-center mr-2"></Icon>
    </div>
  </section>
</template>