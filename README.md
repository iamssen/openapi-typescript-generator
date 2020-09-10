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

const config = {
  basePath: server.getBasePath(),
};

try {
  const result: SomeData = await defaultApi.someGet(config);
  console.log(result.hello);
} catch (error: unknown) {
  if (error instanceof APIExceptionError) {
    const exception: SomeException = error.exception;
    console.error(exception);
  }
}
```

## Reorganize Composition

```ts
import { APIExceptionError, pipe, fetchRequest } from '@rocket-scripts/openapi';
import { defaultApi, SomeData } from './client';

const config = {
  basePath: server.getBasePath(),
};

const SomeData = await pipe(
  defaultApi.someGetRequest(config),
  fetchRequest(),
  defaultApi.someGetReponse(),
)();

// or

const SomeData = await pipe(
  fetchRequest(),
  defaultApi.someGetReponse(),
)({ url: 'http://custom/url/path', init: {} });

// or

const response: Response = await pipe(
  defaultApi.someGetRequest(config),
  fetchRequest(),
)();
```
