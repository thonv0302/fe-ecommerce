# Vue 3 + TypeScript + Vite
https://drive.google.com/file/d/1j6P8fC-fH2FwFk2J6M_12WrO37HwQGwP/view?usp=drivesdk
This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
<!-- <script setup>
import AppCard from './components/AppCard.vue';
import AppButton from './components/AppButton.vue';
import AppInput from './components/AppInput.vue';
import TheMainNav from './components/TheMainNav.vue';
import FlexBox from './components/FlexBox.vue';
import Grid from './components/Grid.vue';

import { useDark } from '@vueuse/core';
const isDark = useDark();
</script>

<template>
  <div class="m-10">
    <TheMainNav />
    <AppCard />

    <AppButton class="mt-3">Submit</AppButton>
    <AppInput label="name" />

    <p class="first-letter:text-5xl selection:bg-blue-500">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti sequi
      aspernatur deleniti, sed minus vero iusto repudiandae quaerat molestias
      asperiores delectus, quis debitis explicabo voluptatibus. Adipisci quasi
      vero error voluptates?
    </p>

    <ul class="list-disc marker:text-green-500 marker:text-2xl">
      <li>Vue</li>
      <li>React</li>
      <li></li>
      <li></li>
    </ul>
  </div>

  <input type="checkbox" v-model="isDark" />

  <FlexBox />

  <Grid />
</template> -->
<script setup>
import TreeGrid from './components/TreeGrid.vue';
</script>
<template>
  <div class="relative">
    <TreeGrid />

      <div class="absolute">1</div>
      <svg wiewBox="-1 -1 100 100" class="absolute">
      <!-- <rect x="10" y="10" width="40" height="40"></rect> -->
       <path d="
        M 0, 0
        L 25, 0
        Q 30, 0
          30, 5
        L 30, 25
        Q 30, 30
          35, 30 
        h 30  
       "  />
    </svg>

  </div>
</template>

<style scope>
/* svg {
  border: 5px solid red
} */

/* rect {
  fill: red
} */

path {
  fill: none;
  stroke: black;
  /* stroke-width: 5px */
}
</style>
