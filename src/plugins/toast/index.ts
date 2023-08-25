import { App } from 'vue';
import { useToast } from '../../components/global/common/toast/index';

export const toastMessage = {
  install: (app: App) => {
    // app.provide('toasts', []);
    app.config.globalProperties.$toast = useToast();
  },
};
