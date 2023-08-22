<script setup lang="ts">
import { useProductStore } from '../../stores/productStore';
const productStore = useProductStore();
</script>
<template>
  <div>Admin</div>
  <button @click="productStore.getAllProductPublish()">Get Product</button>
</template>

<style scoped></style>
