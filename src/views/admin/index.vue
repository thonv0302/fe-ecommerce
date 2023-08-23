<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductStore } from '../../stores/productStore';
const productStore = useProductStore();

onMounted(() => {
  productStore.getAllProductPublish();
});
</script>
<template>
  <div>Admin</div>
  <button @click="productStore.getAllProductPublish()">Get Product</button>
</template>

<style scoped></style>
