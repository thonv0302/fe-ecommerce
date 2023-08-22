import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed } from 'vue';
import { productApi } from '../axios/instances/productApi';

export const useProductStore = defineStore('productStore', () => {
  const getAllProductPublish = async () => {
    return await productApi.getAllProductPublish();
  };

  return {
    getAllProductPublish,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
