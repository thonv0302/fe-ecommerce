<script lang="ts" setup>
import { computed, onBeforeMount, onMounted, onUpdated, ref, watch } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
import {
  PlusSmallIcon,
  PencilSquareIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ArrowsUpDownIcon,
  XMarkIcon,
} from '@heroicons/vue/24/solid';
import { useProductStore } from '@/stores/productStore';
import { useTimeAgo, watchDebounced, onClickOutside } from '@vueuse/core';
import { useItemSelection } from '@/composables/useItemSelection';
import Pagination from '@/components/global/common/pagination/index.vue';

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

onBeforeMount(() => {
  sortConditions.value.forEach((condition) => {
    if (route.query[condition.queryKey]) {
      selectCondition.value = condition;
      return;
    } else {
      selectCondition.value = sortConditions.value[0];
    }
  });
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

onBeforeRouteUpdate(async (to) => {
  await getProductByStatus(to.query.status as Status);
});

const getProductByStatus = async (status: Status) => {
  itemsSelection.clear();
  const obj = {
    all: productStore.getAllProductShop,
    publish: productStore.getAllProductPublish,
    draft: productStore.getAllProductDraft,
  };

  setTimeout(async () => {
    products.value = await obj[`${status}`](route.query);
  }, 0);
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

const setStatusRoute = (query: any) => {
  router.push({
    query: {
      ...route.query,
      ...query,
    },
  });
};

const sortBy = (queryName: string) => {
  // if (!route.query[queryName] || route.query[queryName] === '-1') {
  //   querySortValue = '1';
  // }

  const queryObj: any = {};

  if (route.query.status) {
    queryObj['status'] = route.query.status;
  }

  if (route.query.page) {
    queryObj['page'] = route.query.page;
  }

  if (route.query.search) {
    queryObj['search'] = route.query.search;
  }

  router.push({
    query: {
      ...queryObj,
      [queryName]: selectCondition.value.sort,
    },
  });
};

const activeSort = (queryName: string) => {
  return route.query[queryName] || '-1';
};

const openSearchInput = ref(false);
const searchValue = ref('');

watchDebounced(
  searchValue,
  (newVal) => {
    if (openSearchInput.value) {
      router.push({
        query: {
          ...route.query,
          search: newVal,
        },
      });
    } else {
      delete route.query.search;
      debugger;
      router.push({
        query: {
          ...route.query,
        },
      });
    }
  },
  { debounce: 500 }
);

const inputSearch = ref();

const openSearchInputBox = () => {
  searchValue.value = '';
  openSearchInput.value = !openSearchInput.value;
  if (openSearchInput.value) {
    setTimeout(() => {
      inputSearch.value.focus();
    }, 0);
  }
};

const sortConditions = ref([
  {
    id: 1,
    name: 'Title',
    queryKey: 'sortTile',
    asc: 'A - Z',
    desc: 'Z - A',
    sort: '1',
  },
  {
    id: 2,
    name: 'Inventory',
    queryKey: 'sortInventory',
    asc: 'Low to high',
    desc: 'High to low',
    sort: '1',
  },
  {
    id: 3,
    name: 'Price',
    queryKey: 'sortPrice',
    asc: 'Low to high',
    desc: 'High to low',
    sort: '1',
  },
  {
    id: 4,
    name: 'Created date',
    queryKey: 'sortDate',
    asc: 'Old to new',
    desc: 'New to old',
    sort: '1',
  },
]);

const showDropdown = ref(false);
const target = ref();
onClickOutside(target, () => {
  showDropdown.value = false;
});

const selectCondition = ref({
  asc: '',
  desc: '',
  sort: '',
  queryKey: '',
});
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
          <div class="border-b text-sm text-gray-500 transition">
            <div
              :class="[
                'flex justify-between transition duration-150 ease-out',
                {
                  'flex-col items-start': openSearchInput,
                  'items-center': !openSearchInput,
                },
              ]"
            >
              <div :class="['px-3 py-2']" v-if="!openSearchInput">
                <button
                  v-for="(status, index) in statusTab"
                  :key="index"
                  :class="[
                    'px-2 py-1 min-w-[50px] hover:bg-gray-50 mr-1 rounded-md',
                    {
                      ' bg-slate-100':
                        status.query.status === route.query.status,
                    },
                  ]"
                  @click="setStatusRoute(status.query)"
                >
                  {{ status.title }}
                </button>
              </div>

              <div
                :class="[
                  'flex justify-between px-3 py-2 transition',
                  {
                    'w-full': openSearchInput,
                  },
                ]"
              >
                <Transition name="slide-fade">
                  <div v-if="openSearchInput" class="flex-1">
                    <input
                      id="search"
                      name="search"
                      type="text"
                      ref="inputSearch"
                      v-model="searchValue"
                      :class="[
                        'block w-full px-2 py-0 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                      ]"
                    />
                  </div>
                </Transition>
                <div>
                  <button
                    class="py-1 px-2 ml-3 hover:bg-gray-50 rounded-md"
                    @click="openSearchInputBox"
                  >
                    <component
                      :is="!openSearchInput ? MagnifyingGlassIcon : XMarkIcon"
                      class="w-4 h-4"
                    />
                  </button>
                  <div class="inline-block relative" ref="target">
                    <button
                      class="ml-1 py-1 px-2 hover:bg-gray-50 rounded-md h-[27px]"
                      @click="showDropdown = !showDropdown"
                    >
                      <ArrowsUpDownIcon class="w-4 h-4" />
                    </button>
                    <Transition name="slide-fade">
                      <div
                        v-if="showDropdown"
                        class="overflow-hidden absolute right-0 min-w-[140px] border rounded-lg shadow-lg bg-white"
                      >
                        <div class="px-3 pt-2">Sort by</div>
                        <div class="px-3 py-2">
                          <div
                            v-for="(condition, idx) in sortConditions"
                            :key="condition.id"
                            :class="[
                              'flex items-center',
                              {
                                'mb-3': idx !== sortConditions.length - 1,
                              },
                            ]"
                          >
                            <input
                              type="radio"
                              name="sort-condition"
                              :id="`${condition.id}`"
                              :value="condition"
                              v-model="selectCondition"
                              @click="sortBy(condition.queryKey)"
                              class="h-4 w-4 text-indigo-600 border-gray-300"
                            />
                            <label
                              :for="`${condition.id}`"
                              class="ml-3 block text-sm font-medium text-gray-600 cursor-pointer"
                            >
                              {{ condition.name }}
                            </label>
                          </div>
                        </div>
                        <div
                          class="h-[1px] w-full bg-slate-200 text-left"
                        ></div>
                        <div v-if="selectCondition.asc">
                          <button
                            :class="[
                              'py-2 px-3 block text-left w-full',
                              {
                                'bg-slate-100': selectCondition.sort === '1',
                              },
                            ]"
                            @click="
                              selectCondition.sort = '1';
                              sortBy(selectCondition.queryKey);
                            "
                          >
                            {{ selectCondition.asc }}
                          </button>
                          <button
                            :class="[
                              'py-2 px-3 block text-left w-full',
                              {
                                'bg-slate-100': selectCondition.sort === '-1',
                              },
                            ]"
                            @click="
                              selectCondition.sort = '-1';
                              sortBy(selectCondition.queryKey);
                            "
                          >
                            {{ selectCondition.desc }}
                          </button>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </div>
              </div>
            </div>
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
                  <span v-if="itemsSelection.items.size">{{
                    `${itemsSelection.items.size} selected`
                  }}</span>
                  <div v-else class="flex items-center">
                    <span> Title </span>

                    <button @click="sortBy('sortTitle')">
                      <ChevronUpIcon
                        :class="[
                          'w-4 h-2',
                          {
                            'text-gray-800': activeSort('sortTitle') === '1',
                            'text-gray-400': activeSort('sortTitle') === '-1',
                          },
                        ]"
                      />
                      <ChevronDownIcon
                        :class="[
                          'w-4 h-2',
                          {
                            'text-gray-800': activeSort('sortTitle') === '-1',
                            'text-gray-400': activeSort('sortTitle') === '1',
                          },
                        ]"
                      />
                    </button>
                  </div>
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
                    'p-3 text-left text-sm font-medium text-gray-500 tracking-wider ',
                    {
                      invisible: itemsSelection.items.size > 0,
                    },
                  ]"
                >
                  <div class="flex items-center">
                    <span> Inventory </span>
                  </div>
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
                  <div class="flex items-center">
                    <span> Price </span>
                  </div>
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
                  <div class="flex items-center">
                    <span> Date </span>
                  </div>
                </th>
                <th scope="col" class="relative px-4 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="product in products"
                :key="product._id"
                class="cursor-pointer"
              >
                <td class="px-3 py-4 whitespace-nowrap w-8">
                  <input
                    type="checkbox"
                    :checked="itemsSelection.items.has(product)"
                    @click="itemsSelection.toggle(product)"
                    class="h-4 w-4 text-indigo-600 border-gray-300 rounded me-1 indeterminate:bg-indigo-600"
                  />
                </td>
                <td class="px-3 py-4 whitespace-nowrap flex items-center">
                  <img
                    class="w-8 h-8 me-2 rounded"
                    :src="product.product_thumb"
                    alt=""
                  />
                  <span class="text-sm font-medium text-gray-500">
                    {{ product.product_name }}
                  </span>
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
                  <RouterLink
                    to="/"
                    class="text-indigo-600 hover:text-indigo-900 flex"
                  >
                    <PencilSquareIcon class="w-4 h-4" />
                  </RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Pagination :totalRecords="100" :pageRange="7" />
  </div>
</template>

<style scoped></style>
