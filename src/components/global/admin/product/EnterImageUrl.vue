<template>
  <div class="space-y-6">
    <div>
      <label for="pastedUrl" class="block text-sm text-gray-700">
        Paste image URL
      </label>
      <div class="mt-1">
        <input
          id="pastedUrl"
          name="pastedUrl"
          v-model="url"
          placeholder="http://"
          type="text"
          :class="[
            'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watch } from 'vue';

const url = ref('');

const { setImage } = inject('image');

watch(
  () => url.value,
  (newVal) => {
    setImage({
      name: 'image from url',
      alt: 'image',
      url: newVal,
    });
  }
);
</script>
