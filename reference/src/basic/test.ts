import { jsonMockupServer, ServerResult } from '@mockups/jsonMockupServer';
import { defaultApi } from './client';

describe('basic', () => {
  let server: ServerResult;

  beforeAll(async () => {
    server = await jsonMockupServer((router) => {
      router.get('/sample', async (ctx) => {
        ctx.body = {
          hello: 'world',
        };
      });
    });
  });

  afterAll(async () => {
    await server.close();
  });

  test('get /sample', async () => {
    // Act
    const result = await defaultApi.sampleGet({ basePath: server.basePath });

    // Assert
    expect(result).toMatchObject({ hello: 'world' });
  });
});
