<template>
  <div class="flex items-start overflow-x-auto gap-4"></div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const optionName = ref([
  {
    id: 1,
    title: 'Size',
    slug: 'size',
  },
  {
    id: 2,
    title: 'Color',
    slug: 'color',
  },
  {
    id: 3,
    title: 'Material',
    slug: 'material',
  },
  {
    id: 4,
    title: 'Style',
    slug: 'style',
  },
]);
</script>

<style scoped></style>
