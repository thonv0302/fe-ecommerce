<script setup lang="ts">
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/solid';
import { ToastType } from './ToastsEnum';
import { useToast } from './index.ts';
const { toasts, dismiss } = useToast();

const bgColor = {
  [ToastType.Success]: 'bg-green-500',
  [ToastType.Error]: 'bg-red-500',
  [ToastType.Warning]: 'bg-yellow-500',
  [ToastType.Info]: 'bg-blue-500',
};

const iconType = {
  [ToastType.Success]: CheckCircleIcon,
  [ToastType.Error]: XCircleIcon,
  [ToastType.Warning]: ExclamationCircleIcon,
  [ToastType.Info]: InformationCircleIcon,
};
</script>
<template>
  <div class="fixed top-2 z-50 min-w-[300px] max-w-lg right-2">
    <TransitionGroup name="list" tag="ul">
      <div v-for="(toast, index) in toasts" :key="toast.id">
        <div
          :class="[
            'flex w-full items-center rounded-xl p-3 text-white',
            {
              'mt-2': index > 0,
            },
            bgColor[toast.type || ToastType.Success],
          ]"
        >
          <component
            :is="iconType[toast.type || ToastType.Success]"
            class="w-6 h-6 me-2"
          />
          <div class="flex-1">
            <div class="" v-if="toast.message">{{ toast.message }}</div>
          </div>
          <button class="p-1" @click="dismiss(toast.id)">
            <XMarkIcon class="w-6 h-6" />
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
