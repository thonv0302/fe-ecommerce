<template>
  <Modal title="Insert image">
    <template #body>
      <Navtab :tabs="tabs" @activeTab="(isUpload) => activeTab(isUpload)" />
    </template>
    <template #button>
      <button v-if="isUploadFile"
        class="relative px-3 py-2 border text-sm bg-gray-50 transition-all hover:bg-gray-100 rounded-md me-2">
        Upload file
        <input type="file" class="absolute top-0 left-0 bottom-0 right-0 opacity-0" @change="uploadFile" />
      </button>
      <button @click="insertImage" :disable="imgUrl === ''" :class="[
        'px-3 py-2 border text-white text-sm transition-all rounded-md',
        {
          'bg-green-600 hover:bg-green-700': imgUrl !== '',
          'bg-gray-400': imgUrl === '',
        },
      ]">
        Insert image
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue';
import Modal from '@/components/global/common/modal/index.vue';
import Navtab from '@/components/global/common/navtab/index.vue';
import ImageGrid from '@/components/global/admin/product/ImageGrid.vue';
import EnterImageUrl from '@/components/global/admin/product/EnterImageUrl.vue';
import { useImageStore } from '@/stores/imageStore.ts'

const imageStore = useImageStore()

const emits = defineEmits(['insertImageUrl']);

const imgUrl = ref('');
const isUploadFile = ref(false);
const setImage = (data: any) => {
  const regex = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
  if (regex.test(data.url)) {
    imgUrl.value = data.url;
  } else {
    imgUrl.value = '';
  }
};

const insertImage = () => {
  if (imgUrl.value !== '') {
    emits('insertImageUrl', imgUrl.value);
  }
};

provide('image', {
  setImage,
});

const uploadFile = async (e) => {
  // debugger;

  await imageStore.createImage({
    name: 'tho', alt: 'abc', url: 'https://cdn.shopify.com/s/files/1/0834/2087/3014/files/rose_8d0900ea-ada7-4ff5-bb67-ab721cc68637.png?v=1695188497', size: 2000, type: 'image/png', belong: 'product'
  })
};

const activeTab = (isUpload: boolean) => {
  imgUrl.value = '';
  isUploadFile.value = isUpload;
};

const uploadImages = [
  {
    name: 'tho dz 1',
    alt: 'tho dz',
    url: 'https://cdn.shopify.com/s/files/1/0834/2087/3014/files/rose_8d0900ea-ada7-4ff5-bb67-ab721cc68637.png?v=1695188497',
  },
];

const productImages = [
  {
    name: 'tho dz 2',
    alt: 'tho dz',
    url: 'https://cdn.shopify.com/s/files/1/0834/2087/3014/files/rose-1586871279171887574344_0ea8e9ae-d303-449e-93cc-424ad356abcd.webp?v=1695029432',
  },
];

const tabs = ref([
  {
    name: 'Upload images',
    current: true,
    isUploadFile: true,
    component: () => ImageGrid,
    props: {
      items: uploadImages,
    },
  },
  {
    name: 'Product images',
    current: false,
    isUploadFile: false,
    component: () => ImageGrid,
    props: {
      items: productImages,
    },
  },
  { name: 'URL', current: false, component: () => EnterImageUrl },
]);

onMounted(() => {
  activeTab(true);
});
</script>

<style lang="scss" scoped></style>
