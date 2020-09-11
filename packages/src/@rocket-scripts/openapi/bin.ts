import fs from 'fs';
import path from 'path';
import * as process from 'process';
import yargs from 'yargs';
import { generate } from './generate';

const cwd: string = process.cwd();

export async function run() {
  const argv = yargs
    .usage('Usage: $0 -i my/spec.yaml -o src/api')
    .options({
      emit: {
        type: 'boolean',
        default: true,
        describe:
          'if you set this false it will only print options without run (e.g. --no-emit or --emit false)',
      },
      clean: {
        type: 'boolean',
        default: false,
        describe: 'Clean output directory before generate (e.g. --clean)',
      },
      input: {
        type: 'string',
        alias: 'i',
        requiresArg: true,
        describe: 'input spec file (e.g. --input dir/spec.yaml)',
      },
      output: {
        type: 'string',
        alias: 'o',
        requiresArg: true,
        describe:
          'output directory of typescript API generation files (e.g. --output src/api)',
      },
    })
    .demandOption(['input', 'output'])
    .wrap(null)
    .help('h')
    .alias('h', 'help')
    .showHelpOnFail(true)
    .strict()
    .epilog('🚀 Rocket OpenAPI!').argv;

  const input: string = path.resolve(cwd, argv.input);
  const output: string = path.resolve(cwd, argv.output);

  if (argv.clean && fs.existsSync(output)) {
    fs.unlinkSync(output);
  }

  await generate(input, output, argv.emit);
}
