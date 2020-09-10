import { createMockupServer } from '@mockups/createMockupServer';
import { defaultApi } from './client';

describe('basic', () => {
  const server = createMockupServer();

  beforeAll(async () => {
    await server.start((router) => {
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
    const result = await defaultApi.sampleGet({
      basePath: server.getBasePath(),
    });

    // Assert
    expect(result).toMatchObject({ hello: 'world' });
  });
});
