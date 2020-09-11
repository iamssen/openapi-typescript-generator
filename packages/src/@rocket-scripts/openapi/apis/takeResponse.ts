export const takeResponse = <T>(
  responseHandler: (response: Response) => Promise<T>,
) => async (
  promise: Promise<Response>,
): Promise<{ value: T; response: Response }> => {
  const response = await promise;
  const value: T = await responseHandler(response);
  return { value, response };
};
