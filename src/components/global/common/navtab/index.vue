<template>
  <nav>
    <button
      v-for="(tab, tabIdx) in tabs"
      :key="tab.name"
      :class="['text-sm font-medium text-cente relative p-3']"
      @click="activeTab(tabIdx)"
    >
      <span class="">{{ tab.name }}</span>
      <span
        aria-hidden="true"
        :class="[
          'absolute inset-x-0 bottom-0 h-0.5',
          tab.current ? 'bg-gray-800' : 'bg-transparent',
        ]"
      />
    </button>
  </nav>
  <hr class="-mx-3" />
  <div v-for="tab in tabs" class="my-3">
    <component
      ref="comp"
      :is="tab.component()"
      v-if="tab.current"
      v-bind:prop="tab.props"
    />
  </div>
  <div></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
  tabs: {
    type: Array<any>,
    default: () => [],
  },
});

const emits = defineEmits(['activeTab']);

const comp = ref();

const activeTab = (idx: number) => {
  console.log('comp: ', comp);

  const tabActive = props.tabs.find((tab) => tab.current);
  if (tabActive) {
    tabActive.current = false;
  }
  props.tabs[idx].current = true;

  emits('activeTab', { isUpload: props.tabs[idx].isUploadFile, index: idx });
};
</script>
