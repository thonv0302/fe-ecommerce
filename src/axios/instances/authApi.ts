import AxiosBase from './axiosBase';
import { ILoginInput, ILoginMetadata, ILoginResponse } from '@/models/auth';

export default class AuthApi extends AxiosBase {
  constructor(interceptors: Array<any>) {
    const baseURL = import.meta.env.BASE_URL;
    super(interceptors, baseURL);
  }

  /**
   * name
   */
  public async login(loginInfor: ILoginInput): Promise<ILoginMetadata> {
    let metadata = {} as ILoginMetadata;
    try {
      const { status, data } = await this.axiosInstance.post<ILoginResponse>(
        'shop/login',
        loginInfor
      );
      if (data && data.metadata && status === 200) {
        metadata = data.metadata;
      }
    } catch (error) {
      // throw error;
    }

    return metadata;
  }
}
