<script setup lang="ts">
import { useToast } from './index.ts';

const { toasts } = useToast();
</script>
<template>
  <div
    class="fixed bottom-0 z-10 w-full p-2 right-2 sm:p-0 sm:w-auto sm:bottom-5"
  >
    <TransitionGroup name="list" tag="ul">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="mb-4 border-t-[1px] shadow-sm !pr-0 bg-red-500"
        :class="`border-t-${toast.type}`"
      >
        <div class="flex justify-between sm:w-96 px-4">
          <div class="flex items-center">
            <div>
              <div class="font-bold" v-if="toast.title">{{ toast.title }}</div>
              <div class="">{{ toast.message }}</div>
            </div>
          </div>
          <button
            v-if="toast.dismissiable"
            class="p-0.5 px-1.5 transition rounded hover:bg-white absolute top-2 right-2"
          >
            x
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.6s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(60px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(60px) translateY(-100%);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
