<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <button
      v-for="(item, idx) in prop.items"
      :key="idx"
      @click="activeImage(item, idx)"
      :class="[
        'aspect-square transition-all border hover:border-sky-600 rounded-sm flex justify-center items-center relative',
        { 'border-sky-600': currentIdx === idx },
      ]"
    >
      <img
        class="absolute max-w-full max-h-full top-0 left-0 right-0 bottom-0 m-auto"
        :src="item.url"
      />
      <CheckCircleIcon
        v-if="currentIdx === idx"
        class="absolute w-4 h-4 bottom-1 right-1 text-sky-600"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';
const props = defineProps({
  prop: {
    type: Object,
  },
});

const { setImage } = inject('image');

const currentIdx = ref(null);

const activeImage = (item, idx) => {
  currentIdx.value = idx;
  setImage(item);
};
</script>
