<template>
  <div>
    <div class="flex items-center mb-4">
      <RouterLink
        :to="{
          name: ROUTE_PRODUCT.list.name,
        }"
        class="p-2"
      >
        <ArrowSmallLeftIcon class="w-4 h-4" />
      </RouterLink>
      <h1>Add product</h1>
    </div>
    <VeeForm v-slot="{ errors }" ref="form" class="mb-3" @submit="onSubmit">
      <div class="grid grid-cols-1 md:grid-cols-3 md:gap-x-4">
        <div class="col-span-2">
          <!-- <div class="bg-white shadow-sm border rounded-md p-3">
            <div class="space-y-1">
              <label for="title" class="block text-sm text-gray-700">
                Title
              </label>
              <div class="mt-1">
                <VeeField
                  id="title"
                  name="title"
                  type="text"
                  rules="required"
                  v-model="product.title"
                  :class="[
                    'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                    {
                      'ring-red-500 border-red-500  focus:ring-red-500 focus:border-red-500':
                        errors.title,
                    },
                  ]"
                />
                <ErrorMessage name="title" class="mt-2 text-sm text-red-600" />
              </div>
            </div>
            <div class="mt-3">
              <label for="description" class="block text-sm text-gray-70">
                Description
              </label>
              <VeeField
                id="description"
                name="description"
                :value="product.description"
                v-slot="{ field }"
                rules="required"
              >
                <div
                  :class="[
                    'mt-1 rounded-md border shadow-sm overflow-hidden',
                    {
                      'border-gray-300': !errors.description,
                      'border-red-500': errors.description,
                    },
                  ]"
                >
                  <Editor
                    v-bind="field"
                    v-model="product.description"
                    @onBlur="triggerBlur"
                  />
                </div>
                <ErrorMessage
                  name="description"
                  class="mt-2 text-sm text-red-600"
                />
              </VeeField>
            </div>
          </div> -->
          <!-- <div class="bg-white shadow-sm border rounded-md p-3 mt-3">
            <div class="sm:col-span-6">
              <label
                for="cover-photo"
                class="block text-sm font-medium text-gray-700"
              >
                Media
              </label>
              <div
                v-if="product.media.length === 0"
                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
              >
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        class="sr-only"
                        multiple
                        @change="uploadFiles($event, 'new')"
                      />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-sm text-gray-500">
                    Accepts images, PNG, JPG, GIF.
                  </p>
                </div>
              </div>
              <div class="mt-3" v-else>
                <DnDImage
                  v-model="product.media"
                  @onChange="(event, type) => uploadFiles(event, type)"
                />
              </div>
            </div>
          </div> -->
          <!-- <div class="bg-white shadow-sm border rounded-md p-3 mt-3">
            <h6 class="text-sm font-semibold text-gray-700 mb-3">Pricing</h6>
            <div class="flex flex-col md:flex-row md:gap-x-4">
              <div class="space-y-1 flex-1">
                <label for="password" class="block text-sm text-gray-700">
                  Price
                </label>
                <div class="mt-1">
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-2 flex items-center text-sm text-gray-700"
                    >
                      $
                    </div>
                    <VeeField
                      id="price"
                      name="Price"
                      type="number"
                      rules="min_value:1"
                      v-model="product.price"
                      placeholder="0"
                      :class="[
                        'block w-full pl-5 pr-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                        {
                          'ring-red-500 border-red-500  focus:ring-red-500 focus:border-red-500':
                            errors.Price,
                        },
                      ]"
                    />
                  </div>
                  <ErrorMessage
                    name="Price"
                    class="mt-2 text-sm text-red-600"
                  />
                </div>
              </div>
              <div class="space-y-1 flex-1 mt-2 md:mt-0">
                <label for="password" class="block text-sm text-gray-700">
                  Compare-at price
                </label>
                <div class="mt-1">
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-2 flex items-center text-sm text-gray-700"
                    >
                      $
                    </div>
                    <VeeField
                      id="price"
                      name="Compare at price"
                      type="number"
                      rules="min_value:1"
                      v-model="product.compareAtPrice"
                      placeholder="0"
                      :class="[
                        'block w-full pl-5 pr-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                        {
                          'ring-red-500 border-red-500  focus:ring-red-500 focus:border-red-500':
                            errors['Compare at price'],
                        },
                      ]"
                    />
                  </div>
                  <ErrorMessage
                    name="Compare at price"
                    class="mt-2 text-sm text-red-600"
                  />
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
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-2 flex items-center text-sm text-gray-700"
                    >
                      $
                    </div>
                    <VeeField
                      id="price"
                      name="Cost per item"
                      type="number"
                      rules="min_value:1"
                      v-model="product.costPerItem"
                      placeholder="0"
                      :class="[
                        'block w-full pl-5 pr-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                        {
                          'ring-red-500 border-red-500  focus:ring-red-500 focus:border-red-500':
                            errors['Cost per item'],
                        },
                      ]"
                    />
                  </div>
                  <ErrorMessage
                    name="Cost per item"
                    class="mt-2 text-sm text-red-600"
                  />
                </div>
              </div>
              <div class="space-y-1 flex-1 mt-2 md:mt-0">
                <label for="profit" class="block text-sm text-gray-700">
                  Profit
                </label>
                <div class="mt-1">
                  <VeeField
                    :disabled="true"
                    id="profit"
                    name="profit"
                    type="text"
                    v-model="product.profit"
                    :class="[
                      'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                    ]"
                  />
                </div>
              </div>
              <div class="space-y-1 flex-1 mt-2 md:mt-0">
                <label for="margin" class="block text-sm text-gray-700">
                  Margin
                </label>
                <div class="mt-1">
                  <VeeField
                    :disabled="true"
                    id="margin"
                    name="margin"
                    type="text"
                    v-model="product.margin"
                    :class="[
                      'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                    ]"
                  />
                </div>
              </div>
            </div>
          </div> -->
          <!-- <div class="bg-white shadow-sm border rounded-md p-3 mt-3">
            <h6 class="text-sm font-semibold text-gray-700 mb-3">Shipping</h6>
            <div class="flex flex-col md:flex-row md:gap-x-4">
              <div class="space-y-1 flex-1">
                <label for="sku" class="block text-sm text-gray-700">
                  SKU (Stock Keeping Unit)
                </label>
                <div class="mt-1">
                  <VeeField
                    name="sku"
                    type="text"
                    rules="required"
                    :class="[
                      'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                      {
                        'ring-red-500 border-red-500  focus:ring-red-500 focus:border-red-500':
                          errors.sku,
                      },
                    ]"
                  />
                  <ErrorMessage name="sku" class="mt-2 text-sm text-red-600" />
                </div>
              </div>
              <div class="space-y-1 flex-1 mt-2 md:mt-0">
                <label for="quantity" class="block text-sm text-gray-700">
                  Quantity
                </label>
                <div class="mt-1">
                  <VeeField
                    id="quantity"
                    name="quantity"
                    type="number"
                    rules="min_value:0"
                    v-model="product.quantity"
                    :class="[
                      'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                      {
                        'ring-red-500 border-red-500  focus:ring-red-500 focus:border-red-500':
                          errors.quantity,
                      },
                    ]"
                  />
                  <ErrorMessage
                    name="quantity"
                    class="mt-2 text-sm text-red-600"
                  />
                </div>
              </div>
            </div>
          </div> -->

          <div class="bg-white shadow-sm border rounded-md p-3 mt-3">
            <h6 class="text-sm font-semibold text-gray-700 mb-3">Variants</h6>
            <hr class="-mx-3" />

            <a
              v-if="!openVariantComponent"
              @click="openVariantComponent = true"
              role="button"
              class="pt-3 block text-sm transition-all text-blue-600 hover:underline"
              >+ Add options like size or color</a
            >
            <div class="py-2" v-else>
              <ProductVariant />
            </div>
          </div>
        </div>
        <div class="mt-3 md:mt-0">
          <div class="bg-white shadow-sm border rounded-md p-3">
            <div>
              <label
                for="status"
                class="block text-sm font-semibold text-gray-700"
                >Status</label
              >
              <VeeField
                as="select"
                id="status"
                name="status"
                v-model="product.isPublished"
                class="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option :value="true">Publish</option>
                <option :value="false">Draft</option>
              </VeeField>
              <ErrorMessage name="status" class="mt-2 text-sm text-red-600" />
            </div>
          </div>
          <div class="bg-white shadow-sm border rounded-md p-3 mt-3">
            <h6 class="text-sm font-semibold text-gray-700 mb-3">
              Product organization
            </h6>
            <div>
              <label for="product-category" class="block text-sm text-gray-700"
                >Product category</label
              >
              <div class="mt-1">
                <VeeField
                  id="product-category"
                  name="product-category"
                  type="text"
                  :class="[
                    'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                  ]"
                />
                <ErrorMessage
                  name="product-category"
                  class="mt-2 text-sm text-red-600"
                />
              </div>
            </div>
            <div class="mt-2">
              <label for="product-category" class="block text-sm text-gray-700"
                >Product type</label
              >
              <div class="mt-1">
                <VeeField
                  id="product-category"
                  name="product-category"
                  type="text"
                  :class="[
                    'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                  ]"
                />
                <ErrorMessage
                  name="product-category"
                  class="mt-2 text-sm text-red-600"
                />
              </div>
            </div>
            <div class="mt-2">
              <label for="product-category" class="block text-sm text-gray-700"
                >Collection</label
              >
              <div class="mt-1">
                <VeeField
                  id="product-category"
                  name="product-category"
                  type="text"
                  :class="[
                    'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                  ]"
                />
                <ErrorMessage
                  name="product-category"
                  class="mt-2 text-sm text-red-600"
                />
              </div>
            </div>
            <div class="mt-2">
              <label for="product-category" class="block text-sm text-gray-700"
                >Tag</label
              >
              <div class="mt-1">
                <VeeField
                  id="product-category"
                  name="product-category"
                  type="text"
                  :class="[
                    'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
                  ]"
                />
                <ErrorMessage
                  name="product-category"
                  class="mt-2 text-sm text-red-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-end mt-3">
        <button
          type="submit"
          class="px-2 py-1 border text-sm transition-all rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </VeeForm>
  </div>
</template>

<script setup lang="ts">
import { ArrowSmallLeftIcon } from '@heroicons/vue/24/solid';
import { ROUTE_PRODUCT } from '@/constants/routers';
import Editor from '@/components/global/common/editor/index.vue';
import { reactive, ref } from 'vue';
import DnDImage from '@/components/global/common/dnd/index.vue';
import ProductVariant from '@/components/global/admin/product/ProductVariant.vue';
import { useImageStore } from '@/stores/imageStore.ts';
// import TrelloBoard from '@/components/trello/TrelloBoard.vue';

const openVariantComponent = ref(false);

const form = ref();

const product = reactive<{
  media: Array<any>;
  title: String;
  description: String;
  status: String;
  productCategory: String;
  collection: Array<any>;
  tag: Array<any>;
  isPublished: Boolean;
  price: Number;
  compareAtPrice: Number;
  costPerItem: Number;
  profit: String;
  margin: String;
  quantity: Number;
}>({
  title: '',
  description: '',
  media: [],
  status: '',
  productCategory: '',
  collection: [],
  tag: [],
  isPublished: false,
  price: 0,
  compareAtPrice: 0,
  costPerItem: 0,
  profit: '--',
  margin: '--',
  quantity: 0,
});

const uploadFiles = async (event: any, type = 'new') => {
  const files = event.target.files;

  if (files.length > 0) {
    let idx = product.media.length;
    const images: Array<any> = [...files].map((file) => {
      const url = URL.createObjectURL(file);

      return {
        id: ++idx,
        url,
      };
    });

    if (type === 'new') {
      product.media = images;
    } else {
      product.media.push(...images);
    }
  }

  // await imageStore.createImages(event.target.files);
};

const imageStore = useImageStore();

const triggerBlur = () => {
  if (!product.description) {
    form.value.setFieldError('description', 'This field is required');
  }
  form.value.setFieldTouched('description', true);
};

const onSubmit = () => {
  console.log('vao day');
};
</script>

<style scoped></style>
