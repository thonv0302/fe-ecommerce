<template>
  <Modal title="Insert image">
    <template #body>
      <Navtab :tabs="tabs" />
    </template>
    <template #button>
      <button
        class="px-3 py-2 border text-white text-sm bg-green-600 hover:bg-green-700 transition-all rounded-md"
      >
        Insert image
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '@/components/global/common/modal/index.vue';
import Navtab from '@/components/global/common/navtab/index.vue';
import ImageGrid from '@/components/global/admin/product/ImageGrid.vue';

const tabs = ref([
  {
    name: 'Upload images',
    current: true,
    component: ImageGrid,
    props: [],
  },
  {
    name: 'Product images',
    current: false,
    component: ImageGrid,
    props: [],
  },
  { name: 'URL', current: false, component: 'h2' },
]);
</script>

<style lang="scss" scoped></style>
