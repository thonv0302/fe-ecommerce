<template>
  <component :is="layoutChosen">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="in-out">
        <Suspense>
          <Component :is="Component" />
          <!-- Loading -->
          <template #fallback>
            Loading...
          </template>
        </Suspense>
      </Transition>
    </RouterView>
  </component>
  <Loading />
  <Toast />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Home from '@/layouts/Home.vue';
import Auth from '@/layouts/Auth.vue';
import Admin from '@/layouts/Admin.vue';
import Toast from '@/components/global/common/toast/index.vue';
import Loading from '@/components/global/common/loading/index.vue';

const route = useRoute();

const layoutChosen = computed(() => {
  if (route.path.includes('admin')) {
    return Admin;
  } else if (route.path.includes('auth')) {
    return Auth;
  }

  return Home;
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
