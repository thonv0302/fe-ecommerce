import AxiosBase from './axiosBase';
import AccessTokenRequestInterceptor from '../interceptors/accessToken-request-interceptor';
import AccessTokenResponseInterceptor from '../interceptors/accessToken-response-interceptor';
import { StatusCode } from '../../enums/StatusCode';

export default class ProductApi extends AxiosBase {
  private prefixURL = 'product/';
  constructor(interceptors: Array<any>) {
    const baseURL = import.meta.env.VITE_BASE_URL;
    super(interceptors, baseURL);
  }

  public async getAllProductPublish() {
    let metadata = [];
    // debugger;
    try {
      const { status, data } = await this.axiosInstance.get<any>(
        this.prefixURL + 'published/all'
      );

      if (data && data.metadata && status === StatusCode.OK) {
        metadata = data.metadata;
      }
    } catch (error) {
      metadata = [];
    }

    return metadata;
  }
}

export const productApi = new ProductApi([
  AccessTokenRequestInterceptor,
  AccessTokenResponseInterceptor,
]);
