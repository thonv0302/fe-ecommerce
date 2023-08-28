<script setup lang="ts">
import TheHeader from '@/components/global/admin/TheHeader.vue';
import TheSidebar from '@/components/global/admin/TheSidebar.vue';
</script>
<template>
  <div>
    <TheSidebar />
    <div class="lg:pl-64 flex flex-col flex-1">
      <main class="flex-1">
        <TheHeader />
        <slot />
      </main>
    </div>
  </div>
</template>
