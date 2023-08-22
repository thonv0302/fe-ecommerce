import { useAuthStore } from '../../stores/authStore';
import { AxiosInstance } from 'axios';
import { StatusCode } from '../../enums/StatusCode';

export default async function setup(
  axiosInstance: AxiosInstance
): Promise<void> {
  axiosInstance.interceptors.response.use(
    async (response) => {
      // debugger;
      // const authStore = useAuthStore();

      // if (response.status === 500) {
      //   await authStore.refreshToken();
      // }
      return response;
    },
    async (err: any) => {
      const originalConfig = err.config;
      const authStore = useAuthStore();
      if (err.response.status === 500 && !originalConfig._retry) {
        originalConfig._retry = true;
        originalConfig.headers['x-rtoken-id'] =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDZkZWNjMzU3MDA2YzM3Y2Y0Y2NhMGUiLCJlbWFpbCI6Im5ndXllbnZpZXR0aG9pdDFAZ21haWwuY29tIiwibmFtZSI6IlNob3AgVGhvIiwiaWF0IjoxNjkyNjI3MjQ3LCJleHAiOjE2OTMyMzIwNDd9.72Ca6asD2Fnk72mRShfufZdX32MkD7kCU6031Eqnfx8';
        console.log('originalConfig: ', originalConfig);

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
