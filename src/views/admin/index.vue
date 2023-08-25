<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductStore } from '../../stores/productStore';
import { useToast } from '../../components/global/common/toast/index';
const productStore = useProductStore();

const { success } = useToast();

onMounted(() => {
  productStore.getAllProductPublish();
});
</script>
<template>
  <div>Admin</div>
  <button @click="productStore.getAllProductPublish()">Get Product</button>
  <br />
  <button @click="success('success')">afasfsdf</button>
</template>

<style scoped></style>
