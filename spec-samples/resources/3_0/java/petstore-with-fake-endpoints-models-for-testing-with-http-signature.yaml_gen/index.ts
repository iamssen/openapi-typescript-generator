import * as pipe from 'p-pipe';

export { pipe };
// export * from './runtime';
export * from './apis';
export * from './models';
export const servers = [
  {
    url: 'http://{server}.swagger.io:{port}/v2',
    description: 'petstore server',
  },
  { url: 'https://localhost:8080/{version}', description: 'The local server' },
];
