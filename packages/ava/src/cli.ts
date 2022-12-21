#!/usr/bin/env node

import prompts from 'prompts';
import minimist from 'minimist';
import { join } from 'node:path';
import { readdirSync } from 'node:fs';
import { spawn } from 'node:child_process';

(async () => {

  console.log('\x1B[H\x1B[2J');

  const args = minimist(process.argv.slice(1), {
    alias: {
      tests: 't'
    },
    default: {
      cwd: join(process.cwd(), 'tests')
    },
    string: [
      't'
    ]
  });

  const dirs: string[] = args.tests.split(',');

  const command = await prompts([
    {
      type: 'autocomplete',
      name: 'test',
      message: 'Select Test',
      limit: 20,
      choices: dirs.flatMap(dir => {

        const files = readdirSync(join(args.cwd, dir));

        return files.map(file => {
          return <prompts.Choice>{
            title: `${file}`,
            description: `${dir}`,
            value: `tests/${dir}/${file}`
          };
        });

      })
    },
    {
      type: 'select',
      name: 'command',
      message: 'Command',
      choices: [
        { title: 'Watch', value: '--watch --colors' },
        { title: 'Test', value: '--colors' }
      ]
    }
  ]);

  spawn('ava', [ command.test, ...command.command.split(' ') ], {
    stdio: 'inherit'
  }).on('exit', function (error) {

    if (!error) console.log('Exited Spawned AVA Process');

  });

})();
