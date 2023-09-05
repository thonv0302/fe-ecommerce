<script lang="ts" setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
import { PlusSmallIcon, PencilSquareIcon } from '@heroicons/vue/24/solid';
import { useProductStore } from '@/stores/productStore';
import { useTimeAgo } from '@vueuse/core';
import { useItemSelection } from '@/composables/useItemSelection';

const productStore = useProductStore();

const router = useRouter();
const route = useRoute();
const itemsSelection = useItemSelection();

const statusTab = [
  {
    title: 'All',
    query: {
      status: 'all',
    },
  },
  {
    title: 'Publish',
    query: {
      status: 'publish',
    },
  },
  {
    title: 'Draft',
    query: {
      status: 'draft',
    },
  },
];

const checkbox = ref();
const products = ref([]);

//-- route query params
onBeforeMount(() => {
  if (
    !statusTab
      .map((status) => status.query.status)
      .includes(route.query.status as string)
  ) {
    router.push({
      query: {
        ...route.query,
        status: 'all',
      },
    });
  }
});

type Status = 'all' | 'draft' | 'publish';
onMounted(() => {
  getProductByStatus(route.query.status as Status);
});

onBeforeRouteUpdate((to) => {
  getProductByStatus(to.query.status as Status);
});

const getProductByStatus = async (status: Status) => {
  itemsSelection.clear();
  const obj = {
    all: productStore.getAllProductShop,
    publish: productStore.getAllProductPublish,
    draft: productStore.getAllProductDraft,
  };
  products.value = await obj[`${status}`]();
};

const allAreSelected = computed(() => {
  return (
    products.value.length === itemsSelection.items.size &&
    itemsSelection.items.size != 0
  );
});

const partialSelection = computed(
  () => itemsSelection.items.size > 0 && !allAreSelected.value
);

const bulkSelect = () => {
  if (allAreSelected.value) {
    itemsSelection.clear();
  } else {
    itemsSelection.addMultiple(products.value);
  }
};
</script>

<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="mb-2 flex justify-between items-center">
          <h1 class="text-base text-gray-500">Products</h1>
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 flex justify-between items-center"
          >
            <PlusSmallIcon class="w-4 h-4" />
            <span class="ms-1"> Add product </span>
          </button>
        </div>
        <div class="overflow-hidden border sm:rounded-lg">
          <div class="border-b text-sm px-3 text-gray-500 py-2">
            <button
              v-for="(status, index) in statusTab"
              :key="index"
              :class="[
                'px-2 py-1 min-w-[50px] ',
                {
                  'rounded-md bg-slate-100':
                    status.query.status === route.query.status,
                },
              ]"
              @click="
                router.push({
                  query: status.query,
                })
              "
            >
              {{ status.title }}
            </button>
          </div>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="p-3 whitespace-nowrap w-8">
                  <input
                    ref="checkbox"
                    type="checkbox"
                    :checked="allAreSelected"
                    :indeterminate="partialSelection"
                    class="h-4 w-4 text-indigo-600 border-gray-300 rounded indeterminate:bg-indigo-600"
                    @click="bulkSelect"
                  />
                </th>
                <th
                  scope="col"
                  :class="[
                    'p-3 text-left text-sm font-medium text-gray-500 tracking-wider',
                  ]"
                >
                  {{
                    itemsSelection.items.size
                      ? `${itemsSelection.items.size} selected`
                      : 'Title'
                  }}
                </th>
                <th
                  scope="col"
                  :class="[
                    'p-3 text-left text-sm font-medium text-gray-500 tracking-wider',
                    {
                      invisible: itemsSelection.items.size > 0,
                    },
                  ]"
                >
                  Status
                </th>
                <th
                  scope="col"
                  :class="[
                    'p-3 text-left text-sm font-medium text-gray-500 tracking-wider',
                    {
                      invisible: itemsSelection.items.size > 0,
                    },
                  ]"
                >
                  Inventory
                </th>
                <th
                  scope="col"
                  :class="[
                    'p-3 text-left text-sm font-medium text-gray-500 tracking-wider',
                    {
                      invisible: itemsSelection.items.size > 0,
                    },
                  ]"
                >
                  Price
                </th>
                <th
                  scope="col"
                  :class="[
                    'p-3 text-left text-sm font-medium text-gray-500 tracking-wider',
                    {
                      invisible: itemsSelection.items.size > 0,
                    },
                  ]"
                >
                  Date
                </th>
                <th scope="col" class="relative px-4 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product._id">
                <td class="px-3 py-4 whitespace-nowrap w-8">
                  <input
                    type="checkbox"
                    :checked="itemsSelection.items.has(product)"
                    @click="itemsSelection.toggle(product)"
                    class="h-4 w-4 text-indigo-600 border-gray-300 rounded me-1 indeterminate:bg-indigo-600"
                  />
                </td>
                <td
                  class="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{ product.product_name }}
                </td>
                <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ product.isPublished ? 'Publish' : 'Draft' }}
                </td>
                <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ product.product_quantity }}
                </td>
                <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ product.product_price }}
                </td>
                <td class="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ useTimeAgo(product.createdAt) }}
                </td>
                <td
                  class="px-3 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <a
                    href="#"
                    class="text-indigo-600 hover:text-indigo-900 flex"
                  >
                    <PencilSquareIcon class="w-4 h-4" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
