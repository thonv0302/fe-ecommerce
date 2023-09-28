<template>
  <div>
    <div class="flex items-center mb-4">
      <RouterLink :to="{
        name: ROUTE_PRODUCT.list.name,
      }" class="p-2">
        <ArrowSmallLeftIcon class="w-4 h-4" />
      </RouterLink>
      <h1>Add product</h1>
    </div>
    <VeeForm>
      <div class="grid grid-cols-1 md:grid-cols-3 md:gap-x-4">
        <div class="col-span-2">
          <div class="bg-white shadow-sm border rounded-md p-3">
            <div class="space-y-1">
              <label for="password" class="block text-sm text-gray-700">
                Title
              </label>
              <div class="mt-1">
                <VeeField id="password" name="password" type="password" rules="required" :class="[
                  'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                ]" />
                <ErrorMessage name="password" class="mt-2 text-sm text-red-600" />
              </div>
            </div>
            <div class="mt-3">
              <label for="password" class="block text-sm text-gray-70">
                Media
              </label>
              <div class="mt-1 rounded-md border border-gray-300 shadow-sm overflow-hidden">
                <Editor v-model="test" />
              </div>
            </div>
          </div>
          <div class="bg-white shadow-sm border rounded-md p-3 mt-3">
            <div class="sm:col-span-6">
              <label for="cover-photo" class="block text-sm font-medium text-gray-700">
                Cover photo
              </label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"
                    aria-hidden="true">
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-sm text-gray-500">
                    Accepts images, PNG, JPG, GIF.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white shadow-sm border rounded-md p-3 mt-3">
            <h6 class="text-sm font-semibold text-gray-700 mb-3">Pricing</h6>
            <div class="flex flex-col md:flex-row md:gap-x-4">
              <div class="space-y-1 flex-1">
                <label for="password" class="block text-sm text-gray-700">
                  Price
                </label>
                <div class="mt-1">
                  <VeeField id="password" name="password" type="password" rules="required" :class="[
                    'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                  ]" />
                  <ErrorMessage name="password" class="mt-2 text-sm text-red-600" />
                </div>
              </div>
              <div class="space-y-1 flex-1 mt-2 md:mt-0">
                <label for="password" class="block text-sm text-gray-700">
                  Compare-at price
                </label>
                <div class="mt-1">
                  <VeeField id="password" name="password" type="password" rules="required" :class="[
                    'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                  ]" />
                  <ErrorMessage name="password" class="mt-2 text-sm text-red-600" />
                </div>
              </div>
              <div class="flex-1 hidden md:block"></div>
            </div>
            <div class="flex flex-col md:flex-row md:gap-x-4 mt-2">
              <div class="space-y-1 flex-1">
                <label for="password" class="block text-sm text-gray-700">
                  Cost per item
                </label>
                <div class="mt-1">
                  <VeeField id="password" name="password" type="password" rules="required" :class="[
                    'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                  ]" />
                  <ErrorMessage name="password" class="mt-2 text-sm text-red-600" />
                </div>
              </div>
              <div class="space-y-1 flex-1 mt-2 md:mt-0">
                <label for="password" class="block text-sm text-gray-700">
                  Profit
                </label>
                <div class="mt-1">
                  <VeeField id="password" name="password" type="password" rules="required" :class="[
                    'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                  ]" />
                  <ErrorMessage name="password" class="mt-2 text-sm text-red-600" />
                </div>
              </div>
              <div class="space-y-1 flex-1 mt-2 md:mt-0">
                <label for="password" class="block text-sm text-gray-700">
                  Margin
                </label>
                <div class="mt-1">
                  <VeeField id="password" name="password" type="password" rules="required" :class="[
                    'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                  ]" />
                  <ErrorMessage name="password" class="mt-2 text-sm text-red-600" />
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white shadow-sm border rounded-md p-3 mt-3">
            <h6 class="text-sm font-semibold text-gray-700 mb-3">Shipping</h6>
            <div class="flex flex-col md:flex-row md:gap-x-4">
              <div class="space-y-1 flex-1">
                <label for="password" class="block text-sm text-gray-700">
                  SKU (Stock Keeping Unit)
                </label>
                <div class="mt-1">
                  <VeeField id="password" name="password" type="password" rules="required" :class="[
                    'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                  ]" />
                  <ErrorMessage name="password" class="mt-2 text-sm text-red-600" />
                </div>
              </div>
              <div class="space-y-1 flex-1 mt-2 md:mt-0">
                <label for="password" class="block text-sm text-gray-700">
                  Quantity
                </label>
                <div class="mt-1">
                  <VeeField id="password" name="password" type="password" rules="required" :class="[
                    'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                  ]" />
                  <ErrorMessage name="password" class="mt-2 text-sm text-red-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-3 md:mt-0">
          <div class="bg-white shadow-sm border rounded-md p-3">
            <div>
              <label for="location" class="block text-sm font-semibold text-gray-700">Status</label>
              <select id="location" name="location"
                class="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>Publish</option>
                <option>Draft</option>
              </select>
            </div>
          </div>
          <div class="bg-white shadow-sm border rounded-md p-3 mt-3">
            <h6 class="text-sm font-semibold text-gray-700 mb-3">
              Product organization
            </h6>
            <div>
              <label for="product-category" class="block text-sm text-gray-700">Product category</label>
              <div class="mt-1">
                <VeeField id="product-category" name="product-category" type="text" :class="[
                  'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                ]" />
                <ErrorMessage name="product-category" class="mt-2 text-sm text-red-600" />
              </div>
            </div>
            <div class="mt-2">
              <label for="product-category" class="block text-sm text-gray-700">Product type</label>
              <div class="mt-1">
                <VeeField id="product-category" name="product-category" type="text" :class="[
                  'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                ]" />
                <ErrorMessage name="product-category" class="mt-2 text-sm text-red-600" />
              </div>
            </div>
            <div class="mt-2">
              <label for="product-category" class="block text-sm text-gray-700">Collection</label>
              <div class="mt-1">
                <VeeField id="product-category" name="product-category" type="text" :class="[
                  'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                ]" />
                <ErrorMessage name="product-category" class="mt-2 text-sm text-red-600" />
              </div>
            </div>
            <div class="mt-2">
              <label for="product-category" class="block text-sm text-gray-700">Tag</label>
              <div class="mt-1">
                <VeeField id="product-category" name="product-category" type="text" :class="[
                  'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                ]" />
                <ErrorMessage name="product-category" class="mt-2 text-sm text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </VeeForm>

  </div>
</template>

<script setup lang="ts">
import { ArrowSmallLeftIcon } from '@heroicons/vue/24/solid';
import { ROUTE_PRODUCT } from '@/constants/routers';
import Editor from '@/components/global/common/editor/index.vue';
import { ref } from 'vue';
const test = ref('<p>chao cau</p>');
</script>

<style scoped></style>
