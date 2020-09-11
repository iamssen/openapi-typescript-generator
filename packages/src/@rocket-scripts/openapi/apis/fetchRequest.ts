export interface FetchParameters {
  input: RequestInfo;
  init?: RequestInit;
}

export interface FetchConfiguration {
  signal?: AbortSignal;
  fetchClient?: WindowOrWorkerGlobalScope['fetch'];
  transformFetchParameters?: (param: FetchParameters) => FetchParameters;
}

export const fetchRequest = ({
  fetchClient = fetch,
  transformFetchParameters,
  signal,
}: FetchConfiguration = {}) => (params: FetchParameters): Promise<Response> => {
  if (signal && !params.init?.signal) {
    params.init = { ...params.init, signal };
  }

  const { input, init } =
    typeof transformFetchParameters === 'function'
      ? transformFetchParameters(params)
      : params;
  return fetchClient(input, init);
};
