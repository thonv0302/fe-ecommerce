import { acceptHMRUpdate, defineStore } from 'pinia';
import { authApi } from '../axios/instances/authApi';
import { computed, ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { useCookies } from '@vueuse/integrations/useCookies';
import { ILoginInput, IRegisterInput, ITokenResponse } from '@/models/auth';

export const useAuthStore = defineStore('useAuth', () => {
  const cookies = useCookies(['authCookies'], { autoUpdateDependencies: true });
  const shopInfo: any = useLocalStorage('user', {});
  const rememberMe = ref(false);
  const token = computed(() => cookies.get('authCookies'));
  const isAuthenticated = computed(() => !!token.value);
  const accessToken = computed(() => token.value.accessToken);
  const refreshTokenValue = computed(() => token.value.refreshToken);
  const userId = computed(() => shopInfo.value.userId);

  const login = async (data: ILoginInput) => {
    try {
      const metadata = await authApi.login(data);
      shopInfo.value = metadata.shop;
      setCookies(metadata.tokens);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: IRegisterInput) => {
    try {
      const metadata = await authApi.register(data);
      shopInfo.value = metadata.shop;
      setCookies(metadata.tokens);
    } catch (error) {
      throw error;
    }
  };

  const refreshToken = async () => {
    try {
      const metadata = await authApi.refreshToken({
        refreshTokenValue: refreshTokenValue.value,
        userId: userId.value,
      });
      shopInfo.value = metadata.shop;
      setCookies(metadata.tokens);
    } catch (error) {
      throw error;
    }
  };

  const setCookies = (metadata: ITokenResponse) => {
    let maxAge = 86400; // 1 day
    if (rememberMe.value) {
      maxAge *= 30; // 30 days
    }
    cookies.set('authCookies', metadata, {
      maxAge,
    });
  };

  // const removeCookies = () => {
  //   cookies.remove('authCookies');
  // };

  return {
    token,
    accessToken,
    isAuthenticated,
    rememberMe,
    shopInfo,
    login,
    register,
    refreshToken,
    refreshTokenValue,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}