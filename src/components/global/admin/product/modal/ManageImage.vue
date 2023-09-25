<template>
  <Modal title="Insert image">
    <template #body>
      <Navtab :tabs="tabs" @activeTab="(tab) => activeTab(tab)" />
    </template>
    <template #button-start v-if="pagination.next_cursor || pagination.previous_cursor">
      <div class="me-auto">
        <button :disabled="!pagination.previous_cursor" @click="prevImages"
          class="px-1 py-2 border text-sm transition-all hover:bg-gray-100 rounded-l-md me-1">
          <ChevronLeftIcon :class="['w-4 h-4', {
            'text-gray-500': !pagination.previous_cursor
          }]" />
        </button>
        <button :disabled="!pagination.next_cursor" @click="nextImages"
          class="px-1 py-2 border text-sm transition-all hover:bg-gray-100 rounded-r-md">
          <ChevronRightIcon :class="['w-4 h-4', {
            'text-gray-500': !pagination.previous_cursor
          }]" />
        </button>
      </div>
    </template>
    <template #buttons-end>

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
import { ref, provide, onMounted, reactive } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import Modal from '@/components/global/common/modal/index.vue';
import Navtab from '@/components/global/common/navtab/index.vue';
import ImageGrid from '@/components/global/admin/product/ImageGrid.vue';
import EnterImageUrl from '@/components/global/admin/product/EnterImageUrl.vue';
import { useImageStore } from '@/stores/imageStore.ts';

const imageStore = useImageStore();

const emits = defineEmits(['insertImageUrl']);

const imgUrl = ref('');
const pagination = reactive({
  next_cursor: null,
  previous_cursor: null
});
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

const uploadFile = async (e: any) => {
  await imageStore.createImage(e.target.files[0]);
};

const activeTab = (tab: any) => {
  imgUrl.value = '';
  isUploadFile.value = tab.isUpload;
  pagination.next_cursor = tab.pagination.next_cursor;
  pagination.previous_cursor = tab.pagination.previous_cursor
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
    pagination: {
      next_cursor: null,
      previous_cursor: null
    },
    props: {
      items: uploadImages,
    },
  },
  {
    name: 'Product images',
    current: false,
    isUploadFile: false,
    component: () => ImageGrid,
    pagination: {
      next_cursor: null,
      previous_cursor: null,
    },
    props: {
      items: productImages,
    },
  },
  { name: 'URL', current: false, component: () => EnterImageUrl },
]);

const prevImages = async () => {
  const { uploadedImages } = await imageStore.getImages({
    next_cursor: pagination.next_cursor,
    previous_cursor: pagination.previous_cursor
  });

  console.log('uploadedImages: ', uploadedImages);

  tabs.value[0].pagination.next_cursor = uploadedImages.pageInfo.next_cursor;
  tabs.value[0].pagination.previous_cursor
    = uploadedImages.pageInfo.previous_cursor
    ;


  pagination.next_cursor = tabs.value[0].pagination.next_cursor;
  pagination.previous_cursor = tabs.value[0].pagination.previous_cursor
}

const nextImages = async () => {
  const { uploadedImages } = await imageStore.getImages({
    next_cursor: pagination.next_cursor,
    previous_cursor: pagination.previous_cursor
  });

  console.log('uploadedImages: ', uploadedImages);

  tabs.value[0].pagination.next_cursor = uploadedImages.pageInfo.next_cursor;
  tabs.value[0].pagination.previous_cursor
    = uploadedImages.pageInfo.previous_cursor
    ;


  pagination.next_cursor = tabs.value[0].pagination.next_cursor;
  pagination.previous_cursor = tabs.value[0].pagination.previous_cursor
}

onMounted(async () => {
  const { uploadedImages } = await imageStore.getImages({
    next_cursor: null,
    previous_cursor: null
  });
  tabs.value[0].pagination.next_cursor = uploadedImages.pageInfo.next_cursor;
  tabs.value[0].pagination.previous_cursor
    = uploadedImages.pageInfo.previous_cursor
    ;

  tabs.value[0].props.items = uploadedImages.edges
  activeTab(tabs.value[0]);
});
</script>

<style lang="scss" scoped></style>
