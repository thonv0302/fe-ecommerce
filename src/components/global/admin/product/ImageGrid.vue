<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <button v-for="(item, idx) in prop.items" :key="idx" @click="activeImage(item)"
      class="aspect-square border rounded-sm flex justify-center items-center relative">
      <img class=" absolute max-w-full max-h-full top-0 left-0 right-0 bottom-0 m-auto"
        :src="'https://cdn.shopify.com/s/files/1/0834/2087/3014/files/' + item.url" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
const props = defineProps({
  prop: {
    type: Object
  }
})

const { setImage } = inject('image');

const currentIdx = ref(null)


const activeImage = (item) => {
  setImage(item)
}
</script>
