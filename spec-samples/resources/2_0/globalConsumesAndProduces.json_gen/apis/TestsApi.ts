/**
 * OpenAPI Petstore
 * Spec for testing global consumes and produces
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

/**
 * Operation with global consumes and produces
 * @throws {APIRequestError} throw when the request is not correct
 * @throws {APISerializeError} throw when fail serialize data (include request and response)
 */
export const globalConsumesAndProducesRequest = ({
  basePath = '',
  querystringStringify = querystring,
  username,
  password,
  apiKey,
  accessToken,
  headers,
  credentials,
}: RequestConfiguration = {}) => (): FetchParameters => {
  const queryParameters: UrlQueryInput = {};

  const headerParameters: Headers = new Headers(headers);

  let url: string = `${basePath.replace(
    /\/+$/,
    '',
  )}/tests/globalConsumesAndProduces`;
  if (queryParameters && Object.keys(queryParameters).length > 0) {
    url += '?' + querystringStringify(queryParameters);
  }

  const body = undefined;

  return {
    input: url,
    init: {
      method: 'GET',
      headers: headerParameters,
      credentials,
      body,
    },
  };
};

/**
 * Operation with global consumes and produces
 * @throws {APIExceptionError} throw when response is out of 2xx
 * @throws {Response} throw when the response.status is not accepted (fallback throwing)
 * @throws {APISerializeError} throw when fail serialize data (include request and response)
 */
export const globalConsumesAndProducesResponse = (
  configuration: ResponseConfiguration = {},
) => async (response: Response): Promise<number> => {
  if (response.status >= 200 && response.status < 300) {
    return response.text().then(typeSerializer.toValueObject('number'));
  } else {
    switch (response.status.toString()) {
      default:
        throw response;
    }
  }
};

/**
 * Operation with global consumes and produces
 * @throws {APIRequestError} throw when the request is not correct
 * @throws {APIExceptionError} throw when response is out of 2xx
 * @throws {Response} throw when the response.status is not accepted (fallback throwing)
 * @throws {APISerializeError} throw when fail serialize data (include request and response)
 */
export async function globalConsumesAndProduces(
  configuration: OperationConfiguration = {},
): Promise<number> {
  return pipe(
    globalConsumesAndProducesRequest(configuration),
    fetchRequest(configuration),
    globalConsumesAndProducesResponse(configuration),
  )();
}

/**
 * Operation with local consumes and produces
 * @throws {APIRequestError} throw when the request is not correct
 * @throws {APISerializeError} throw when fail serialize data (include request and response)
 */
export const localConsumesAndProducesRequest = ({
  basePath = '',
  querystringStringify = querystring,
  username,
  password,
  apiKey,
  accessToken,
  headers,
  credentials,
}: RequestConfiguration = {}) => (): FetchParameters => {
  const queryParameters: UrlQueryInput = {};

  const headerParameters: Headers = new Headers(headers);

  let url: string = `${basePath.replace(
    /\/+$/,
    '',
  )}/tests/localConsumesAndProduces`;
  if (queryParameters && Object.keys(queryParameters).length > 0) {
    url += '?' + querystringStringify(queryParameters);
  }

  const body = undefined;

  return {
    input: url,
    init: {
      method: 'GET',
      headers: headerParameters,
      credentials,
      body,
    },
  };
};

/**
 * Operation with local consumes and produces
 * @throws {APIExceptionError} throw when response is out of 2xx
 * @throws {Response} throw when the response.status is not accepted (fallback throwing)
 * @throws {APISerializeError} throw when fail serialize data (include request and response)
 */
export const localConsumesAndProducesResponse = (
  configuration: ResponseConfiguration = {},
) => async (response: Response): Promise<number> => {
  if (response.status >= 200 && response.status < 300) {
    return response.text().then(typeSerializer.toValueObject('number'));
  } else {
    switch (response.status.toString()) {
      default:
        throw response;
    }
  }
};

/**
 * Operation with local consumes and produces
 * @throws {APIRequestError} throw when the request is not correct
 * @throws {APIExceptionError} throw when response is out of 2xx
 * @throws {Response} throw when the response.status is not accepted (fallback throwing)
 * @throws {APISerializeError} throw when fail serialize data (include request and response)
 */
export async function localConsumesAndProduces(
  configuration: OperationConfiguration = {},
): Promise<number> {
  return pipe(
    localConsumesAndProducesRequest(configuration),
    fetchRequest(configuration),
    localConsumesAndProducesResponse(configuration),
  )();
}

/**
 * Operation with local consumes and produces set to empty (reset)
 * @throws {APIRequestError} throw when the request is not correct
 * @throws {APISerializeError} throw when fail serialize data (include request and response)
 */
export const localResetConsumesAndProducesRequest = ({
  basePath = '',
  querystringStringify = querystring,
  username,
  password,
  apiKey,
  accessToken,
  headers,
  credentials,
}: RequestConfiguration = {}) => (): FetchParameters => {
  const queryParameters: UrlQueryInput = {};

  const headerParameters: Headers = new Headers(headers);

  let url: string = `${basePath.replace(
    /\/+$/,
    '',
  )}/tests/localResetConsumesAndProduces`;
  if (queryParameters && Object.keys(queryParameters).length > 0) {
    url += '?' + querystringStringify(queryParameters);
  }

  const body = undefined;

  return {
    input: url,
    init: {
      method: 'GET',
      headers: headerParameters,
      credentials,
      body,
    },
  };
};

/**
 * Operation with local consumes and produces set to empty (reset)
 * @throws {APIExceptionError} throw when response is out of 2xx
 * @throws {Response} throw when the response.status is not accepted (fallback throwing)
 * @throws {APISerializeError} throw when fail serialize data (include request and response)
 */
export const localResetConsumesAndProducesResponse = (
  configuration: ResponseConfiguration = {},
) => async (response: Response): Promise<number> => {
  if (response.status >= 200 && response.status < 300) {
    return response.text().then(typeSerializer.toValueObject('number'));
  } else {
    switch (response.status.toString()) {
      default:
        throw response;
    }
  }
};

/**
 * Operation with local consumes and produces set to empty (reset)
 * @throws {APIRequestError} throw when the request is not correct
 * @throws {APIExceptionError} throw when response is out of 2xx
 * @throws {Response} throw when the response.status is not accepted (fallback throwing)
 * @throws {APISerializeError} throw when fail serialize data (include request and response)
 */
export async function localResetConsumesAndProduces(
  configuration: OperationConfiguration = {},
): Promise<number> {
  return pipe(
    localResetConsumesAndProducesRequest(configuration),
    fetchRequest(configuration),
    localResetConsumesAndProducesResponse(configuration),
  )();
}