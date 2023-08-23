import BaseResponse from './base';

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IRegisterInput extends ILoginInput {
  name: string;
  passwordConfirm?: string;
}

export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IShopResponse {
  userId: string;
  name: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface ILoginMetadata {
  shop: IShopResponse;
  tokens: ITokenResponse;
}

export interface ILoginResponse extends BaseResponse {
  metadata: ILoginMetadata;
}
