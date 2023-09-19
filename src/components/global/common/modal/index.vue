<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed flex justify-center items-center z-[999] top-0 left-0 w-full h-full bg-black bg-opacity-50 overflow-hidden transition-all duration-500"
      @click.self="emits('closeModel')"
    >
      <div
        :class="[
          'modal-container transition-all p-3 duration-500 bg-white rounded-md shadow-md m-2 md:m-0',
          modalStyle,
        ]"
      >
        <!-- Header -->
        <div class="flex justify-between items-center mb-3">
          <h6>{{ title }}</h6>
          <button @click.stop="emits('closeModel')" class="p-2">
            <XMarkIcon class="w-4 h-4" />
          </button>
        </div>
        <hr class="-mx-3" />
        <!-- Body -->
        <slot name="body" />
        <!-- Footer -->
        <hr class="-mx-3" />
        <div class="flex justify-end items-center mt-3">
          <button
            @click.stop="emits('closeModel')"
            class="px-3 py-2 border text-sm bg-gray-50 transition-all hover:bg-gray-100 rounded-md me-2"
          >
            Cancel
          </button>
          <slot name="button" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/solid';
const props = defineProps({
  show: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: 'Title',
  },
  size: {
    type: String,
    validator: (value: string) => {
      return ['sm', 'md', 'lg', 'xl'].includes(value);
    },
    default: 'md',
  },
});

const emits = defineEmits(['closeModel']);

const modalStyle = computed(() => {
  const sizeObj: Record<string, string> = {
    sm: 'w-[400px]',
    md: 'w-[600px]',
    lg: 'w-[800px]',
    xl: 'w-[1140px]',
  };

  return sizeObj[props.size];
});

onMounted(() => {
  let body = document.querySelector('body') as HTMLElement;
  body.style.overflow = 'hidden';
});
</script>

<style>
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: translateY(-50px);
}
</style>
