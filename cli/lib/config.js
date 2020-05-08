
export default {
  command: 'liquify',
  description: 'The Liquify CLI is used for development on Liquify IDE tool and provides a command line interface to bundle, package and maintain the project. The tool is included with the open sourced packages and will assist collaborators and/or contributors when working on the code base. Commands are shipped preset as npm/pnpm/yarn script runners in their relative package.json file.',
  calls: [
    {
      command: 'grammar',
      filters: [
        {
          command: 'create'
        }
      ]
    },
    {
      command: 'peek'
    },
    {
      command: 'package'
    },
    {
      command: 'publish'
    },
    {
      command: 'schema'
    },
    {
      command: 'server'
    },
    {
      command: 'specs'
    },
    {
      command: 'client',
      filters: [
        {
          command: 'vscode'
        },
        {
          command: 'sublime'
        },
        {
          command: 'atom'
        }
      ]
    }
  ],
  options: [
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
      name: 'postinstall',
      short: 'pi',
      description: 'Post install'
    },
    {
      name: 'help',
      short: 'h',
      description: 'Shows the CLI help and commands list'
    }
  ]
}
