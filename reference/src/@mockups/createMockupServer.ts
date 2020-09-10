import { Server } from 'http';
import Koa from 'koa';
import Body from 'koa-body';
import Router from 'koa-router';
import { getPortPromise } from 'portfinder';

export interface ServerResult {
  getBasePath: () => string;
  start: (route: (router: Router) => void) => Promise<void>;
  close: () => Promise<void>;
}

export function createMockupServer(): ServerResult {
  let server: Server;
  let port: number;

  async function start(route: (router: Router) => void) {
    port = await getPortPromise();

    const app = new Koa();
    const router = new Router();

    app.use(Body());

    route(router);

    app.use(router.middleware());

    await new Promise((resolve) => {
      server = app.listen(port, resolve);
    });
  }

  async function close(): Promise<void> {
    return new Promise((resolve) => server.close(() => resolve()));
  }

  function getBasePath(): string {
    return `http://localhost:${port}`;
  }

  return {
    start,
    close,
    getBasePath,
  };
}
