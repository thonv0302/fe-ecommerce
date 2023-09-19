<template>
  <div id="editor"></div>
</template>

<script setup lang="ts">
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';
import { onMounted, ref, onUnmounted } from 'vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'handleImage']);

const quill = ref();
onMounted(() => {
  var options = {
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
    placeholder: 'Description here...',
    theme: 'snow',
  };
  quill.value = new Quill('#editor', options);

  quill.value.on('text-change', () => {
    emit('update:modelValue', quill.value.root.innerHTML);
  });

  quill.value.root.innerHTML = props.modelValue;
  // console.log('quill.value: ', quill.value);

  var toolbar = quill.value.getModule('toolbar');
  toolbar.addHandler('image', () => {
    emit('handleImage');
  });
});

onUnmounted(() => {
  if (quill.value) {
    quill.value = null;
  }
});
</script>

<style scoped></style>
