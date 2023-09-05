import { useAuthStore } from '../../stores/authStore';
import { AxiosInstance } from 'axios';
import { StatusCode } from '../../enums/StatusCode';

export default async function setup(
  axiosInstance: AxiosInstance
): Promise<void> {
  axiosInstance.interceptors.response.use(
    async (response) => {
      return response;
    },
    async (err: any) => {
      const originalConfig = err.config;
      const authStore = useAuthStore();

      if (
        err.response.status === StatusCode.UNAUTHORIZED &&
        !originalConfig._retry
      ) {
        try {
          await authStore.refreshToken();
          return axiosInstance(originalConfig);
        } catch (error) {
          return Promise.reject(error);
        }
      }

      return Promise.reject(err);
    }
  );
}
