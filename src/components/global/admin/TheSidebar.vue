<script setup lang="ts">
import { useRoute } from 'vue-router';
import { XMarkIcon, HomeIcon } from '@heroicons/vue/24/solid';
import { ROUTE_HOME, ROUTE_ADMIN } from '@/constants/routers';
import { useLocalStorage } from '@vueuse/core';

const route = useRoute();

const isOpenSideBar = useLocalStorage<boolean>('isOpenSidebar', false);

const navigation = [
  {
    name: ROUTE_ADMIN.home.name,
    href: ROUTE_ADMIN.home.path,
    icon: HomeIcon,
  },
  {
    name: ROUTE_ADMIN.document.name,
    href: ROUTE_ADMIN.document.path,
    icon: HomeIcon,
  },
];
</script>

<template>
  <div
    :class="[
      'fixed h-full w-64 border-r transition-all duration-500 border-gray-200 flex-1 flex flex-col max-w-xs pt-5 pb-4 bg-white z-30 lg:z-10 left-[-100%] lg:left-0',
      { '!left-0': isOpenSideBar },
    ]"
  >
    <div class="absolute top-0 right-0 -mr-12 pt-2">
      <button
        @click="isOpenSideBar = false"
        type="button"
        class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
      >
        <span class="sr-only">Close sidebar</span>
        <XMarkIcon class="h-6 w-6 text-white" />
      </button>
    </div>
    <div class="flex-shrink-0 flex items-center px-4">
      <RouterLink
        :to="{
          name: ROUTE_HOME.home.name,
        }"
      >
        <img
          class="h-8 w-auto"
          src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
          alt="Workflow"
        />
      </RouterLink>
    </div>
    <div class="mt-5 flex-1 h-0 overflow-y-auto">
      <nav class="px-2 space-y-1">
        <RouterLink
          v-for="item in navigation"
          :key="item.name"
          :to="{
            name: item.name,
          }"
          :class="[
            ' text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md',
            {
              'text-gray-600 hover:bg-gray-50 hover:text-gray-900 bg-gray-100':
                route.name == item.name,
            },
          ]"
        >
          <component class="w-5 h-5 mr-2 text-indigo-600" :is="item.icon" />
          {{ item.name }}
        </RouterLink>
      </nav>
    </div>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpenSideBar"
        class="fixed z-[20] overflow-hidden bg-black top-0 left-0 w-full h-[100vh] opacity-75 lg:hidden"
      ></div>
    </Transition>
  </Teleport>
</template>
