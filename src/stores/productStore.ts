import { acceptHMRUpdate, defineStore } from 'pinia';
import { productApi } from '../axios/instances/productApi';

export const useProductStore = defineStore('productStore', () => {
  const getAllProductPublish = async (query) => {
    console.log('query: ', query);

    return await productApi.getAllProductPublish();
  };

  const getAllProductDraft = async (query) => {
    console.log('query: ', query);

    return await productApi.getAllProductDraft();
  };

  const getAllProductShop = async (query) => {
    console.log('query: ', query);

    return await productApi.getAllProductShop();
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
