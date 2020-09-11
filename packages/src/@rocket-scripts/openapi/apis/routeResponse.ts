export async function routeResponse<T>(
  response: Response,
  route: Record<string, unknown>, // use CodegenResponse
  fallback: unknown, // use CodegenResponse
): Promise<T> {
  throw 1;
}
