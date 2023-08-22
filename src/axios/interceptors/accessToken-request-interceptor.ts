import { AxiosInstance } from 'axios';
import { useAuthStore } from '../../stores/authStore';
import { storeToRefs } from 'pinia';

export default async function setup(
  axiosInstance: AxiosInstance
): Promise<void> {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const { accessToken, shopInfo } = storeToRefs(useAuthStore());
      config.headers.Authorization = `Bearer ${accessToken.value}`;
      config.headers['x-client-id'] = shopInfo.value.userId;
      return config;
    },
    (err: Error) => {
      return Promise.reject(err);
    }
  );
}
