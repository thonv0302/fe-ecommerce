<script setup lang="ts">
import { onMounted, ref, inject } from 'vue';
import { useProductStore } from '../../stores/productStore';
import { useToast } from '../../components/global/common/toast/index';
const productStore = useProductStore();

const { success, toasts } = useToast();
const toasts1 = ref(inject('toasts') as Array<any>);
onMounted(() => {
  productStore.getAllProductPublish();
});
</script>
<template>
  <div>Admin</div>
  <button @click="productStore.getAllProductPublish()">Get Product</button>
  <br />
  <button @click="success('success')">afasfsdf</button>
  <pre>toasts1: {{ toasts1 }}</pre>
  <pre>toasts: {{ toasts }}</pre>
</template>

<style scoped></style>
