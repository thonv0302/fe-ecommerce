<template>
  <draggable
    item-key="id"
    handle=".drag-handle"
    :animation="100"
    v-model="options"
    group="options"
    ghostClass="sortable-ghost"
    :force-fallback="true"
    @start="onChange"
    @end="onEnd"
  >
    <template #item="{ element: option, index: optionIdx }">
      <div class="rounded bg-slate-50 mb-2" @mouseup="dragging(option, false)">
        <div
          class="option py-1 px-2"
          v-if="!option.isDraging && !option.isDone"
        >
          <span class="text-sm ms-10"> Option name</span>
          <div class="flex">
            <div
              class="drag-handle flex cursor-move w-8 h-8 justify-center items-center me-2"
              @mousedown="dragging(option, true)"
            >
              <span>⠋</span>
            </div>
            <VeeField
              :name="`option` + option.id"
              :id="`option` + option.id"
              type="text"
              rules="required"
              v-model="option.title"
              :class="[
                'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none text-sm',
              ]"
            />
            <a
              role="button"
              class="p-2 inline-block"
              @click="removeOption(optionIdx)"
            >
              <TrashIcon class="w-4 h-4 text-slate-500" />
            </a>
          </div>
        </div>
        <draggable
          v-model="option.values"
          handle=".drag-handle"
          :group="{ name: 'values', pull: false }"
          :animation="150"
          item-key="id"
          :force-fallback="true"
        >
          <template #header>
            <div
              v-if="!option.isDraging && !option.isDone"
              class="text-sm ms-14 mt-2"
            >
              Option values
            </div>
          </template>
          <template #item="{ element: value, index: valueIdx }">
            <div class="rounded bg-slate-50">
              <div
                class="option flex py-1 ps-1 pe-2"
                v-if="!option.isDraging && !option.isDone"
              >
                <div
                  class="drag-handle cursor-move w-8 h-8 justify-center items-center ms-6"
                >
                  <span>⠋</span>
                </div>
                <VeeField
                  :name="`value` + value.id"
                  :id="`value` + value.id"
                  type="text"
                  rules="required"
                  v-model="value.title"
                  :class="[
                    'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none text-sm',
                  ]"
                />
                <a
                  role="button"
                  class="p-2 inline-block"
                  @click="removeValue(optionIdx, valueIdx)"
                >
                  <TrashIcon class="w-4 h-4 text-slate-500" />
                </a>
              </div></div
          ></template>
        </draggable>
        <div
          v-if="!option.isDraging && !option.isDone"
          class="py-1 pe-2 ps-14 pe-10"
        >
          <input
            type="text"
            @keyup.enter.stop="addValue($event, option)"
            :class="[
              'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none text-sm',
            ]"
          />
          <a
            role="button"
            class="my-2 inline-block shadow text-sm py-1 px-2 border transition-all hover:bg-gray-100 rounded-md me-2"
            @click="option.isDone = true"
          >
            Done
          </a>
        </div>
        <div v-if="option.isDraging || option.isDone">
          <div class="option flex py-3 px-5">
            <span class="me-5 drag-handle cursor-move">⠋</span>
            <div class="text-sm flex-1">
              <div class="flex justify-between">
                <h6 class="font-medium">{{ option.title }}</h6>
                <button
                  @click="option.isDone = false"
                  class="shadow-sm text-sm py-1 px-2 border transition-all hover:bg-gray-100 rounded-md"
                >
                  Edit
                </button>
              </div>
              <div class="mt-2">
                <span
                  v-for="value in option.values"
                  class="rounded-lg px-3 py-2 bg-slate-200 me-2"
                >
                  {{ value.title }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </draggable>
  <div>
    <hr class="-mx-3" />
    <a
      @click="addOption"
      role="button"
      class="py-3 block text-sm transition-all text-blue-600 hover:underline"
      >+ Add another option</a
    >
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';
import { TrashIcon } from '@heroicons/vue/24/solid';

import { nanoid } from 'nanoid';

const removeOption = (idx: number) => {
  options.value.splice(idx, 1);
};

const removeValue = (optionIdx: number, valueIdx: number) => {
  options.value[optionIdx].values.splice(valueIdx, 1);
};

const addValue = (e: any, option: any) => {
  option.values.push({
    title: e.target.value,
    id: nanoid(),
  });
  e.target.value = '';
};

const addOption = () => {
  options.value.push({
    title: '',
    id: nanoid(),
    values: [],
    isDone: false,
    isDraging: false,
  });
};

const dragging = (option: any, status: boolean) => {
  option.isDraging = status;
};

const onChange = () => {};

const onEnd = (evt: any) => {
  // options.value[evt.newIndex].isDone = false;
  options.value[evt.newIndex].isDraging = false;
};

// const optionName = ref([
//   {
//     id: 1,
//     title: 'Size',
//     slug: 'size',
//   },
//   {
//     id: 2,
//     title: 'Color',
//     slug: 'color',
//   },
//   {
//     id: 3,
//     title: 'Material',
//     slug: 'material',
//   },
//   {
//     id: 4,
//     title: 'Style',
//     slug: 'style',
//   },
// ]);

const options = ref([
  {
    title: 'Size',
    id: nanoid(),
    values: [
      {
        title: 'L',
        id: nanoid(),
      },
      {
        title: 'M',
        id: nanoid(),
      },
    ],
    isDone: false,
    isDraging: false,
  },
  {
    title: 'Color',
    id: nanoid(),
    values: [],
    isDone: false,
    isDraging: false,
  },
  {
    title: 'Style',
    id: nanoid(),
    values: [],
    isDone: false,
    isDraging: false,
  },
]);
</script>

<style>
.sortable-ghost .option {
  position: relative;
}

.sortable-ghost .option::after {
  content: '';
  @apply absolute top-0 bottom-0 left-0 right-0 bg-slate-200 rounded;
}
</style>
