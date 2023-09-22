import { acceptHMRUpdate, defineStore } from 'pinia';
import { imageApi } from '../axios/instances/imageApi';

export const useImageStore = defineStore('imageStore', () => {
    const createImage = async ({ name, alt, url, size, type, belong }: any) => {
        return await imageApi.uploadImage({ name, alt, url, size, type, belong })
    }

    return {
        createImage
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useImageStore, import.meta.hot));
}
