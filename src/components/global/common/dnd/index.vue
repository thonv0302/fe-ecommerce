<template>
  <TransitionGroup
    tag="div"
    name="fade"
    class="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4 relative"
  >
    <div
      v-for="(item, idx) in items"
      :key="item.id"
      class="aspect-square border bg-white rounded-sm flex justify-center items-center relative"
      :draggable="true"
      @dragstart="onDrag($event, idx)"
      @drop="onDrop($event, idx)"
      @dragover.prevent
    >
      <img
        :draggable="false"
        class="absolute max-w-full max-h-full top-0 left-0 right-0 bottom-0 m-auto hover:cursor-pointer"
        :src="item.url"
      />
    </div>
    <div
      class="border bg-white rounded-sm flex flex-col justify-center items-center"
    >
      <button
        class="block px-3 py-2 border text-sm bg-gray-50 transition-all hover:bg-gray-100 rounded-md"
      >
        Add
      </button>
      <h1 class="text-sm mt-2">Add from URL</h1>
    </div>
  </TransitionGroup>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
const props = defineProps({
  data: {
    type: Array<any>,
    default: () => [],
  },
});

const getItems = () => props.data;
const items = ref(getItems());

const state = reactive({
  ...props,
  target: 0,
});

const onDrag = (event, idx) => {
  state.target = idx;
};

const onDrop = (event, idx) => {
  items.value.splice(idx, 0, items.value.splice(state.target, 1)[0]);
};
</script>

<style>
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
