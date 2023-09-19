<template>
  <QuillEditor
    v-model:content="content"
    contentType="html"
    :options="options"
    ref="myEditor"
  />
  <!-- toolbar="full" -->
  <!-- :modules="modules" -->
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
// import ImageUploader from 'quill-image-uploader';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const myEditor = ref(null);
const content = ref('');

watch(
  () => props.modelValue,
  (newVal) => {
    content.value = newVal;
  },
  {
    immediate: true,
  }
);

watch(
  () => content.value,
  (newVal) => {
    emit('update:modelValue', newVal);
  }
);

const options = {
  // debug: 'info',
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }],
      ['link', 'image'],
      ['clean'], // remove formatting button
    ],
  },

  placeholder: '...',
  theme: 'snow',
};

// const modules = {
//   name: 'imageUploader',
//   module: ImageUploader,
//   options: {
//     upload: (file) => {
//       return new Promise((resolve, reject) => {
//         // console.log(file);
//         return;
//       });
//     },
//   },
// };

// const test = () => {
//   const toolbar = myEditor.value.getToolbar();
//   console.log(
//     'toolbar: ',
//     toolbar.addHandler('image', () => {
//       console.log('vao day');
//     })
//   );
//   // toolbar.querySelector('.ql-image').addEventListener('click', (e) => {

//   //   console.log('vao day');
//   // });
//   // toolbar.addHandler('image', () => {
//   //   console.log('adfafd');
//   // });
// };

// onMounted(() => {
//   // console.log('myEditor: ', myEditor.value.getToolbar());
//   // myEditor.value.getToolbar().addHandler('image', () => {
//   //   console.log('afasfadf');
//   // });

//   const toolbar = myEditor.value.getToolbar();

//   toolbar.addHandler('image', () => {
//     console.log('adfafd');
//   });
// });
</script>
