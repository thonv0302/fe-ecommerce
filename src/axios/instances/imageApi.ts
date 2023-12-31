import AxiosBase from './axiosBase';
import AccessTokenRequestInterceptor from '../interceptors/accessToken-request-interceptor';
import AccessTokenResponseInterceptor from '../interceptors/accessToken-response-interceptor';
import { StatusCode } from '../../enums/StatusCode';

export default class ImageApi extends AxiosBase {
  private prefixURL = 'image/';
  constructor(interceptors: Array<any>) {
    const baseURL = import.meta.env.VITE_BASE_URL;
    super(interceptors, baseURL);
  }

  public async uploadImage(file: any) {
    let metadata = {};
    try {
      const { status, data } = await this.axiosInstance.post<any>(
        this.prefixURL,
        {
          file,
          belong: 'shop',
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data && data.metadata && status === StatusCode.CREATED) {
        metadata = data.metadata;
      }
    } catch (error) {
      throw error;
    }

    return metadata;
  }

  public async uploadImages(files: any) {

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('photos', files[i]);
    }
    formData.append('belong', 'product');
    let metadata = {};
    try {
      const { status, data } = await this.axiosInstance.post<any>(
        this.prefixURL + 'files',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data && data.metadata && status === StatusCode.CREATED) {
        metadata = data.metadata;
      }
    } catch (error) {
      throw error;
    }

    return metadata;
  }

  public async getImages({ belong, next_cursor, previous_cursor }: any) {
    let metadata = {};
    try {
      const { status, data } = await this.axiosInstance.get<any>(
        this.prefixURL,
        {
          params: {
            belong,
            next_cursor,
            previous_cursor,
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
}

export const imageApi = new ImageApi([
  AccessTokenRequestInterceptor,
  AccessTokenResponseInterceptor,
]);
