<template>
  <header class="relative text-white">
    <nav>
      <div class="bg-gray-900">
        <div class="flex justify-between p-2">
          <RouterLink :to="{ name: ROUTE_AUTH.login.name }" class="p-2"
            >Sign in</RouterLink
          >
          <RouterLink :to="{ name: ROUTE_AUTH.register.name }" class="p-2"
            >Create an account</RouterLink
          >
        </div>
      </div>
      <div
        :class="[
          'backdrop-blur-md backdrop-filter ',
          {
            'fixed top-0 left-0 w-full z-[10] bg-opacity-100 ': isScroll,
            'bg-white bg-opacity-10': !isScroll,
            'bg-slate-800 bg-opacity-100': isScroll,
          },
        ]"
      >
        <div class="px-2">
          <div
            id="nav-link"
            class="flex items-center justify-between h-16 mx-auto max-w-7xl transition ease-out duration-200'"
          >
            <button class="p-2 lg:hidden" @click="openNavbar = true">
              <Bars3Icon class="w-6 h-6" />
            </button>
            <a href="" class="p-2">
              <!-- <img
                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                alt=""
                class="w-8 h-8"
              /> -->
            </a>
            <Teleport :disabled="!mdAndSmaller" to="body">
              <Transition name="slide">
                <div
                  v-if="!mdAndSmaller || openNavbar"
                  :class="[
                    'p-2 lg:p-0 fixed z-[30] text-black lg:text-white left-0 top-0 w-4/5 h-[100vh] lg:w-auto lg:static lg:h-full lg:flex bg-slate-50 lg:bg-inherit',
                  ]"
                >
                  <ul class="flex flex-col lg:flex-row lg:items-center">
                    <li>
                      <a role="button" class="p-2 inline-block w-full">Women</a>
                    </li>
                    <li>
                      <a role="button" class="p-2 inline-block w-full">Men</a>
                    </li>
                    <li>
                      <a role="button" class="p-2 inline-block w-full"
                        >Company</a
                      >
                    </li>
                    <li>
                      <a role="button" class="p-2 inline-block w-full"
                        >Stores</a
                      >
                    </li>
                  </ul>
                  <button
                    class="p-2 absolute top-2 right-[-40px] text-white"
                    @click="openNavbar = false"
                  >
                    <XMarkIcon class="w-4 h-4" />
                  </button>
                </div>
              </Transition>
            </Teleport>

            <Teleport to="body">
              <Transition name="fade">
                <div
                  v-if="!mdAndSmaller || openNavbar"
                  class="fixed z-[20] overflow-hidden bg-black top-0 left-0 w-full h-[100vh] opacity-75 lg:hidden"
                ></div>
              </Transition>
            </Teleport>
            <button class="p-2">
              <ShoppingBagIcon class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, Ref } from 'vue';
import { ROUTE_AUTH } from '../../../constants/routers';

import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import useDevices from '../../../composables/useDevices';

const { mdAndSmaller } = useDevices();
const openNavbar = ref(false);

const isScroll = ref<boolean>(false);
const body = ref() as Ref<HTMLElement>;

watch(openNavbar, (newVal) => {
  if (newVal) {
    body.value.style.overflow = 'hidden';
  } else {
    body.value.style.removeProperty('overflow');
  }
});

onMounted(() => {
  body.value = document.querySelector('body') as HTMLElement;
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 53) {
      isScroll.value = true;
    } else {
      isScroll.value = false;
    }
  });
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  left: -100%;
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
