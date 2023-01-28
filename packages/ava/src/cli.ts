#!/usr/bin/env node

import prompts from 'prompts';
import minimist from 'minimist';
import { join } from 'node:path';
import { readdirSync, existsSync, readFileSync } from 'node:fs';
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

  function getTests (uri: string) {

    const choices: prompts.Choice[] = [];
    const read = readFileSync(join(process.cwd(), uri)).toString();
    const titles = read.matchAll(/(?<=(?!test\.skip)^test(?:\.\w+)?\(['"]).*?(?=['"])/gm);

    for (const title of titles) {

      choices.push({
        title: title[0],
        value: `--match='${title}'`,
        description: uri.slice(6)
      });

    }

    return choices;

  }

  function getChoices () {

    const choices: prompts.Choice[] = [];
    const dirs: string[] = args.tests.split(',');

    for (const dir of dirs) {

      if (!existsSync(join(args.cwd, dir))) continue;

      console.log(dir);
      for (const file of readdirSync(join(args.cwd, dir)).filter(x => !x.startsWith('.'))) {
        if (/\.test\.(mjs|js|ts|cjs)$/.test(file)) {
          choices.push({
            title: `${file}`,
            description: `${dir}`,
            value: `tests/${dir}/${file}`
          });
        } else {
          if (!existsSync(join(args.cwd, dir, file))) continue;
          for (const nest of readdirSync(join(args.cwd, dir, file)).filter(x => !x.startsWith('.'))) {
            if (/\.test\.(mjs|js|ts|cjs)$/.test(nest)) {
              choices.push({
                title: `${nest}`,
                description: `${dir}/${file}`,
                value: `tests/${dir}/${file}/${nest}`
              });
            }
          }
        }
      }
    }

    return choices;

  }

  const command = await prompts([
    {
      type: 'autocomplete',
      name: 'test',
      message: 'Select Test',
      limit: 50,
      choices: getChoices()
    },
    {
      type: 'select',
      name: 'command',
      message: 'Command',
      choices: [
        {
          title: 'Watch',
          value: '--watch --colors',
          description: 'Invoke with watch mode'
        },
        {
          title: 'Run',
          value: '--colors',
          description: 'Run all tests'
        },
        {
          title: 'Specific',
          value: 'find',
          description: 'Run a specific test'
        }
      ]
    }
  ]);

  if (command.command === 'find') {

    const match = await prompts([
      {
        type: 'autocomplete',
        name: 'test',
        message: 'Choose Test',
        limit: 50,
        choices: getTests(command.test)
      },
      {
        type: 'select',
        name: 'command',
        message: 'Command',
        choices: [
          {
            title: 'Watch',
            value: '--watch --colors',
            description: 'Invoke with watch mode'
          },
          {
            title: 'Run',
            value: '--colors',
            description: 'Run all tests'
          }
        ]
      }
    ]);

    if (match.command === undefined) {
      console.log('\nExited, no tests will run\n');
      return;
    }

    spawn('ava', [
      command.test,
      ...match.test.split(' '),
      ...match.command.split(' ')
    ], {
      stdio: 'inherit'
    }).on('exit', function (error) {

      if (!error) console.log('Exited Spawned AVA Process');

    });

  } else {

    if (command.command === undefined) {
      console.log('\nExited, no tests will run\n');
      return;
    }

    spawn('ava', [
      command.test,
      ...command.command.split(' ')
    ], {
      stdio: 'inherit'
    }).on('exit', function (error) {

      if (!error) console.log('Exited Spawned AVA Process');

    });
  }

})();
