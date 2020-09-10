import * as pipe from 'p-pipe';

export { pipe };
// export * from './runtime';
export * from './apis';
export * from './models';
export const servers = [
  { url: 'http://api.example.com/basePath', description: '' },
  { url: 'https://api.example.com/basePath', description: '' },
];
