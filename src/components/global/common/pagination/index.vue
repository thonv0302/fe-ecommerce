<template>
  <div :class="['mt-2 flex ' + calcAlignment]">
    <nav class="isolate inline-flex rounded-md">
      <!-- <component
        :is="currentPage > 2 ? RouterLink : 'span'"
        class="ms-1 w-[40px] h-[35px] text-sm font-semibold text-gray-500 border hover:bg-gray-50 flex items-center justify-center"
        :to="{
          name: route.name,
          query: {
            ...route.query,
            page: 1,
          },
        }"
        >First</component
      > -->
      <RouterLink
        v-if="currentPage > 1"
        class="ms-1 w-[40px] h-[35px] text-sm font-semibold text-gray-500 border hover:bg-gray-50 flex items-center justify-center"
        :to="{
          name: route.name,
          query: {
            ...route.query,
            page: currentPage - 1,
          },
        }"
      >
        <ChevronLeftIcon class="w-4 h-4" />
      </RouterLink>
      <RouterLink
        v-for="i in pagination"
        :key="i"
        :to="{
          name: route.name,
          query: {
            ...route.query,
            page: i || 1,
          },
        }"
        :class="[
          'ms-1 w-[40px] h-[35px] text-sm font-semibold  border flex items-center justify-center',
          {
            'bg-indigo-600 text-white border-indigo-600': currentPage === i,
            'text-gray-500 hover:bg-gray-50': currentPage !== i,
          },
        ]"
        >{{ i }}</RouterLink
      >
      <RouterLink
        v-if="totalPages - currentPage > 0"
        class="ms-1 w-[40px] h-[35px] text-sm font-semibold text-gray-500 border hover:bg-gray-50 flex items-center justify-center"
        :to="{
          name: route.name,
          query: {
            ...route.query,
            page: currentPage + 1,
          },
        }"
      >
        <ChevronRightIcon class="w-4 h-4" />
      </RouterLink>
      <!-- <RouterLink
        v-if="totalPages - currentPage > 1"
        class="ms-1 w-[40px] h-[35px] text-sm font-semibold text-gray-500 border hover:bg-gray-50 flex items-center justify-center"
        :to="{
          name: route.name,
          query: {
            ...route.query,
            page: totalPages,
          },
        }"
        >Last</RouterLink
      > -->
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
const props = defineProps({
  alignment: {
    type: String,
    default: 'right',
  },
  totalRecords: {
    type: Number,
    default: 1,
  },
  pageRange: {
    type: Number,
    default: 5,
  },
});

const route = useRoute();

const calcAlignment = computed(() => {
  const mapClass = {
    left: 'justify-start',
    right: 'justify-end',
    center: 'justify-center',
  };

  return mapClass[props.alignment];
});

const currentPage = computed(() => {
  return +route.query.page || 1;
});

const pageSize = computed(() => {
  return +route.query.size || 2;
});

const totalPages = computed(() => {
  return Math.ceil(props.totalRecords / pageSize.value);
});

const pagination = computed(() => {
  let middle = Math.ceil(props.pageRange / 2);

  //-- Min of page range
  let min = currentPage.value - middle + 1;

  //-- Max of page range
  let max = min + props.pageRange - 1;

  if (min < 1) {
    min = 1;
    max = props.pageRange;
  }

  if (max > totalPages.value) {
    max = totalPages.value;
    min = max - props.pageRange + 1 >= 1 ? max - props.pageRange + 1 : 1;
  }

  let arr = [];
  //-- Convert min max to array to v-for
  for (let i = min; i <= max; i++) {
    arr.push(i);
  }

  return arr;
});
</script>
