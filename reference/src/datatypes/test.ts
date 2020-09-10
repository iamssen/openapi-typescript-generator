import { createMockupServer } from '@mockups/createMockupServer';
import { timeout } from '@ssen/promised';
import { DataTypes, defaultApi } from './client';

describe('datatypes', () => {
  const server = createMockupServer();

  const data: DataTypes = {
    int32: 1,
    int64: 1,
    bool: true,
    str: 'hello',
    date: new Date(2020, 6, 21),
    datetime: new Date(2020, 6, 21, 1, 10, 10),
    numberDouble: 1,
    numberFloat: 1,
    strByte: btoa('base64 string'),
    password: 'password',
  };

  beforeAll(async () => {
    await server.start((router) => {
      router.post('/', async (ctx) => {
        // Assert
        expect(ctx.request.body.int32).toBe(data.int32);
        expect(ctx.request.body.int64).toBe(data.int64);
        expect(ctx.request.body.numberFloat).toBe(data.numberFloat);
        expect(ctx.request.body.numberDouble).toBe(data.numberDouble);
        expect(ctx.request.body.bool).toBeTruthy();
        expect(ctx.request.body.str).toBe('hello');
        expect(ctx.request.body.date).toBe(
          data.date.toISOString().slice(0, 10),
        );
        expect(ctx.request.body.datetime).toBe(data.datetime.toISOString());
        expect(atob(ctx.request.body.strByte)).toBe('base64 string');
        expect(ctx.request.body.password).toBe('password');

        await timeout(100);
        ctx.body = data;
      });
    });
  });

  afterAll(async () => {
    await server.close();
  });

  test('post /', async () => {
    // Act
    const result = await defaultApi.rootPost(
      { dataTypes: data },
      {
        basePath: server.getBasePath(),
      },
    );

    // Assert
    expect(typeof result.int32).toBe('number');
    expect(typeof result.int64).toBe('number');
    expect(typeof result.numberFloat).toBe('number');
    expect(typeof result.numberDouble).toBe('number');
    expect(typeof result.bool).toBe('boolean');
    expect(typeof result.str).toBe('string');
    expect(result.date).toBeInstanceOf(Date);
    expect(result.datetime).toBeInstanceOf(Date);
    expect(typeof result.strByte).toBe('string');
    expect(typeof result.password).toBe('string');

    expect(result.int32).toBe(data.int32);
    expect(result.int64).toBe(data.int64);
    expect(result.numberFloat).toBe(data.numberFloat);
    expect(result.numberDouble).toBe(data.numberDouble);
    expect(result.bool).toBeTruthy();
    expect(result.str).toBe('hello');
    expect(new Date(result.date).getTime()).toBe(data.date.getTime());
    expect(new Date(result.datetime).getTime()).toBe(data.datetime.getTime());
    expect(atob(result.strByte)).toBe('base64 string');
    expect(result.password).toBe('password');
  });
});
