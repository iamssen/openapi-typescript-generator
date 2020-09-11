import { createMockupServer } from '@rocket-scripts/mockup';
import {
  APIExceptionError,
  fetchRequest,
  pipe,
  takeResponse,
} from '@rocket-scripts/openapi';
import { defaultApi, Doc, Exception, NewDoc, Success } from './client';

describe('json-api-crud', () => {
  const server = createMockupServer();

  const newDoc: NewDoc = {
    title: 'foo',
    content: 'bar',
  };

  const doc: Doc = {
    docId: 0,
    title: 'doc title',
    content: 'doc content',
  };

  const errors: Record<string, Exception> = {
    '400': { error: { detail: '400 bad request' } },
    '401': { error: { detail: '401 unauthorized' } },
    '404': { error: { detail: '404 not found' } },
  };

  const success: Success = {
    success: {
      detail: 'ok',
    },
  };

  beforeAll(async () => {
    await server.start((router) => {
      router.post('/docs/new', async (ctx) => {
        expect(ctx.request.body).toMatchObject(newDoc);

        if (process.env.API_ERROR && errors[process.env.API_ERROR]) {
          ctx.status = +process.env.API_ERROR;
          ctx.body = errors[process.env.API_ERROR];
        } else {
          ctx.status = 201;
          ctx.body = doc;
        }
      });

      router.get('/docs/:docId', async (ctx) => {
        expect(ctx.request).toMatchObject({
          params: {
            docId: '150',
          },
        });

        if (process.env.API_ERROR && errors[process.env.API_ERROR]) {
          ctx.status = +process.env.API_ERROR;
          ctx.body = errors[process.env.API_ERROR];
        } else {
          ctx.status = 200;
          ctx.body = doc;
        }
      });

      router.put('/docs/:docId', async (ctx) => {
        expect(ctx.request.body).toMatchObject(doc);

        if (process.env.API_ERROR && errors[process.env.API_ERROR]) {
          ctx.status = +process.env.API_ERROR;
          ctx.body = errors[process.env.API_ERROR];
        } else {
          ctx.status = 201;
          ctx.body = doc;
        }
      });

      router.delete('/docs/:docId', async (ctx) => {
        if (process.env.API_ERROR && errors[process.env.API_ERROR]) {
          ctx.status = +process.env.API_ERROR;
          ctx.body = errors[process.env.API_ERROR];
        } else {
          ctx.status = 200;
          ctx.body = success;
        }
      });
    });
  });

  afterAll(async () => {
    await server.close();
  });

  test('post 201', async () => {
    // Arrange
    process.env.API_ERROR = undefined;

    // Act
    const result = await defaultApi.docsNewPost(
      { newDoc },
      { basePath: server.getBasePath() },
    );

    // Assert
    expect(result).toMatchObject(doc);
  });

  test.each(['400', '401'])('post error %s', async (code) => {
    // Arrange
    process.env.API_ERROR = code;

    // Act
    let error: unknown;
    try {
      await defaultApi.docsNewPost(
        { newDoc },
        { basePath: server.getBasePath() },
      );
    } catch (e) {
      error = e;
    }

    // Assert
    expect(error).toBeInstanceOf(APIExceptionError);
    expect((error as APIExceptionError<Exception>).exception).toMatchObject(
      errors[code],
    );
  });

  test('get 200', async () => {
    // Arrange
    process.env.API_ERROR = undefined;

    // Act
    const result = await defaultApi.docsDocIdGet(
      { docId: 150 },
      { basePath: server.getBasePath() },
    );

    // Assert
    expect(result).toMatchObject(doc);
  });

  test.each(['400', '401', '404'])('get error %s', async (code) => {
    // Arrange
    process.env.API_ERROR = code;

    // Act
    let error: unknown;
    try {
      await defaultApi.docsDocIdGet(
        { docId: 150 },
        { basePath: server.getBasePath() },
      );
    } catch (e) {
      error = e;
    }

    // Assert
    expect(error).toBeInstanceOf(APIExceptionError);
    expect((error as APIExceptionError<Exception>).exception).toMatchObject(
      errors[code],
    );
  });

  test('put 201', async () => {
    // Arrange
    process.env.API_ERROR = undefined;

    // Act
    const result = await defaultApi.docsDocIdPut(
      { docId: 150, doc },
      { basePath: server.getBasePath() },
    );

    // Assert
    expect(result).toMatchObject(doc);
  });

  test.each(['400', '401', '404'])('get error %s', async (code) => {
    // Arrange
    process.env.API_ERROR = code;

    // Act
    let error: unknown;
    try {
      await defaultApi.docsDocIdPut(
        { docId: 150, doc },
        { basePath: server.getBasePath() },
      );
    } catch (e) {
      error = e;
    }

    // Assert
    expect(error).toBeInstanceOf(APIExceptionError);
    expect((error as APIExceptionError<Exception>).exception).toMatchObject(
      errors[code],
    );
  });

  test('delete 200', async () => {
    // Arrange
    process.env.API_ERROR = undefined;

    // Act
    const result = await defaultApi.docsDocIdDelete(
      { docId: 150 },
      { basePath: server.getBasePath() },
    );

    // Assert
    expect(result).toMatchObject(success);
  });

  test.each(['400', '401', '404'])('delete error %s', async (code) => {
    // Arrange
    process.env.API_ERROR = code;

    // Act
    let error: unknown;
    try {
      await defaultApi.docsDocIdDelete(
        { docId: 150 },
        { basePath: server.getBasePath() },
      );
    } catch (e) {
      error = e;
    }

    // Assert
    expect(error).toBeInstanceOf(APIExceptionError);
    expect((error as APIExceptionError<Exception>).exception).toMatchObject(
      errors[code],
    );
  });

  test('take response', async () => {
    // Arrange
    process.env.API_ERROR = undefined;

    // Act
    const { value, response } = await pipe(
      defaultApi.docsDocIdGetRequest({ basePath: server.getBasePath() }),
      fetchRequest(),
      takeResponse(defaultApi.docsDocIdGetResponse()),
    )({ docId: 150 });

    // Assert
    expect(value).toMatchObject(doc);
    expect(response.status).toBe(200);
  });
});
