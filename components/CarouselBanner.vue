<script setup>

const isDragging = ref(false);
const prevPageX = ref();
const prevScrollLeft = ref();

const dragStop = () =>{
  isDragging.value = false;
}

onMounted(() => {

  const carousel = document.querySelector('.carousel');

  const dragging = (e) =>{
    if(!isDragging.value) return;
    e.preventDefault();
    carousel.scrollLeft = e.pageX;
    let diffPosition = e.pageX - prevPageX.value;
    carousel.scrollLeft = prevScrollLeft.value - diffPosition;
  }

  const dragStart = (e) =>{
    isDragging.value = true;
    prevPageX.value = e.pageX;
    prevScrollLeft.value = carousel.scrollLeft;
  }

  carousel.addEventListener('mousedown', dragStart)
  carousel.addEventListener('mouseup', dragStop)
  carousel.addEventListener('mousemove', dragging)
})
</script>
<template>
  <section class="md:max-w-5xl mx-auto">
    <div class="my-8 relative">
      <div class="flex flex-row overflow-hidden carousel gap-x-2 w-full min-h-[340px]">
        <img class="rounded-md" width="100%" height="340px" src="/images/Orbiter-Home.png" alt="">
        <img class="rounded-md" src="/images/Orbiter-Home.png" alt="">
        <img class="rounded-md" src="/images/Orbiter-Home.png" alt="">
        <img class="rounded-md" src="/images/Orbiter-Home.png" alt="">
        <img class="rounded-md" src="/images/Orbiter-Home.png" alt="">
        <img class="rounded-md" src="/images/Orbiter-Home.png" alt="">
      </div>
      <div class="absolute top-1/2 flex arrow justify-between w-full px-4 text-white">
        <Icon id="arrow-left" name="carbon:previous-filled" size="36"></Icon>
        <Icon id="arrow-right" name="carbon:next-filled" size="36"></Icon>
      </div>
    </div>
  </section>
</template>