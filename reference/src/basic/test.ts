import { createMockupServer } from '@rocket-scripts/mockup';
import { APIExceptionError } from '@rocket-scripts/openapi';
import { defaultApi, SomeException } from './client';

describe('basic', () => {
  const server = createMockupServer();

  beforeAll(async () => {
    await server.start((router) => {
      router.get('/some', async (ctx) => {
        ctx.body = {
          hello: 'world',
        };
      });
    });
  });

  afterAll(async () => {
    await server.close();
  });

  test('get /some', async () => {
    try {
      const result = await defaultApi.someGet({
        basePath: server.getBasePath(),
      });
      expect(result).toMatchObject({ hello: 'world' });
    } catch (error: unknown) {
      if (error instanceof APIExceptionError) {
        const exception: SomeException = error.exception;
        console.error(exception);
      }
    }
  });
});
