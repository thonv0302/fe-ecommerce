<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4" v-if="!prop.isLoading">
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
  <div v-else class="w-full flex justify-center items-center h-28">
    <Spinner :color="'text-black'" class1="w-10 h-10" />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';
import Spinner from '@/components/global/icons/Spinner.vue';

defineProps({
  prop: {
    type: Object,
  },
});

const { setImage, currentIdx } = inject('image');

const activeImage = (item, idx) => {
  if (currentIdx.value === null || currentIdx.value !== idx) {
    currentIdx.value = idx;
    setImage(item);
  } else {
    currentIdx.value = null;
    setImage(null);
  }
};

const resetCurrentIdx = () => {
  currentIdx.value = null;
};

defineExpose({
  resetCurrentIdx,
});
</script>
