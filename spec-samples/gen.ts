import { generate } from '@rocket-scripts/openapi/generate';
import { glob, rimraf } from '@ssen/promised';
import fs from 'fs-extra';
import * as path from 'path';

const template = path.resolve(
  __dirname,
  '../source/src/@rocket-scripts/openapi/template',
);

(async () => {
  const result = await glob('./resources/{,**/}*.{json,yaml,yml}');

  const specFiles = result
    .filter((filepath) => {
      if (/.json$/.test(filepath)) {
        const content = fs.readJsonSync(filepath);
        return !!content['swagger'] || !!content['openapi'];
      }
      return true;
    })
    .map((filepath) => path.resolve(filepath));

  async function task(filepath) {
    const input = filepath;

    try {
      const output = filepath + '_gen';
      await rimraf(output);
      await generate(path.resolve(input), path.resolve(output));
    } catch (error) {
      console.log('[fail:gen]', filepath);
      fs.writeFileSync(filepath + '_gen_error', error.toString(), 'utf8');
    }
  }

  await Promise.all(specFiles.map((filepath) => task(filepath)));
})();
