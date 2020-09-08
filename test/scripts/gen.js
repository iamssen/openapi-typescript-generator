const path = require('path');
const os = require('os');
const fs = require('fs');
const rimraf = require('rimraf');
const { execSync } = require('child_process');

const pwd = path.resolve(__dirname, '..');
const bin = path.resolve(pwd, '../bin');

const names =
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

const generator = [
  path.resolve(bin, 'openapi-generator.jar'),
  os.platform() === 'win32' ? ';' : ':',
  path.resolve(bin, 'ssen-typescript-openapi-generator.jar'),
];

const gen = (name) =>
  [
    `java -cp ${generator.join('')}`,
    `org.openapitools.codegen.OpenAPIGenerator`,
    `generate`,
    `-g typescript-fetch`,
    `-t`,
    path.resolve(pwd, '../codegen/src/main/resources/ssen-typescript'),
    `-i`,
    path.resolve(pwd, `src/${name}/spec.yaml`),
    `-o`,
    path.resolve(pwd, `src/${name}/client`),
  ].join(' ');

for (const name of names) {
  rimraf.sync(path.resolve(pwd, `src/${name}/client`));
  const command = gen(name);
  execSync(command, { stdio: 'inherit' });
}
