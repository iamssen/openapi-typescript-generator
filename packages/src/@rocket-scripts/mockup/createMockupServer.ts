import { Server } from 'http';
import Koa from 'koa';
import body from 'koa-body';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import { getPortPromise } from 'portfinder';

export interface ServerResult {
  getBasePath: () => string;
  start: (route: (router: Router, app: Koa) => void) => Promise<void>;
  close: () => Promise<void>;
}

export function createMockupServer(): ServerResult {
  let server: Server;
  let port: number;

  async function start(route: (router: Router, app: Koa) => void) {
    port = await getPortPromise({
      startPort: 8000 + Math.floor(Math.random() * 1000),
      stopPort: 50000,
    });

    const app = new Koa();
    const router = new Router();

    app.use(body({ multipart: true }));
    app.use(bodyParser());
    //app.use(multer({dest: }));

    route(router, app);

    app.use(router.routes());
    app.use(router.allowedMethods());

    await new Promise<void>((resolve) => {
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
