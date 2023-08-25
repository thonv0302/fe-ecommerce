import { ref } from 'vue';
import { nanoid } from 'nanoid';

enum ToastType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

interface ToastOptions {
  type?: ToastType;
  title?: string;
  dismissible?: boolean;
  timeout?: number;
}
interface Toast extends ToastOptions {
  message: string;
  id: string;
}

const toasts = ref<Toast[]>([]);
export const useToast = () => {

  const toast = (message: string, options?: ToastOptions) => {
    const id = nanoid();
    const defaults: Partial<Toast> = {
      type: ToastType.Success,
      dismissible: true,
      timeout: 3000,
    };

    toasts.value.push({ id, ...defaults, message, ...options });
    let timeout =
      options?.timeout === undefined ? defaults.timeout : options.timeout;
    if (timeout) {
      setTimeout(() => dismiss(id), timeout);
    }
  };

  const dismiss = (idOrToast: string | Toast) => {
    const id = typeof idOrToast === 'string' ? idOrToast : idOrToast.id;
    toasts.value = toasts.value.filter((toast: Toast) => toast.id !== id);
  };

  const success = (message: string, options: ToastOptions = {}) => {
    toast(message, { ...options, type: ToastType.Success });
  };

  const error = (message: string, options: ToastOptions = {}) => {
    toast(message, { ...options, type: ToastType.Error });
  };

  const info = (message: string, options: ToastOptions = {}) => {
    toast(message, { ...options, type: ToastType.Info });
  };

  const warning = (message: string, options: ToastOptions = {}) => {
    toast(message, { ...options, type: ToastType.Warning });
  };

  return {
    toasts,
    success,
    error,
    info,
    warning,
  };
};
