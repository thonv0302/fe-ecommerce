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

    public async uploadImage(imageInfo: any) {
        let metadata = {};
        try {
            const { status, data } = await this.axiosInstance.post<any>(
                this.prefixURL,
                imageInfo
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

export const imageApi = new ImageApi([
    AccessTokenRequestInterceptor,
    AccessTokenResponseInterceptor,
]);
