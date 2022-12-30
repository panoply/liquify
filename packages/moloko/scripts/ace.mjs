import { join } from 'node:path';
import { writeFileSync } from 'node:fs';
import sass from 'sass';
import spawn from 'cross-spawn';
import parse from 'parse-spawn-args';
import ansis from 'ansis';

const cwd = process.cwd();
const { log } = console;

const VER = 'v1.14.0';
const ACE = './node_modules/.ace';
const SRC = './src/build';
const OUT = '../..';

async function executeCommand (cmd, args, opts) {

  log(ansis.cyan('Executing: ') + cmd + ' ' + args.join(' '));

  await spawn.spawn(cmd, args, {
    cwd: opts.cwd,
    env: opts.env || process.env,
    stdio: 'inherit'
  });

}

async function exec (cmds, opts) {

  if (!cmds || !cmds.length) {
    log(chalk.cyan('Finished executing the commands'));
    return;
  }

  const run = cmds.shift();

  if (!run.length) return;

  const parts = parse.parse(run.cmd);

  log(ansis.magentaBright(run.title));
  log(ansis.gray(run.description));

  const spawned = await executeCommand(parts[0], parts.splice(1), opts);

  if (spawned.error) {
    log(chalk.red('Error happened executing: ') + cmd);
    log(chalk.red('Stopping execution.'));
    return spawned;
  }

  log(chalk.cyan('Finished: ') + cmd);

  return exec(cmds, opts) || spawned;

}

function CreatePotionThemeCSS () {

  const file = join(cwd, 'src/theme/potion.scss');
  const { css } = sass.compile(file, { style: 'expanded' });
  const make = 'module.exports = `' + css + '`;';

  writeFileSync(join(cwd, 'src/build/theme/potion.css.js'), make);
}

CreatePotionThemeCSS();

exec([
  {
    title: 'Cleaning Ace Build Directory',
    description: `Deleting the existing ${ansis.blueBright('node_modules/.ace')} directory`,
    cmd: `rm -rf ${ACE}`
  },
  {
    title: `Cloning Ace ${ansis.bold(VER)} from Github`,
    description: `Ace editor ${ansis.bold(VER)} cloning into ${ansis.blueBright('node_modules/.ace')} directory`,
    cmd: `git -c advice.detachedHead=false clone --depth 1 --branch ${VER} https://github.com/ajaxorg/ace.git ${ACE}/`
  },
  {
    title: 'Installing Ace with NPM',
    description: `We've ${ansis.blueBright('cd node_modules/.ace')} into ace and are now installing dependencies`,
    cmd: `cd ${ACE} && npm install --silent && cd ${OUT}`
  },
  {
    title: 'Replacing Liquid Mode',
    description: 'We replace the Ace Liquid mode for the moloko version',
    cmd: `cp ${SRC}/mode/liquid.js ${ACE}/src/mode/liquid.js`
  },
  {
    title: 'Replacing Liquid Syntax',
    description: 'We replace the Ace standard Liquid highlight rules for the moloko version',
    cmd: `cp ${SRC}/mode/liquid-highlight.js ${ACE}/src/mode/liquid_highlight_rules.js`
  },
  {
    title: 'Create Liquid CSS Mode',
    description: `Adding support for ${ansis.blueBright('*.css.liquid')} files in Ace`,
    cmd: `cp ${SRC}/mode/liquidcss.js ${ACE}/src/mode/liquidcss.js`
  },
  {
    title: 'Create Liquid CSS Syntax',
    description: `Adding syntax highlighting support for ${ansis.blueBright('*.css.liquid')} files in Ace`,
    cmd: `cp ${SRC}/mode/liquidcss-highlight.js ${ACE}/src/mode/liquidcss_highlight_rules.js`
  },
  {
    title: 'Create Liquid SCSS Mode',
    description: `Adding support for ${ansis.blueBright('*.scss.liquid')} files in Ace`,
    cmd: `cp ${SRC}/mode/liquidscss.js ${ACE}/src/mode/liquidcss.js`
  },
  {
    title: 'Create Liquid SCSS Syntax',
    description: `Adding syntax highlighting support for ${ansis.blueBright('*.scss.liquid')} files in Ace`,
    cmd: `cp ${SRC}/mode/liquidscss-highlight.js ${ACE}/src/mode/liquidscss_highlight_rules.js`
  },
  {
    title: 'Create Liquid JavaScript Mode',
    description: `Adding support for ${ansis.blueBright('*.js.liquid')} files in Ace`,
    cmd: `cp ${SRC}/mode/liquidjs.js ${ACE}/src/mode/liquidjs.js`
  },
  {
    title: 'Create Liquid JavaScript Syntax',
    description: `Adding syntax highlighting support for ${ansis.blueBright('*.js.liquid')} files in Ace`,
    cmd: `cp ${SRC}/mode/liquidjs-highlight.js ${ACE}/src/mode/liquidjs_highlight_rules.js`
  },
  {
    title: 'Create Liquid TypeScript Mode',
    description: `Adding support for ${ansis.blueBright('*.ts.liquid')} files in Ace`,
    cmd: `cp ${SRC}/mode/liquidts.js ${ACE}/src/mode/liquidts.js`
  },
  {
    title: 'Create Liquid TypeScript Syntax',
    description: `Adding syntax highlighting support for ${ansis.blueBright('*.ts.liquid')} files in Ace`,
    cmd: `cp ${SRC}/mode/liquidts-highlight.js ${ACE}/src/mode/liquidts_highlight_rules.js`
  },
  {
    title: 'Create Potion Theme Export',
    description: 'Adding custom theme support for Potion syntax colours',
    cmd: `cp ${SRC}/theme/potion.js ${ACE}/src/theme/potion.js`
  },
  {
    title: 'Create Potion Theme CSS',
    description: 'Adding the CSS customized stylesheet for Potion colours',
    cmd: `cp ${SRC}/theme/potion.css.js ${ACE}/src/theme/potion.css.js`
  },
  {
    title: 'Remove Type Declaration',
    description: 'Removing the TypeScript Declaration file to avoid conflicts with local version',
    cmd: `rm -rf ${ACE}/ace.d.ts`
  },
  {
    title: 'Generate Ace Standard Build',
    description: `We are now running the Ace build from within ${ansis.blueBright('node_modules/.ace')} directory`,
    cmd: `cd ${ACE} && node Makefile.dryice.js  && cd ${OUT}`
  },
  {
    title: 'Generate Ace Minified Build',
    description: 'We are now running the minified Ace build which gives us worker support',
    cmd: `cd ${ACE} && node Makefile.dryice.js --m  && cd ${OUT}`
  },
  {
    title: 'Copying Ace Base Worker',
    description: `Copying the ${ansis.blueBright('worker-base.js')} file to ${ansis.blueBright('./package')} `,
    cmd: `cp ${ACE}/build/src-min/worker-base.js ./package/worker-base.js`
  },
  {
    title: 'Copying Ace CSS Worker',
    description: `Copying the ${ansis.blueBright('worker-css.js')} file to ${ansis.blueBright('./package')} `,
    cmd: `cp ${ACE}/build/src-min/worker-css.js ./package/worker-css.js`
  },
  {
    title: 'Copying Ace HTML Worker',
    description: `Copying the ${ansis.blueBright('worker-html.js')} file to ${ansis.blueBright('./package')} `,
    cmd: `cp ${ACE}/build/src-min/worker-html.js ./package/worker-html.js`
  },
  {
    title: 'Copying Ace JavaScript Worker',
    description: `Copying the ${ansis.blueBright('worker-javascript.js')} file to ${ansis.blueBright('./package')} `,
    cmd: `cp ${ACE}/build/src-min/worker-javascript.js ./package/worker-javascript.js`
  },
  {
    title: 'Copying Ace JSON Worker',
    description: `Copying the ${ansis.blueBright('worker-json.js')} file to ${ansis.blueBright('./package')} `,
    cmd: `cp ${ACE}/build/src-min/worker-json.js ./package/worker-json.js`
  },
  {
    title: 'Copying Ace XML Worker',
    description: `Copying the ${ansis.blueBright('worker-xml.js')} file to ${ansis.blueBright('./package')} `,
    cmd: `cp ${ACE}/build/src-min/worker-xml.js ./package/worker-xml.js`
  }
]);
