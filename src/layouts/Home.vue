<template>
  <div class="relative bg-gray-900">
    <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
      <!-- <img
        src="https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg"
        alt=""
        class="w-full h-full object-center object-cover"
      /> -->
    </div>
    <div aria-hidden="true" class="absolute inset-0 bg-gray-900 opacity-50" />
    <TheHeader />
    <div
      class="relative py-32 lg:py-64 px-6 lg:px-0 text-center mx-auto max-w-4xl"
    >
      <h1 class="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
        New arrivals are here
      </h1>
      <p class="mt-4 text-xl text-white">
        The new arrivals have, well, newly arrived. Check out the latest options
        from our summer small-batch release while they're still in stock.
      </p>
      <a
        href="#"
        class="mt-8 inline-block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
        >Shop New Arrivals</a
      >
    </div>
  </div>

  <main>
    <slot />
  </main>

  <TheFooter />
</template>

<script setup lang="ts">
import TheHeader from '../components/global/home/TheHeader.vue';
</script>

<style scoped>
div.sticky {
  /* position: -webkit-sticky; */
  /* position: sticky; */
  top: 0;
  background-color: yellow;
  padding: 10px;
  font-size: 20px;
}
</style>
