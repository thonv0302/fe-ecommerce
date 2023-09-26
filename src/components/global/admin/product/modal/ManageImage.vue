<template>
  <Modal title="Insert image">
    <template #body>
      <Navtab :tabs="tabs" @activeTab="(tab) => activeTab(tab)" />
    </template>
    <template #button-start>
      <div
        class="me-auto"
        v-if="currentTab.firstItemCursor || currentTab.lastItemCursor"
      >
        <button
          :disabled="!currentTab.firstItemCursor"
          @click="prevImages"
          :class="[
            'px-1 py-2 border text-sm transition-all rounded-l-md me-1',
            {
              'hover:bg-gray-100': currentTab.firstItemCursor,
            },
          ]"
        >
          <ChevronLeftIcon
            :class="[
              'w-4 h-4',
              {
                'text-gray-500': !currentTab.firstItemCursor,
              },
            ]"
          />
        </button>
        <button
          :disabled="!currentTab.lastItemCursor"
          @click="nextImages"
          :class="[
            'px-1 py-2 border text-sm transition-all rounded-r-md',
            {
              'hover:bg-gray-100': currentTab.lastItemCursor,
            },
          ]"
        >
          <ChevronRightIcon
            :class="[
              'w-4 h-4',
              {
                'text-gray-500': !currentTab.lastItemCursor,
              },
            ]"
          />
        </button>
      </div>
    </template>
    <template #buttons-end>
      <button
        v-if="isUploadFile"
        class="relative px-3 py-2 border text-sm bg-gray-50 transition-all hover:bg-gray-100 rounded-md me-2"
      >
        Upload file
        <input
          type="file"
          class="absolute top-0 left-0 bottom-0 right-0 opacity-0"
          @change="uploadFile"
        />
      </button>
      <button
        @click="insertImage"
        :disable="imgUrl === ''"
        :class="[
          'px-3 py-2 border text-white text-sm transition-all rounded-md',
          {
            'bg-green-600 hover:bg-green-700': imgUrl !== '',
            'bg-gray-400': imgUrl === '',
          },
        ]"
      >
        Insert image
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import Modal from '@/components/global/common/modal/index.vue';
import Navtab from '@/components/global/common/navtab/index.vue';
import ImageGrid from '@/components/global/admin/product/ImageGrid.vue';
import EnterImageUrl from '@/components/global/admin/product/EnterImageUrl.vue';
import { useImageStore } from '@/stores/imageStore.ts';

const imageStore = useImageStore();

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

const uploadFile = async (e: any) => {
  await imageStore.createImage(e.target.files[0]);
};

const currentTab = ref<any>({});

const activeTab = (tab: any) => {
  imgUrl.value = '';
  isUploadFile.value = tab.isUpload;
  currentTab.value = tabs.value[tab.index] as any;
};

const tabs = ref([
  {
    name: 'Upload images',
    current: true,
    isUploadFile: true,
    component: () => ImageGrid,
    type: 'shop',
    props: {
      items: [],
    },
    firstItemCursor: null,
    lastItemCursor: null,
  },
  {
    name: 'Product images',
    current: false,
    isUploadFile: false,
    component: () => ImageGrid,
    type: 'product',
    props: {
      items: [],
    },
    firstItemCursor: null,
    lastItemCursor: null,
  },
  { name: 'URL', current: false, component: () => EnterImageUrl },
]);

const prevImages = async () => {
  const { productImages, uploadedImages } = (await imageStore.getImages({
    belong: currentTab.value.type,
    next_cursor: currentTab.value.lastItemCursor,
    previous_cursor: currentTab.value.firstItemCursor,
  })) as any;
  if (currentTab.value.type === 'product') {
    findTabMapData(productImages);
  }
  if (currentTab.value.type === 'shop') {
    findTabMapData(uploadedImages);
  }
};

const nextImages = async () => {
  const { productImages, uploadedImages } = (await imageStore.getImages({
    belong: currentTab.value.type,
    next_cursor: currentTab.value.lastItemCursor,
    previous_cursor: currentTab.value.firstItemCursor,
  })) as any;
  if (currentTab.value.type === 'product') {
    findTabMapData(productImages);
  }
  if (currentTab.value.type === 'shop') {
    findTabMapData(uploadedImages);
  }
};

onMounted(async () => {
  const { productImages, uploadedImages } = (await imageStore.getImages(
    {}
  )) as any;
  findTabMapData(productImages);
  findTabMapData(uploadedImages);
  activeTab({
    isUpload: tabs.value[0].isUploadFile,
    index: 0,
  });
});

const findTabMapData = (images: any) => {
  const foundTab = tabs.value.find((e) => e.type === images.belong);
  if (foundTab && foundTab.props) {
    foundTab.props.items = images.data;
    foundTab['firstItemCursor'] = images.firstItemCursor;
    foundTab['lastItemCursor'] = images.lastItemCursor;
  }
};
</script>

<style lang="scss" scoped></style>
