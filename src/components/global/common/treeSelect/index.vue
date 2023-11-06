<template>
  <div class="node" :style="{ 'margin-left': `${depth * 20}px` }">
    <span @click="nodeClicked" v-if="hasChildren" class="type">
      {{ expanded ? '&#9660;' : '&#9658;' }}
    </span>
    <span @click="nodeClicked" v-else>&#9671; </span>
    {{ node.name }} - {{ allAreSelected }}
    <!-- - {{ allAreSelected }} - {{ node.children.length }} -->

    <input
      ref="checkbox"
      type="checkbox"
      class="h-4 w-4 text-indigo-600 border-gray-300 rounded indeterminate:bg-indigo-600"
      :checked="allAreSelected"
      @click="bulkSelect"
    />
    <!-- :checked="allAreSelected" -->
    <!-- v-model="checked" -->
  </div>
  <TreeSelect
    v-if="expanded"
    v-for="child in node.children"
    :key="child.name"
    :node="child"
    :selectedProp="itemsSelection.items"
    :depth="depth + 1"
    @onClick="(node) => $emit('onClick', node)"
  />
  <!-- :itemsSelectedPropDown="itemsSelection.items" -->
  <!-- @selectItem="(node) => getSelectItemFromChild(node)" -->
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
    selectedProp: {
      type: Set,
      default: () => {
        return new Set([]);
      },
    },
  },
  emits: ['onClick', 'update:modelValue', 'selectItem'],
  setup({ node, selectedProp }, { emit }) {
    const itemsSelection = useItemSelection();
    const itemSelectionUp = useItemSelection();

    const expanded = ref(false);

    const hasChildren = computed(
      () => !!node.children && node.children.length > 0
    );

    const getSelectItemFromChild = (data: any) => {
      itemSelectionUp.toggle(data);
    };

    const nodeClicked = () => {
      expanded.value = !expanded.value;

      if (!hasChildren.value) {
        emit('onClick', node);
      }
    };

    const allAreSelected = computed(() => {
      if (!node.children) {
        node['children'] = [];
      }

      if (node.children.length === 0 && itemsSelection.items.size === 0) {
        return true;
      }

      if (
        itemsSelection.items.size === node.children.length &&
        itemsSelection.items.size > 0
      ) {
        return true;
      }

      return false;
    });

    const partialSelection = computed(
      () => itemsSelection.items.size > 0 && !allAreSelected.value
    );

    const bulkSelect = () => {
      debugger;
      if (allAreSelected.value) {
        itemsSelection.clear();
      } else {
        if (hasChildren.value) {
          itemsSelection.addMultiple(node.children);
        }
      }
    };

    watch(
      () => selectedProp,
      (newVal) => {
        if (newVal.has(node)) {
          if (hasChildren.value) {
            itemsSelection.addMultiple(node.children);
          }
        }

        if (newVal.size === 0) {
          itemsSelection.clear();
        }
      },
      { deep: true, immediate: true }
    );

    // watch(
    //   () => checked.value,
    //   (newVal) => {
    //     if (newVal) {
    //       if (hasChildren.value) {
    //         itemsSelection.addMultiple(node.children);
    //       }
    //     } else {
    //       itemsSelection.clear();
    //     }
    //     emit('selectItem', node);
    //   }
    // );

    // watch(
    //   () => itemsSelectedPropDown,
    //   (newVal) => {
    //     console.log('vao day');

    //     if (newVal) {
    //       if (newVal.has(node)) {
    //         checked.value = true;
    //         if (!hasChildren.value) {
    //           itemsSelection.addMultiple([node]);
    //         }
    //       } else {
    //         checked.value = false;
    //       }
    //     } else {
    //       itemsSelection.clear();
    //       itemSelectionUp.clear();
    //     }
    //   },
    //   {
    //     deep: true,
    //     immediate: true,
    //   }
    // );

    // watch(
    //   () => itemSelectionUp.items,
    //   (newVal) => {
    //     setTimeout(() => {
    //       if (newVal.size === node.children.length) {
    //         checked.value = true;
    //       } else {
    //         checked.value = false;
    //       }
    //     }, 0);
    //   },
    //   {
    //     deep: true,
    //   }
    // );

    return {
      expanded,
      nodeClicked,
      hasChildren,
      itemsSelection,
      // checked,
      // modelValue,
      itemSelectionUp,
      getSelectItemFromChild,
      bulkSelect,
      allAreSelected,
      partialSelection,
    };
  },
});
</script>
<style scoped>
.node {
  text-align: left;
}
</style>
