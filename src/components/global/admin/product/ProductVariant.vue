<template>
  <VeeForm v-slot="{ errors }" ref="form">
    <draggable
      item-key="id"
      handle=".drag-handle"
      :animation="100"
      v-model="options"
      group="options"
      ghostClass="sortable-ghost"
      :force-fallback="true"
      @start="onChange"
      @end="onEnd"
    >
      <template #item="{ element: option, index: optionIdx }">
        <div
          class="rounded bg-slate-50 mb-2"
          @mouseup="dragging(option, false)"
        >
          <div
            class="option py-1 px-2"
            v-if="!option.isDraging && !option.isDone"
          >
            <span class="text-sm ms-10"> Option name</span>
            <div class="flex">
              <div
                v-if="
                  isDragableIcon({
                    title: option.title,
                    values: option.values,
                    id: option.id,
                  })
                "
                :class="[
                  'flex cursor-move w-8 h-8 justify-center items-center me-2 drag-handle text-slate-900',
                ]"
                @mousedown="dragging(option, true)"
              >
                <span>⠋</span>
              </div>
              <div
                v-else
                class="flex cursor-move w-8 h-8 justify-center items-center me-2 text-slate-400"
              >
                <span>⠋</span>
              </div>
              <div class="flex-1">
                <VeeField
                  :name="`option${option.id}`"
                  :id="`option${option.id}`"
                  type="text"
                  rules="required"
                  v-model="option.title"
                  @focusout="validateFormField"
                  :class="[
                    'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none text-sm',
                    {
                      'ring-red-500 border-red-500':
                        errors[`option${option.id}`],
                    },
                  ]"
                />
                <ErrorMessage
                  :name="`option${option.id}`"
                  class="mt-2 text-sm text-red-600"
                />
              </div>
              <a
                role="button"
                class="p-2 inline-block"
                @click="removeOption(optionIdx)"
              >
                <TrashIcon class="w-4 h-4 text-slate-500" />
              </a>
            </div>
          </div>
          <draggable
            v-model="option.values"
            handle=".drag-handle"
            :group="{ name: 'values', pull: false }"
            :animation="150"
            item-key="id"
            :force-fallback="true"
          >
            <template #header>
              <div
                v-if="!option.isDraging && !option.isDone"
                class="text-sm ms-14 mt-2"
              >
                Option values
              </div>
            </template>
            <template #item="{ element: value, index: valueIdx }">
              <div class="rounded bg-slate-50">
                <div
                  class="option flex py-1 ps-1 pe-2"
                  v-if="!option.isDraging && !option.isDone"
                >
                  <div
                    class="drag-handle cursor-move w-8 h-8 justify-center items-center ms-6 text-slate-900"
                  >
                    <span>⠋</span>
                  </div>
                  <div class="flex-1">
                    <VeeField
                      :name="`option${option.id}value${value.id}`"
                      :id="`option${option.id}value${value.id}`"
                      type="text"
                      rules="required"
                      @focusout="validateFormField"
                      v-model="value.title"
                      :class="[
                        'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none text-sm',
                        {
                          'ring-red-500 border-red-500':
                            errors[`option${option.id}value${value.id}`],
                        },
                      ]"
                    />
                    <ErrorMessage
                      :name="`option${option.id}value${value.id}`"
                      class="mt-2 text-sm text-red-600"
                    />
                  </div>
                  <a
                    role="button"
                    class="p-2 inline-block"
                    @click="removeValue(optionIdx, valueIdx)"
                  >
                    <TrashIcon class="w-4 h-4 text-slate-500" />
                  </a>
                </div>
              </div>
            </template>
          </draggable>
          <div
            v-if="!option.isDraging && !option.isDone"
            class="py-1 ps-14 pe-10"
          >
            <VeeField
              type="text"
              @keyup.enter="addValue(option)"
              v-model="option.newValue"
              :rules="option.values.length === 0 ? 'required' : ''"
              :name="`option${option.id}newValue`"
              @focusout="validateFormField"
              :class="[
                'block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none text-sm',
                {
                  'ring-red-500 border-red-500':
                    errors[`option${option.id}newValue`],
                },
              ]"
            />
            <div>
              <ErrorMessage
                :name="`option${option.id}newValue`"
                class="mt-2 text-sm text-red-600"
              />
            </div>
            <a
              role="button"
              class="my-2 inline-block shadow text-sm py-1 px-2 border transition-all hover:bg-gray-100 rounded-md me-2"
              @click="doneOption(option)"
              type="submit"
            >
              Done
            </a>
          </div>
          <div v-if="option.isDraging || option.isDone">
            <div class="option flex py-3 px-5">
              <span class="me-5 drag-handle cursor-move">⠋</span>
              <div class="text-sm flex-1">
                <div class="flex justify-between">
                  <h6 class="font-medium">{{ option.title }}</h6>
                  <a
                    @click="option.isDone = false"
                    class="shadow-sm text-sm py-1 px-2 border transition-all hover:bg-gray-100 rounded-md"
                  >
                    Edit
                  </a>
                </div>
                <div class="mt-2">
                  <span
                    v-for="value in option.values"
                    class="rounded-lg px-3 py-2 bg-slate-200 me-2"
                  >
                    {{ value.title }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </draggable>
  </VeeForm>
  <pre>{{ options }}</pre>
  <div>
    <hr class="-mx-3" />
    <a
      @click="addOption"
      role="button"
      class="py-3 block text-sm transition-all text-blue-600 hover:underline"
      >+ Add another option</a
    >
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import draggable from 'vuedraggable';
import { TrashIcon } from '@heroicons/vue/24/solid';

import { nanoid } from 'nanoid';

const form = ref<any>(null);

const removeOption = (idx: number) => {
  options.value.splice(idx, 1);
};

const removeValue = (optionIdx: number, valueIdx: number) => {
  options.value[optionIdx].values.splice(valueIdx, 1);
};

const doneOption = async (option: any) => {
  const errors = form.value.getErrors() || {};
  let isError = false;
  for (const errorKey in errors) {
    isError ||= errorKey.includes(option.id);
  }

  if (isError) return;

  const validateInputNames = [
    `option${option.id}`,
    ...option.values.map((value: any) => `option${option.id}value${value.id}`),
  ];

  let isValid: boolean = true;
  for (const validate of validateInputNames) {
    const { valid } = await form.value.validateField(validate);

    isValid &&= valid;
  }
  if (option.values.length === 0) {
    await form.value.validateField(`option${option.id}newValue`);
  }
  if (!isValid) return;

  if (option.values.length === 0 && !option.newValue) {
    option.isDone = false;
    option.isValidateDone = false;
  }
  if (option.newValue) {
    option.values.push({
      title: option.newValue,
      id: nanoid(),
    });
    option.newValue = '';
    option.isDone = true;
    option.isValidateDone = false;
  }
  if (option.values.length > 0 && !option.newValue) {
    option.isDone = true;
    option.isValidateDone = false;
  }

  option.isValidateDone = true;
};

const addValue = (option: any) => {
  if (option.newValue) {
    option.values.push({
      title: option.newValue,
      id: nanoid(),
    });
    option.newValue = '';
  }
};

const addOption = () => {
  options.value.push({
    title: '',
    id: nanoid(),
    values: [],
    newValue: '',
    isDone: false,
    isDraging: false,
    isValidateDone: false,
    uniqueValues: [],
  });
};

const dragging = (option: any, status: boolean) => {
  option.isDraging = status;
};

const onChange = () => {};

const onEnd = (evt: any) => {
  options.value[evt.newIndex].isDraging = false;
};

const options = ref([
  {
    title: 'Size',
    id: nanoid(),
    values: [
      {
        title: 'L',
        id: nanoid(),
      },
      {
        title: 'M',
        id: nanoid(),
      },
    ],
    isDone: true,
    isDraging: false,
    newValue: '',
    isValidateDone: false,
    uniqueValues: [],
  },
  {
    title: 'Color',
    id: nanoid(),
    values: [],
    isDone: false,
    isDraging: false,
    newValue: '',
    isValidateDone: false,
    uniqueValues: [],
  },
  {
    title: 'Style',
    id: nanoid(),
    values: [],
    isDone: false,
    isDraging: false,
    newValue: '',
    isValidateDone: false,
    uniqueValues: [],
  },
]);

const validateForm = ref();

watch(
  () => options.value,
  (newVal) => {
    validateForm.value = newVal.reduce((obj: any, ele) => {
      if (ele.title && !obj[`${ele.title}`]) {
        obj[`${ele.title}`] = {
          optionId: ['option' + ele.id],
          errMess: ele.title,
          values: {},
        };
        if (ele.values.length > 0) {
          ele.values.forEach((value) => {
            if (
              value.title &&
              !obj[`${ele.title}`]['values'][`${value.title}`]
            ) {
              obj[`${ele.title}`]['values'][`${value.title}`] = {
                valueId: ['option' + ele.id + 'value' + value.id],
                errMess: value.title,
              };
            } else if (obj[`${ele.title}`]['values'][`${value.title}`]) {
              obj[`${ele.title}`]['values'][`${value.title}`].valueId.push(
                'option' + ele.id + 'value' + value.id
              );
            }
          });
        }
        if (ele.newValue && !obj[`${ele.title}`]['values'][`${ele.newValue}`]) {
          obj[`${ele.title}`]['values'][`${ele.newValue}`] = {
            valueId: ['option' + ele.id + 'newValue'],
            errMess: ele.newValue,
          };
        } else if (obj[`${ele.title}`]['values'][`${ele.newValue}`]) {
          obj[`${ele.title}`]['values'][`${ele.newValue}`].valueId.push(
            'option' + ele.id + 'newValue'
          );
        }
      } else if (obj[`${ele.title}`]) {
        obj[`${ele.title}`].optionId.push('option' + ele.id);
      }

      return obj;
    }, {});

    validateFormField();
  },
  {
    deep: true,
  }
);

const validateFormField = () => {
  for (const obj in validateForm.value) {
    if (validateForm.value[obj].optionId.length > 1) {
      for (const id of validateForm.value[obj].optionId) {
        form.value.setFieldError(
          id,
          'The option name has the same value ' +
            validateForm.value[obj].errMess +
            ' with others.'
        );
      }
    } else {
      form.value.setFieldError(validateForm.value[obj].optionId[0], '');
    }
    for (const val in validateForm.value[obj].values) {
      if (validateForm.value[obj].values[val].valueId.length > 1) {
        for (const valId of validateForm.value[obj].values[val].valueId) {
          form.value.setFieldError(
            valId,
            'The option value in ' +
              validateForm.value[obj].errMess +
              ' has the same value ' +
              validateForm.value[obj].values[val].errMess +
              ' with others.'
          );
        }
      } else {
        form.value.setFieldError(
          validateForm.value[obj].values[val].valueId[0],
          ''
        );
      }
    }
  }
};

const isDragableIcon = computed(() => (option: any) => {
  // console.log('option: ', option);
  //
  let isDisabled = !!option.title;
  const errors = form.value.getErrors() || {};
  for (const errorKey in errors) {
    // isError ||= errorKey.includes(option.id);
    // console.log('errorKey: ', errorKey.includes(option.id));
    isDisabled &&= errorKey.includes(option.id);
  }

  for (const value of option.values) {
    isDisabled &&= !!value.title;
  }
  if (option.values.length === 0) {
    isDisabled &&= false;
  }

  console.log('isDisabled: ', isDisabled);

  return isDisabled;
});
</script>

<style>
.sortable-ghost .option {
  position: relative;
}

.sortable-ghost .option::after {
  content: '';
  @apply absolute top-0 bottom-0 left-0 right-0 bg-slate-200 rounded;
}
</style>
