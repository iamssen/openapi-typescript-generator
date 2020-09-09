import { generate } from '@rocket-scripts/openapi/generate';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

const pwd: string = path.resolve(__dirname, '..');

const names: string[] =
  process.argv.length > 2
    ? process.argv
        .slice(2)
        .filter((name) =>
          fs.existsSync(path.resolve(pwd, `src/${name}/spec.yaml`)),
        )
    : fs
        .readdirSync(path.resolve(pwd, 'src'))
        .filter((file) => !/^@/.test(file) && /.yaml$/.test(file))
        .map((file) => path.basename(file, '.yaml'));

(async () => {
  for (const name of names) {
    rimraf.sync(path.resolve(pwd, `src/${name}/client`));
    await generate(
      path.resolve(pwd, `src/${name}/spec.yaml`),
      path.resolve(pwd, `src/${name}/client`),
    );
  }
})();
