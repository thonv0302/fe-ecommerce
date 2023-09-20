<template>
  <Modal title="Insert image">
    <template #body>
      <Navtab :tabs="tabs" />
    </template>
    <template #button>
      <button class="px-3 py-2 border text-white text-sm bg-green-600 hover:bg-green-700 transition-all rounded-md">
        Insert image
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import Modal from '@/components/global/common/modal/index.vue';
import Navtab from '@/components/global/common/navtab/index.vue';
import ImageGrid from '@/components/global/admin/product/ImageGrid.vue';
import EnterImageUrl from '@/components/global/admin/product/EnterImageUrl.vue'


const setImage = (data) => {
  console.log('data: ', data);
}

provide('image', {
  setImage
})

const uploadImages = [
  {
    name: 'tho dz 1',
    alt: 'tho dz',
    url: 'rose_8d0900ea-ada7-4ff5-bb67-ab721cc68637.png?v=1695188497'
  }
]

const productImages = [
  {
    name: 'tho dz 2',
    alt: 'tho dz',
    url: 'rose-1586871279171887574344_0ea8e9ae-d303-449e-93cc-424ad356abcd.webp?v=1695029432'
  }
]

// const

const tabs = ref([
  {
    name: 'Upload images',
    current: true,
    component: ImageGrid,
    props: {
      items: uploadImages
    },
  },
  {
    name: 'Product images',
    current: false,
    component: ImageGrid,
    props: {
      items: productImages
    },
  },
  { name: 'URL', current: false, component: EnterImageUrl },
]);
</script>

<style lang="scss" scoped></style>
