import { acceptHMRUpdate, defineStore } from 'pinia';
import { productApi } from '../axios/instances/productApi';

export const useProductStore = defineStore('productStore', () => {
  const getAllProductPublish = async (route) => {
    return await productApi.getAllProductPublish(route);
  };

  const getAllProductDraft = async (route) => {
    return await productApi.getAllProductDraft(route);
  };

  const getAllProductShop = async (route) => {
    return await productApi.getAllProductShop(route);
  };

  return {
    getAllProductPublish,
    getAllProductDraft,
    getAllProductShop,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
