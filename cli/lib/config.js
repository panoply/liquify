
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
    },
  ],
  options: [
    {
      flags: ['config', 'c'],
      description: 'Use configuration file (defaults to `.liquifyrc.json`',
      available: ['client', 'grammar', 'schema', 'specs', 'server']
    },
    {
      flags: ['watch', 'w'],
      description: 'Watch and bundle file/s'
    },
    {
      flags: ['main', 'm'],
      description: 'Define a main (entry) configuration file',
      available: ['grammar']
    },
    {
      flags: ['input', 'i'],
      description: 'Input path to directory of file/s'
    },
    {
      flags: ['output', 'o'],
      description: 'Output path destination of bundled file/s'
    },
    {
      flags: ['prod', 'p'],
      description: 'Production bundle build'
    },
    {
      flags: ['dev', 'd'],
      description: 'Develop bundle build (default)'
    },
     {
      flags: ['postinstall', 'pi'],
      description: 'Post install'
    },
    {
      flags: ['help', 'h'],
      description: 'Shows the CLI help and commands list'
    }
  ]
}


