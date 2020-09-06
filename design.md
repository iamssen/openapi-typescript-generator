1. network 단계에서 response를 내보내준다 
2. response를 serialize 한다





request 단계

1. fetch() 의 request init 을 구성하게 되는 과정까지... -> request init
    - {name}Request
    - server 구성 정보 (사용자가 manual 하게 한다)
    - 사용자가 선택할 수 있는 request option들 (spec 확인 필요)
2. fetch() 를 직접 실행 -> response
3. response를 serialize 하는 과정
    - {name}Response




# Model

json -> value object
value object -> json




# Serialize

- Request Body Serialize -> [operation.bodyParam: CodegenParameter]
- Response Body Serialize -> [operation.responses[]: CodegenResponse, operation: CodegenOperation]
- Model Vars Serialize -> [vars[]: CodegenProperty]



# CodegenOperation

- returnType = true
    - returnTypeIsPrimitive = true
        - string, number... 등등을 알아낼 방법이 없다
    - returnTypeIsPrimitive = false


# CodegenResponse

처리 과정 설계

1. response matching이 가능하면 oeration.responses[] 정보로 처리
    - case 200 과 같이 정확한 code가 존재하는 경우
    - 2XX 와 같은 것들은 Code Pattern 을 사용해서 matching 한다
    - code 가 200 ~ 299 인 경우 [ 2XX, 200 ] 순서로 사용할 수 있다

```js
matchStatus(
  // response
  response,
  // responses processor
  {
    // operation.responses[] 
    '200': { isPrimitive, ... },
  },
  // 200 ~ 299 fallback processor
  {
    // operation
    returnType: true,
    ...
  }
)
```

2. response matching이 불가능하면 operation 정보로 처리 (fallback)


1. response.status 를 맵핑 (가능한 )

```js

```

2. fallback



- 처리 과정
    1. status code를 기반으로 해서 200~299 까지를 return으로 처리
    2. status code가 299 보다 크면 throw 처리
        - processException(response, {[code]: {  }})
            - primitiveType = true
            - primitiveType = false
 

- code를 ㅆㅂ '4XX'와 같이 선언할 수 있다...
    - switch 문으로 쓸 수 없다...;;;
    
```js
processThrow(response, {
  
})
```

ResponseCodeMapping
- is2XX
- is1XX, is3XX



# Serializer

- isPrimitive = true
    - isNumber
    - isString
        - isDate
        - isDateTime
    - isBoolean
- isPrimitive = false
