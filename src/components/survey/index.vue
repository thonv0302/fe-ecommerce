<template>
  <div>
    <div class="h-96">
      <FormPlanPicker v-if="currentStepNumber === 1" />
      <FormUserDetails v-if="currentStepNumber === 2" />
      <FormAddress v-if="currentStepNumber === 3" />
      <FormReviewOrder v-if="currentStepNumber === 4" />
    </div>

    <div class="h-4">
      <div class="h-4 bg-red-400" :style="`width: ${progress}%;`"></div>
    </div>

    <div class="mt-3 flex">
      <button
        @click="goBack"
        v-if="currentStepNumber > 1"
        class="px-3 py-2 border rounded-md text-sm"
      >
        Back
      </button>
      <button
        @click="goNext"
        class="px-3 py-2 border rounded-md text-sm ms-auto"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormPlanPicker from './FormPlanPicker.vue';
import FormUserDetails from './FormUserDetails.vue';
import FormAddress from './FormAddress.vue';
import FormReviewOrder from './FormReviewOrder.vue';
import { computed, ref } from 'vue';

const currentStepNumber = ref(1);

const progress = computed(() => (currentStepNumber.value / 4) * 100);

const goBack = () => {
  currentStepNumber.value--;
};
const goNext = () => {
  currentStepNumber.value++;
};
</script>

<style scoped></style>
