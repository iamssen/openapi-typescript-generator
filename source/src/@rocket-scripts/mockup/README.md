# `@rocket-scripts/mockup`

```ts
import { createMockupServer } from '@rocket-scripts/mockup'

describe('example', () => {
  const server = createMockupServer()
  
  beforeAll(async () => {
    await server.start((router) => {
      router.get('/api', async (ctx) => {
        ctx.body = 'ok';
      })
    })
  })

  afterAll(async () => {
    await server.stop()
  })
  
  test('should get ok', async () => {
    const body: string = await fetch(`${server.getBasePath()}/api`).then(res => res.text())
  
    expect(body).toBe('ok')
  })
})
```