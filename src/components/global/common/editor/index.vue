<template>
  <div id="editor"></div>
  <ManageImageModal
    @closeModel="isShowModal = false"
    :isShowModal="isShowModal"
    size="md"
    @insertImageUrl="(img) => insertImage(img)"
  />
</template>

<script setup lang="ts">
import Quill from 'quill';
import ImageResize from 'quill-image-resize';
Quill.register('modules/imageResize', ImageResize);
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';
import { onMounted, ref, onUnmounted } from 'vue';
import ManageImageModal from '@/components/global/admin/product/modal/ManageImage.vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'handleImage', 'onBlur']);

const quill = ref();

const isShowModal = ref(false);

onMounted(() => {
  var options = {
    modules: {
      imageResize: {},
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
    let data = '';
    if (quill.value.getText().trim()) {
      data = quill.value.root.innerHTML;
    }
    emit('update:modelValue', data);
  });

  quill.value.root.addEventListener('blur', () => {
    emit('onBlur');
  });
  quill.value.root.innerHTML = props.modelValue;

  var toolbar = quill.value.getModule('toolbar');
  toolbar.addHandler('image', () => {
    isShowModal.value = true;
  });
});

const insertImage = (url: string) => {
  // quill.value.focus();
  quill.value.insertEmbed(
    quill.value.getSelection()?.index || 0,
    'image',
    url,
    'api'
  );
  isShowModal.value = false;
};

onUnmounted(() => {
  if (quill.value) {
    quill.value = null;
  }
});
</script>

<style scoped>
.ql-editor {
  max-height: 400px;
}
</style>
