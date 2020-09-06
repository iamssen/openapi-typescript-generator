# API 사용

```js
try {
  await getPet({ ...params }) // Pet
} catch (error) {
  if (error instanceof APIExceptionError) {
    // TODO
  } else if (error instanceof APISerializeError) {
    // TODO
  }
}

// or

try {
  await pipe(
    createGetPetRequest, // { url, init }
    // customRequestTransformer,
    fetchRequest, // Response
    serializeGetPetResponse, // Pet
  )({ ...params }) // Pet
} catch (error) {
  if (error instanceof APIExceptionError) {
    // TODO
  } else if (error instanceof APISerializeError) {
    // TODO
  }
}

// or

try {
  const request = createGetPetRequest({ ...params })
  const { url, init } = customRequestTransformer(request)
  const response = await fetch(url, init)
  const pet = await serializeGetPetResponse(response)
} catch (error) {
  if (error instanceof APIExceptionError) {
    // TODO
  } else if (error instanceof APISerializeError) {
    // TODO
  }
}
```

# Serialize

- Request Body Serialize -> [operation.bodyParam: CodegenParameter]
- Response Body Serialize -> [operation.responses[]: CodegenResponse, operation: CodegenOperation]
- Model Vars Serialize -> [vars[]: CodegenProperty]

# CodegenResponse

처리 과정 설계

1. response matching이 가능하면 oeration.responses[] 정보로 처리
  - case 200 과 같이 정확한 code가 존재하는 경우
  - 2XX 와 같은 것들은 Code Pattern 을 사용해서 matching 한다

```js
routeResponse(
  // response
  response,
  // responses processor
  {
    // operation.responses[] 
    // typeSerializer.toValueObject('{{baseType}}')(response)
    '200': { ... }, // [...Object.entries(status)].sort(([a], [z]) => a - z)  
    '2xx': { ... }, // new RegExp(status.replace(/(x)/ig, '[0-9]), 'ig').test(response.status)
    '403': { ... },
    '4xx': { ... }, 
    '5xx': { ... },
  },
  // 200 ~ 299 fallback processor
  // typeSerializer.toValueObject('{{returnBaseType}}')(response)
  { ... },
)
```
