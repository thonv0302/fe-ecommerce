export enum ToastType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

export interface ToastOptions {
  type?: ToastType;
  title?: string;
  dismissible?: boolean;
  timeout?: number;
}
export interface Toast extends ToastOptions {
  message: string;
  id: string;
}
