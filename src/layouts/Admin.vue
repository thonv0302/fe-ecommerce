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
        <main class="flex-1">
          <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <slot />
            </div>
          </div>
        </main>
      </main>
    </div>
  </div>
</template>
