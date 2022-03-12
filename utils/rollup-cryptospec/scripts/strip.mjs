import { readFileSync, writeFileSync } from 'fs';
import { config } from '@liquify/rollup-utils';
import chalk from 'chalk';

const { log } = console;

const arr = [ config.output.cjs, config.output.esm ];

log(chalk`{cyanBright running {bold Template Literal post build script}}`);

arr.forEach((file) => {

  const content = readFileSync(file).toString();
  const strip = content.replace(/\\n\s+/g, '');

  writeFileSync(file, strip);

  log(
    chalk`- Stripped newlines and extraneous spacing in: {magentaBright  ${file}}`
  );
});
