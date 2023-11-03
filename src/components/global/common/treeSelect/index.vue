<template>
  <div class="node" :style="{ 'margin-left': `${depth * 20}px` }">
    <span @click="nodeClicked" v-if="hasChildren" class="type">
      {{ expanded ? '&#9660;' : '&#9658;' }}
    </span>
    <span @click="nodeClicked" v-else>&#9671; </span>
    {{ node.name }}

    <input
      ref="checkbox"
      type="checkbox"
      class="h-4 w-4 text-indigo-600 border-gray-300 rounded indeterminate:bg-indigo-600"
      v-model="checked"
    />
    <!-- :checked=" " -->
  </div>
  <TreeSelect
    v-if="expanded"
    v-for="child in node.children"
    :key="child.name"
    :node="child"
    :depth="depth + 1"
    :itemsSelected="itemsSelection.items"
    @onClick="(node) => $emit('onClick', node)"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useItemSelection } from '@/composables/useItemSelection';

export default defineComponent({
  name: 'TreeSelect',
  props: {
    node: {
      type: Object,
      default: () => ({}),
    },
    depth: {
      type: Number,
      default: 0,
    },
    itemsSelected: {
      type: Set,
      default: () => new Set([]),
    },
    modelValue: {},
  },
  emits: ['onClick'],
  setup({ node, itemsSelected }, { emit }) {
    const itemsSelection = useItemSelection();
    const expanded = ref(false);
    const hasChildren = computed(() => !!node.children);

    const nodeClicked = () => {
      expanded.value = !expanded.value;

      if (!hasChildren.value) {
        emit('onClick', node);
      }
    };

    const checked = ref(false);

    watch(
      () => checked.value,
      (newVal) => {
        if (hasChildren.value && newVal) {
          itemsSelection.addMultiple(node.children);
        }
        if (!hasChildren.value && newVal) {
          itemsSelection.addMultiple([node]);
        }
      }
    );

    watch(
      () => itemsSelected,
      (newVal) => {
        console.log('vao day: ', newVal);

        if (newVal.has(node)) {
          checked.value = true;
          if (!hasChildren.value) {
            console.log('node: ', node);

            itemsSelection.addMultiple([node]);
            console.log('itemsSelection: ', itemsSelection.items);
          }
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );

    return {
      expanded,
      nodeClicked,
      hasChildren,
      itemsSelection,
      checked,
    };
  },
});
</script>
<style scoped>
.node {
  text-align: left;
}
</style>
