  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th
          class="py-2 items-center px-3 text-left text-sm font-medium text-gray-700 tracking-wider"
        >
          <input
            ref="checkbox"
            type="checkbox"
            class="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </th>
        <th
          scope="col"
          class="py-2 items-center px-3 text-left text-sm font-medium text-gray-700 tracking-wider"
        >
          Variant
        </th>
        <th
          scope="col"
          class="py-2 px-3 text-left text-sm font-medium text-gray-700 tracking-wider"
        >
          Price
        </th>
        <th
          scope="col"
          class="py-2 px-3 text-left text-sm font-medium text-gray-700 tracking-wider"
        >
          Available
        </th>
        <th
          scope="col"
          class="py-2 px-3 text-left text-sm font-medium text-gray-700 tracking-wider"
        >
          SKU
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="key in test" :key="key">
        <td class="px-3 py-2">
          <input
            ref="checkbox"
            type="checkbox"
            class="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </td>
        <td class="px-3 py-2">
          <span class="text-sm font-medium text-gray-500">
            {{ key }}
            <!-- {{ test[key].variants.join('/') }} -->
          </span>
        </td>
        <td class="px-3 py-2">
          <input
            type="number"
            v-model="key.price"
            :class="[
              'block w-full max-w-[150px] px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
            ]"
          />
        </td>
        <td class="px-3 py-2">
          <input
            type="number"
            v-model="key.quantity"
            :class="[
              'block w-full max-w-[150px] px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
            ]"
          />
        </td>
        <td class="px-3 py-2">
          <input
            type="text"
            v-model="key.sku"
            :class="[
              'block w-full max-w-[150px] px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
            ]"
          />
        </td>
      </tr>
    </tbody>
  </table>
  <pre>{{ options }}</pre>

newVariant.forEach((variant: Array<string>) => {
const variantSort = variant.join('/');
if (!savedValue.value[variantSort]) {
savedValue.value[variantSort] = {
price: 0,
quantity: 0,
sku: '',
};
}
});

type IVariant = {
price: number;
quantity: number;
sku: string;
};

const savedValue = ref<Record<string, IVariant>>({
// 'S/M': {
// price: 0,
// quantity: 0,
// sku: '',
// },
});
