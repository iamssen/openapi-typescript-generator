# OpenAPI TypeScript Fetch Generator

## Install and Generate Clients

Install

```sh
npm install @rocket-scripts/openapi
```

Generate TypeScript Clients

```json
{
  "scripts": "openapi-typescript-generator -i your-openapi-spec.yaml -o src/client"
}
```

## Use Generated Clients

See detail: <https://github.com/rocket-hangar/openapi-typescript-generator/tree/master/reference/src/basic>

```ts
import { APIExceptionError } from '@rocket-scripts/openapi'; 
import { defaultApi, SomeData, SomeException } from './client';

try {
  const result: SomeData = await defaultApi.someGet({
    basePath: server.getBasePath(),
  });
  console.log(result.hello);
} catch (error: unknown) {
  if (error instanceof APIExceptionError) {
    const exception: SomeException = error.exception;
    console.error(exception);
  }
}
```