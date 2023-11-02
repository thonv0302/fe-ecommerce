<template>
  <div>
    <TreeSelect :node="root" @onClick="nodeWasClick" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TreeSelect from '@/components/global/common/treeSelect/index.vue';

const root = ref({
  name: '/',
  children: [
    {
      name: 'music',
      children: [
        {
          name: 'song',
          // children: [
          //   {
          //     name: 'source.js',
          //   },
          // ],
        },
      ],
    },
    {
      name: 'workspace',
      children: [
        {
          name: 'source.js',
        },
      ],
    },
  ],
});

const nodeWasClick = (node: any) => {
  console.log('node: ', node);

  alert(node.name);
};
</script>
