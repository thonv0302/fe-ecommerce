<template>
  <div
    @click="nodeClicked"
    class="node"
    :style="{ 'margin-left': `${depth * 20}px` }"
  >
    <span v-if="hasChildren" class="type">
      {{ expanded ? '&#9660;' : '&#9658;' }}
    </span>
    <span v-else>&#9671; </span>
    {{ node.name }}
  </div>
  <TreeSelect
    v-if="expanded"
    v-for="child in node.children"
    :key="child.name"
    :node="child"
    :depth="depth + 1"
    @onClick="(node) => $emit('onClick', node)"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
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
  },
  emits: ['onClick'],
  setup({ node, depth }, { emit }) {
    const expanded = ref(false);
    const hasChildren = computed(() => !!node.children);
    const nodeClicked = () => {
      expanded.value = !expanded.value;

      if (!hasChildren.value) {
        emit('onClick', node);
      }
    };

    return {
      expanded,
      nodeClicked,
      hasChildren,
    };
  },
});
</script>
<style scoped>
.node {
  text-align: left;
}
</style>
