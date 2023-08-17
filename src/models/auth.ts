import BaseResponse from './base';

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ILoginMetadata {
  shop: {
    _id: string;
    name: string;
    email: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ILoginResponse extends BaseResponse {
  metadata: ILoginMetadata;
}
