import { acceptHMRUpdate, defineStore } from 'pinia';
import { imageApi } from '../axios/instances/imageApi';

export const useImageStore = defineStore('imageStore', () => {
  const createImage = async (file: any) => {
    return await imageApi.uploadImage(file);
  };

  const getImages = async () => {
    return await imageApi.getImages();
  };

  return {
    createImage,
    getImages,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useImageStore, import.meta.hot));
}
