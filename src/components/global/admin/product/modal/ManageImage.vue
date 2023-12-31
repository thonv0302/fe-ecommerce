<template>
  <Modal title="Insert image" :show="isShowModal">
    <template #body>
      <Navtab :tabs="tabs" @activeTab="(tab) => activeTab(tab)" />
    </template>
    <template #button-start>
      <div
        class="me-auto"
        v-if="currentTab.firstItemCursor || currentTab.lastItemCursor"
      >
        <button
          :disabled="!currentTab.firstItemCursor || currentTab.props.isLoading"
          @click="prevOrNextImages('prev')"
          :class="[
            'px-1 py-2 border text-sm transition-all rounded-l-md me-1',
            {
              'hover:bg-gray-100':
                currentTab.firstItemCursor || !currentTab.props.isLoading,
            },
          ]"
        >
          <ChevronLeftIcon
            :class="[
              'w-4 h-4',
              {
                'text-gray-400':
                  !currentTab.firstItemCursor || currentTab.props.isLoading,
              },
            ]"
          />
        </button>
        <button
          :disabled="!currentTab.lastItemCursor || currentTab.props.isLoading"
          @click="prevOrNextImages('next')"
          :class="[
            'px-1 py-2 border text-sm transition-all rounded-r-md',
            {
              'hover:bg-gray-100':
                currentTab.lastItemCursor || !currentTab.props.isLoading,
            },
          ]"
        >
          <ChevronRightIcon
            :class="[
              'w-4 h-4',
              {
                'text-gray-400':
                  !currentTab.lastItemCursor || currentTab.props.isLoading,
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
import { ref, provide, watch, onUnmounted } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import Modal from '@/components/global/common/modal/index.vue';
import Navtab from '@/components/global/common/navtab/index.vue';
import ImageGrid from '@/components/global/admin/product/ImageGrid.vue';
import EnterImageUrl from '@/components/global/admin/product/EnterImageUrl.vue';
import { useImageStore } from '@/stores/imageStore.ts';

const imageStore = useImageStore();

const props = defineProps({
  isShowModal: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['insertImageUrl']);

const imgUrl = ref('');
const isUploadFile = ref(false);
const setImage = (data: any) => {
  if (data) {
    const regex = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
    if (regex.test(data.url)) {
      imgUrl.value = data.url;
    } else {
      imgUrl.value = '';
    }
  } else {
    imgUrl.value = '';
  }
};

const insertImage = () => {
  if (imgUrl.value !== '') {
    emits('insertImageUrl', imgUrl.value);
  }
};

const currentIdx = ref(null);
provide('image', {
  setImage,
  currentIdx: currentIdx,
});

const uploadFile = async (e: any) => {
  findTabAndSetLoading();
  await imageStore.createImage(e.target.files[0]);
  await refreshImage();
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
      isLoading: true,
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
      isLoading: true,
    },
    firstItemCursor: null,
    lastItemCursor: null,
  },
  { name: 'URL', current: false, component: () => EnterImageUrl },
]);

const prevOrNextImages = async (type: string) => {
  currentIdx.value = null;
  imgUrl.value = '';
  findTabAndSetLoading();
  const { productImages, uploadedImages } = (await imageStore.getImages({
    belong: currentTab.value.type,
    next_cursor: type === 'next' ? currentTab.value.lastItemCursor : null,
    previous_cursor: type == 'prev' ? currentTab.value.firstItemCursor : null,
  })) as any;
  if (currentTab.value.type === 'product') {
    findTabMapData(productImages);
  }
  if (currentTab.value.type === 'shop') {
    findTabMapData(uploadedImages);
  }
};

watch(
  () => props.isShowModal,
  async (newVal) => {
    if (newVal) {
      await refreshImage();
      activeTab({
        isUpload: tabs.value[0].isUploadFile,
        index: 0,
      });
    }
  }
);

const findTabAndSetLoading = () => {
  const foundTab = tabs.value.find((e) => e.type === currentTab.value.type);
  if (foundTab && foundTab.props) {
    foundTab.props.isLoading = true;
  }
};

const refreshImage = async () => {
  const { productImages, uploadedImages } = (await imageStore.getImages(
    {}
  )) as any;
  await Promise.all([
    findTabMapData(productImages),
    findTabMapData(uploadedImages),
  ]);
};

const findTabMapData = (images: any) => {
  const foundTab = tabs.value.find((e) => e.type === images.belong);
  if (foundTab && foundTab.props) {
    foundTab.props.items = images.data;
    foundTab.props.isLoading = false;
    foundTab['firstItemCursor'] = images.firstItemCursor;
    foundTab['lastItemCursor'] = images.lastItemCursor;
  }
};

onUnmounted(() => {
  tabs.value = [];
});
</script>

<style lang="scss" scoped></style>
