import { createMockupServer } from '@rocket-scripts/mockup';
import { APIExceptionError } from '@rocket-scripts/openapi';
import { defaultApi, R401 } from './client';

//@ts-ignore
global.FormData = FormData;

describe('response', () => {
  const server = createMockupServer();

  beforeAll(async () => {
    await server.start((router) => {
      router.get('/r200', async (ctx) => {
        ctx.body = 'ok';
      });

      router.get('/r400', async (ctx) => {
        ctx.status = 400;
        ctx.body = 'fail';
      });

      router.get('/r201', async (ctx) => {
        ctx.body = {
          a: 'hello',
          b: 100,
          c: {
            x: 'sub',
          },
        };
      });

      router.get('/r401', async (ctx) => {
        ctx.status = 401;
        ctx.body = {
          c: 'hello',
          d: 100,
          e: {
            x: 'sub',
          },
        };
      });
    });
  });

  afterAll(async () => {
    await server.close();
  });

  test('get /r200', async () => {
    // Act
    const result = await defaultApi.r200Get({
      basePath: server.getBasePath(),
    });

    // Assert
    expect(typeof result).toBe('string');
    expect(result).toBe('ok');
  });

  test('get /r201', async () => {
    // Act
    const result = await defaultApi.r201Get({
      basePath: server.getBasePath(),
    });

    // Assert
    expect(result.a).toBe('hello');
    expect(result.b).toBe(100);
    expect(result.c?.x).toBe('sub');
  });

  test('get /r400', async () => {
    // Act
    try {
      await defaultApi.r400Get({
        basePath: server.getBasePath(),
      });
    } catch (error: unknown) {
      if (error instanceof APIExceptionError) {
        expect(error.response.status).toBe(400);
        expect(typeof error.exception).toBe('string');
        expect(error.exception).toBe('fail');
      }
    }
  });

  test('get /r401', async () => {
    // Act
    try {
      await defaultApi.r401Get({
        basePath: server.getBasePath(),
      });
    } catch (error: unknown) {
      if (error instanceof APIExceptionError) {
        const exception: R401 = error.exception;
        expect(error.response.status).toBe(401);
        expect(exception.c).toBe('hello');
        expect(exception.d).toBe(100);
        expect(exception.e?.x).toBe('sub');
      }
    }
  });
});
