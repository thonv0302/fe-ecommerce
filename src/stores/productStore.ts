import { acceptHMRUpdate, defineStore } from 'pinia';
import { productApi } from '../axios/instances/productApi';

export const useProductStore = defineStore('productStore', () => {
  const getAllProductPublish = async ({
    page,
    sortInventory,
    sortPrice,
    sortDate,
    search,
    limit
  }: any) => {
    return await productApi.getAllProductPublish({
      page,
      sortInventory,
      sortPrice,
      sortDate,
      search,
      limit
    });
  };

  const getAllProductDraft = async ({
    page,
    sortInventory,
    sortPrice,
    sortDate,
    search,
    limit
  }: any) => {

    return await productApi.getAllProductDraft({
      page,
      sortInventory,
      sortPrice,
      sortDate,
      search,
      limit
    });
  };

  const getAllProductShop = async ({
    page,
    sortInventory,
    sortPrice,
    sortDate,
    search,
    limit
  }: any) => {

    return await productApi.getAllProductShop({
      page,
      sortInventory,
      sortPrice,
      sortDate,
      search,
      limit
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
