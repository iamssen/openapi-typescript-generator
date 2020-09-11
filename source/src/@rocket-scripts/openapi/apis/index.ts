import { FetchConfiguration } from './fetchRequest';
import { QuerystringStringify } from './querystring';

export * from './collectionFormats';
export * from './fetchRequest';
export * from './querystring';
export * from './takeResponse';

export interface RequestConfiguration {
  basePath?: string;
  querystringStringify?: QuerystringStringify;
  username?: string;
  password?: string;
  apiKey?: string;
  accessToken?: string;
  headers?: HeadersInit;
  credentials?: RequestCredentials;
}

export interface ResponseConfiguration {}

export type OperationConfiguration = RequestConfiguration &
  FetchConfiguration &
  ResponseConfiguration;
