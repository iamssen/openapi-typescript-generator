/**
 * Callback Example
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * Do not edit the class manually.
 */

import type {
  UrlQueryInput,
  OperationConfiguration,
  RequestConfiguration,
  ResponseConfiguration,
  FetchParameters,
} from '@rocket-scripts/openapi';
import {
  pipe,
  collectionFormats,
  querystring,
  fetchRequest,
  APIRequestError,
  APIExceptionError,
} from '@rocket-scripts/openapi';
import { typeSerializer } from '../runtime';

/* eslint-disable */

export interface StreamsPostRequestParameters {
  callbackUrl: string;
}

/**
 * subscribes a client to receive out-of-band data
 * @throws {APIRequestError} throw when the request is not correct
 * @throws {APISerializeError} throw when fail serialize data (include request and response)
 */
export const streamsPostRequest = ({
  basePath = '',
  querystringStringify = querystring,
  username,
  password,
  apiKey,
  accessToken,
  headers,
  credentials,
}: RequestConfiguration = {}) => (
  requestParameters: StreamsPostRequestParameters,
): FetchParameters => {
  if (
    requestParameters.callbackUrl === null ||
    requestParameters.callbackUrl === undefined
  ) {
    throw new APIRequestError(
      `Required parameter requestParameters.callbackUrl was null or undefined when calling streamsPost.`,
    );
  }

  const queryParameters: UrlQueryInput = {};

  if (requestParameters.callbackUrl !== undefined) {
    queryParameters['callbackUrl'] = requestParameters.callbackUrl;
  }

  const headerParameters: Headers = new Headers(headers);

  let url: string = `${basePath.replace(/\/+$/, '')}/streams`;
  if (queryParameters && Object.keys(queryParameters).length > 0) {
    url += '?' + querystringStringify(queryParameters);
  }

  const body = undefined;

  return {
    input: url,
    init: {
      method: 'POST',
      headers: headerParameters,
      credentials,
      body,
    },
  };
};

/**
 * subscribes a client to receive out-of-band data
 * @throws {APIExceptionError} throw when response is out of 2xx
 * @throws {Response} throw when the response.status is not accepted (fallback throwing)
 * @throws {APISerializeError} throw when fail serialize data (include request and response)
 */
export const streamsPostResponse = (
  configuration: ResponseConfiguration = {},
) => async (response: Response): Promise<object> => {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    switch (response.status.toString()) {
      default:
        throw response;
    }
  }
};

/**
 * subscribes a client to receive out-of-band data
 * @throws {APIRequestError} throw when the request is not correct
 * @throws {APIExceptionError} throw when response is out of 2xx
 * @throws {Response} throw when the response.status is not accepted (fallback throwing)
 * @throws {APISerializeError} throw when fail serialize data (include request and response)
 */
export async function streamsPost(
  requestParameters: StreamsPostRequestParameters,
  configuration: OperationConfiguration = {},
): Promise<object> {
  return pipe(
    streamsPostRequest(configuration),
    fetchRequest(configuration),
    streamsPostResponse(configuration),
  )(requestParameters);
}