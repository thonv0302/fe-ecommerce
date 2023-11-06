<template>
  <div>
    <TreeSelect :node="root" @onClick="nodeWasClick" v-if="false" />
    <Survey />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TreeSelect from '@/components/global/common/treeSelect/index.vue';
import Survey from '@/components/survey/index.vue';

const root = ref({
  name: '/',
  children: [
    {
      name: 'music',
      children: [
        {
          name: 'song',
          // children: [],
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
          // children: [],
        },
        {
          name: 'source 1.js',
          // children: [],
        },
      ],
    },
    {
      name: 'test',
    },
  ],
});

const nodeWasClick = (node: any) => {
  console.log('node: ', node);

  alert(node.name);
};
</script>
