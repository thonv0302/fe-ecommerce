import { acceptHMRUpdate, defineStore } from 'pinia';
import { imageApi } from '../axios/instances/imageApi';

export const useImageStore = defineStore('imageStore', () => {
  const createImage = async (file: any) => {
    return await imageApi.uploadImage(file);
  };

  const getImages = async ({
    belong = '',
    next_cursor = null,
    previous_cursor = null,
  }) => {
    return await imageApi.getImages({
      belong,
      next_cursor,
      previous_cursor,
    });
  };

  return {
    createImage,
    getImages,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useImageStore, import.meta.hot));
}
