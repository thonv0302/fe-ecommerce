<template>
  <!-- divide-x divide-gray-200 -->
  <nav>
    <button v-for="(tab, tabIdx) in tabs" :key="tab.name" :class="['text-sm font-medium text-cente relative p-3']"
      @click="activeTab(tabIdx)">
      <span class="">{{ tab.name }}</span>
      <span aria-hidden="true" :class="[
        'absolute inset-x-0 bottom-0 h-0.5',
        tab.current ? 'bg-gray-800' : 'bg-transparent',
      ]" />
    </button>
  </nav>
  <hr class="-mx-3" />
  <div v-for="tab in tabs" class="my-3">
    <component :is="tab.component()" v-if="tab.current" v-bind:prop="tab.props" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  tabs: {
    type: Array<any>,
    default: () => [],
  },
});

const emits = defineEmits(['activeTab']);

const activeTab = (idx: number) => {
  const tabActive = props.tabs.find((tab) => tab.current);
  if (tabActive) {
    tabActive.current = false;
  }
  props.tabs[idx].current = true;
  emits('activeTab', { isUpload: props.tabs[idx].isUploadFile, pagination: props.tabs[idx].pagination });
};
</script>
