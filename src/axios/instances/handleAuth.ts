import AxiosBase from './axiosBase';
import { StatusCode } from '../../enums/StatusCode';
import { ILoginMetadata, ILoginResponse } from '@/models/auth';
import AccessTokenRequestInterceptor from '../interceptors/accessToken-request-interceptor';
import AccessTokenResponseInterceptor from '../interceptors/accessToken-response-interceptor';

export default class handleAuth extends AxiosBase {
  private prefixURL = 'shop/';
  constructor(interceptors: Array<any>) {
    const baseURL = import.meta.env.VITE_BASE_URL;
    super(interceptors, baseURL);
  }
  public async refreshToken({
    refreshTokenValue,
  }: {
    refreshTokenValue: string;
  }): Promise<ILoginMetadata> {
    let metadata = {} as ILoginMetadata;
    try {
      const { status, data } = await this.axiosInstance.post<ILoginResponse>(
        this.prefixURL + 'handlerRefreshToken',
        {},
        {
          headers: {
            'x-rtoken-id': refreshTokenValue,
          },
        }
      );
      if (data && data.metadata && status === StatusCode.OK) {
        metadata = data.metadata;
      }
    } catch (error) {
      throw error;
    }

    return metadata;
  }
  public async logout(): Promise<any> {
    try {
      const { data } = await this.axiosInstance.post(this.prefixURL + 'logout');
      if (data && data.status === StatusCode.OK) {
        return true;
      } else {
        throw new Error('Logout fail.');
      }
    } catch (error) {
      throw error;
    }
  }
}

export const handleAuthApi = new handleAuth([
  AccessTokenRequestInterceptor,
  AccessTokenResponseInterceptor,
]);
