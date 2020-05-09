
import peek from './commands/peek'
import specs from './packages/specs'
import grammar from './packages/grammar'
import prompt from './commands/default'
import { errorHandler } from './utils/common'
import { call, flags } from './utils/commands'

export { default as rollup } from './commands/rollup'

export default async argv => ({
  engine: 'pnpm',
  command: 'liquify',
  packages: {
    grammar: '@liquify/liquid-language-grammars',
    schema: '@liquify/schema-stores',
    server: '@liquify/liquid-language-server',
    specs: '@liquify/specs',
    vscode: '@liquify/clients',
    sublime: '@liquify/sublime'
  },
  interface: {
    commands: [
      {
        command: 'git',
        description: 'Common git related operations for the project'
      },
      {
        command: 'package',
        description: 'Common git related operations for the project'
      },
      {
        command: 'peek',
        description: 'Common git related operations for the project'
      },
      {
        command: 'publish',
        description: 'Common git related operations for the project'
      }
    ],
    flags: [
      {
        name: 'config',
        short: 'c',
        description: 'Use configuration file (defaults to `.liquifyrc.json`'
      },
      {
        name: 'watch',
        short: 'w',
        description: 'Watch and bundle file/s'
      },
      {
        name: 'main',
        short: 'm',
        description: 'Define a main (entry) configuration file'
      },
      {
        name: 'input',
        short: 'i',
        description: 'Input path to directory of file/s'
      },
      {
        name: 'output',
        short: 'o',
        description: 'Output path destination of bundled file/s'
      },
      {
        name: 'prod',
        short: 'p',
        description: 'Production bundle build'
      },
      {
        name: 'dev',
        short: 'd',
        description: 'Develop bundle build (default)'
      },
      {
        name: 'help',
        short: 'h',
        description: 'Shows the CLI help and commands list'
      },
           {
        name: 'postinstall',
        description: 'Post install'
      },
      {
        name: 'preinstall',
        description: 'Pre install'
      }
    ]
  },
  execute() {
    const cwd = process.cwd()
    const cmd = call(argv)

    console.log(argv)

    if (!cmd) return errorHandler('Command\n')(JSON.stringify(cmd))

    const options = flags(cwd, cmd)

    Object.entries(argv).forEach(await options)

    switch (cmd.command) {
      case 'specs':
        await specs(cmd); break
      case 'peek':
        await peek(cmd); break
      // case 'schema':
      // await schema(config); break
      // case 'server':
      //  await server(config); break
      // case 'client':
      // await client(config); break
      case 'grammar':
        await grammar(cmd); break
      default:
        await prompt()
      // log(chalk`{red Command does not exist}`)
    }
  }
})
