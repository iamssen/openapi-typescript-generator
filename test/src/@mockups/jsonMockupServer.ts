import { Server } from 'http';
import Koa from 'koa';
import Body from 'koa-body';
import Router from 'koa-router';
import { getPortPromise } from 'portfinder';

export interface ServerResult {
  basePath: string;
  close: () => Promise<void>;
}

export async function jsonMockupServer(
  route: (router: Router) => void,
): Promise<ServerResult> {
  const port = await getPortPromise();
  const app = new Koa();
  const router = new Router();

  app.use(Body());

  route(router);

  app.use(router.middleware());

  const server: Server = await new Promise((resolve) => {
    const server = app.listen(port, () => {
      resolve(server);
    });
  });

  return {
    basePath: `http://localhost:${port}`,
    close: () => new Promise((resolve) => server.close(() => resolve())),
  };
}
