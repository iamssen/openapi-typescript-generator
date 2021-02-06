import { start } from '@rocket-scripts/web';
import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  const remoteDebuggingPort: number = +(process.env.INSPECT_CHROME ?? 9222);

  const { port } = await start({
    app: 'web-example-react-query',
    webpackConfig: {
      //@ts-ignore
      resolve: {
        alias: {
          '@rocket-scripts/openapi': path.resolve(
            __dirname,
            '../../packages/out/packages/rocket-scripts__openapi',
          ),
          '@rocket-scripts/mockup': path.resolve(
            __dirname,
            '../../packages/out/packages/rocket-scripts__mockup',
          ),
        },
      },
    },
  });

  const browser = await puppeteer.launch({
    //userDataDir: process.env.CHROMIUM_USER_DATA_DEBUG,
    headless: false,
    //defaultViewport: null,
    args: [
      '--start-fullscreen',
      `--remote-debugging-port=${remoteDebuggingPort}`,
    ],
    devtools: true,
  });

  const [page] = await browser.pages();
  await page.goto(`http://localhost:${port}`);

  //await page.waitForFunction(
  //  `document.querySelector('#app h1').innerHTML === 'Hello World!'`,
  //  {
  //    timeout: 1000 * 60,
  //    polling: 1000 * 3,
  //  },
  //);

  // if you want to start with another situation
  // you can make another script file like this script file
  // and, add the made script to the scripts section of package.json
})();
