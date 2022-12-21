import { join, relative } from 'path';
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import ansis from 'ansis';

export default function (build: { output: string; cwd: string; }) {

  const opts = {
    output: join(build.cwd, build.output),
    package: join(build.cwd, 'node_modules/@liquify/moloko/package'),
    mithril: join(build.cwd, 'node_modules', 'mithril'),
    prettify: join(build.cwd, 'node_modules', '@liquify/prettify')
  };

  if (!existsSync(opts.mithril)) {

    console.error(ansis.red(`
      Missing peer dependency ${ansis.cyan('mithril.js')}

      ${ansis.gray('You need to install mithril: ') + ansis.white('pnpm add mithril')}
    `));
  }

  if (!existsSync(opts.prettify)) {

    console.error(ansis.red(`
      Missing peer dependency ${ansis.cyan('prettify')}

      ${ansis.gray('You need to install prettify: ') + ansis.white('pnpm add @liquify/prettify')}
    `));
  }

  if (!existsSync(opts.output)) mkdirSync(opts.output);

  cpSync(opts.package, opts.output);

  console.log(
    ansis.greenBright.bold(
      'Success! moloko exported to: ' + ansis.gray(relative(build.cwd, build.output))
    ) + '\n'
  );

}
