import AxiosBase from './axiosBase';
import {
  ILoginInput,
  ILoginMetadata,
  ILoginResponse,
  IRegisterInput,
} from '@/models/auth';
import { StatusCode } from '../../enums/StatusCode';

export default class AuthApi extends AxiosBase {
  private prefixURL = 'shop/';
  constructor(interceptors: Array<any>) {
    const baseURL = import.meta.env.VITE_BASE_URL;
    super(interceptors, baseURL);
  }

  public async login(loginInformation: ILoginInput): Promise<ILoginMetadata> {
    let metadata = {} as ILoginMetadata;
    try {
      const { status, data } = await this.axiosInstance.post<ILoginResponse>(
        this.prefixURL + 'login',
        loginInformation
      );

      if (data && data.metadata && status === StatusCode.OK) {
        metadata = data.metadata;
      }
    } catch (error) {
      throw error;
    }

    return metadata;
  }

  public async register(registerInfo: IRegisterInput): Promise<ILoginMetadata> {
    let metadata = {} as ILoginMetadata;
    try {
      const { status, data } = await this.axiosInstance.post<ILoginResponse>(
        this.prefixURL + 'signup',
        registerInfo
      );
      if (data && data.metadata && status === StatusCode.CREATED) {
        metadata = data.metadata;
      }
    } catch (error) {
      throw error;
    }

    return metadata;
  }

}

export const authApi = new AuthApi([]);
