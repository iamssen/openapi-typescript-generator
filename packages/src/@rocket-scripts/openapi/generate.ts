import { spawn } from 'child_process';
import { Presets, SingleBar } from 'cli-progress';
import fs, { WriteStream } from 'fs';
import { IncomingMessage } from 'http';
import { get } from 'https';
import os from 'os';
import path from 'path';
import prettier from 'prettier';

const openapiVersion: string = '5.0.0-beta2';

async function download(url: string, file: string) {
  return new Promise((resolve) => {
    const target: WriteStream = fs.createWriteStream(file);

    const bar = new SingleBar({}, Presets.shades_classic);

    get(url, (response: IncomingMessage) => {
      const contentLength: string | undefined =
        response.headers['content-length'];

      if (!contentLength) {
        throw new Error(`Undefined Content-Length`);
      }

      const total: number = +contentLength;

      if (isNaN(total)) {
        throw new Error(`Content-Length is not a number`);
      }

      let current: number = 0;

      response.pipe(target);

      response.on('data', (chunk) => {
        current += chunk.length;
        bar.update(current);
      });

      response.on('error', (error) => {
        bar.stop();
        console.error(error);
      });

      response.on('end', () => {
        bar.stop();
        setTimeout(resolve, 1000);
      });

      bar.start(total, current);
    });
  });
}

export async function generate(
  input: string,
  output: string,
  emit: boolean = true,
) {
  const jarDir: string = path.resolve(os.homedir(), '.openapi');
  const jarFile: string = `openapi-generator-cli-${openapiVersion}.jar`;
  const jar: string = path.resolve(jarDir, jarFile);

  if (!fs.existsSync(jar)) {
    if (!fs.existsSync(jarDir)) {
      fs.mkdirSync(jarDir);
    }

    console.log(`Download "${jarFile}" ‣‣‣ "${jarDir}"`);

    await download(
      `https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/${openapiVersion}/openapi-generator-cli-${openapiVersion}.jar`,
      jar,
    );
  }

  const command = [
    `java -cp ${jar}`,
    `org.openapitools.codegen.OpenAPIGenerator`,
    `generate`,
    `-g typescript-fetch`,
    `-t`,
    path.resolve(__dirname, 'template'),
    `-i ${input}`,
    `-o ${output}`,
  ].join(' ');

  if (emit) {
    const proc = spawn(
      process.env.TS_POST_PROCESS_FILE
        ? command + '--enable-post-process-file'
        : command,
      {
        stdio: 'inherit',
        shell: true,
      },
    );

    proc.once('exit', async (code: number | null) => {
      if (!code && !process.env.TS_POST_PROCESS_FILE) {
        const configFile: string | null = await prettier.resolveConfigFile(
          output,
        );

        if (configFile) {
          try {
            const binPrettier: string = require.resolve(
              'prettier/bin-prettier.js',
            );
            spawn(
              `${process.execPath} ${binPrettier} --config "${configFile}" --write "${output}/**/*.ts"`,
              {
                stdio: 'inherit',
                shell: true,
              },
            );
          } catch {}
        }
      }
    });
  } else {
    console.log(command);
  }
}
