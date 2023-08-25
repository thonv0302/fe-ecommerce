<template>
  <component :is="layoutChosen">
    <RouterView :key="$route.fullPath"> </RouterView>
  </component>
  <Toast />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Home from './layouts/Home.vue';
import Auth from './layouts/Auth.vue';
import Toast from '../src/components/global/common/toast/index.vue';

const route = useRoute();

const layoutChosen = computed(() => {
  if (route.path.includes('admin')) {
    return 'adminLayout';
  } else if (route.path.includes('auth')) {
    return Auth;
  }

  return Home;
});
</script>

<style scoped></style>
