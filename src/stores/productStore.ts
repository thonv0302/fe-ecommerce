import { acceptHMRUpdate, defineStore } from 'pinia';
import { productApi } from '../axios/instances/productApi';

export const useProductStore = defineStore('productStore', () => {
  const getAllProductPublish = async ({
    page,
    sortTitle,
    sortInventory,
    sortPrice,
    sortDate,
    search,
    size,
  }: any) => {
    return await productApi.getAllProductPublish({
      page,
      sortTitle,
      sortInventory,
      sortPrice,
      sortDate,
      search,
      size,
    });
  };

  const getAllProductDraft = async ({
    page,
    sortTitle,
    sortInventory,
    sortPrice,
    sortDate,
    search,
    size,
  }: any) => {
    return await productApi.getAllProductDraft({
      page,
      sortTitle,
      sortInventory,
      sortPrice,
      sortDate,
      search,
      size,
    });
  };

  const getAllProductShop = async ({
    page,
    sortTitle,
    sortInventory,
    sortPrice,
    sortDate,
    search,
    size,
  }: any) => {
    return await productApi.getAllProductShop({
      page,
      sortTitle,
      sortInventory,
      sortPrice,
      sortDate,
      search,
      size,
    });
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
