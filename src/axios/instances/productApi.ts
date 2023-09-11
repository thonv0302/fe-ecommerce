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

  public async getAllProductShop({
    page,
    sortInventory,
    sortPrice,
    sortDate,
    search,
    limit
  }: any) {
    let metadata = [];

    try {
      const { status, data } = await this.axiosInstance.get<any>(
        this.prefixURL + 'shop/all',
        {
          params: {
            page,
            sortInventory,
            sortPrice,
            sortDate,
            search,
            limit
          }
        }
      );

      if (data && data.metadata && status === StatusCode.OK) {
        metadata = data.metadata;
      }
    } catch (error) {
      metadata = [];
    }

    return metadata;
  }

  public async getAllProductPublish({
    page,
    sortInventory,
    sortPrice,
    sortDate,
    search,
    limit
  }: any) {
    let metadata = [];
    try {
      const { status, data } = await this.axiosInstance.get<any>(
        this.prefixURL + 'published/all', {
        params: {
          page,
          sortInventory,
          sortPrice,
          sortDate,
          search,
          limit
        }
      }
      );

      if (data && data.metadata && status === StatusCode.OK) {
        metadata = data.metadata;
      }
    } catch (error) {
      metadata = [];
    }

    return metadata;
  }

  public async getAllProductDraft({
    page,
    sortInventory,
    sortPrice,
    sortDate,
    search,
    limit
  }: any) {
    let metadata = [];
    try {
      const { status, data } = await this.axiosInstance.get<any>(
        this.prefixURL + 'drafts/all',
        {
          params: {
            page,
            sortInventory,
            sortPrice,
            sortDate,
            search,
            limit
          }
        }
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
