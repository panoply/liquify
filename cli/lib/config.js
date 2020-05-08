export default {

  engine: 'pnpm',
  interface: {
    command: 'liquify',
    description: 'This CLI is used for developing the Liquify IDE tool and provides a command line interface to bundle, package and maintain the project.',
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
    packages: [
      {
        package: '@liquify/clients',
        command: 'client',
        filters: [ { command: 'vscode' }, { command: 'sublime' }, { command: 'atom' } ],
        description: 'Build and compile bundles'
      },
      {
        package: '@liquify/liquid-language-grammars',
        command: 'grammar',
        filters: [ { command: 'create' } ],
        description: 'Packaging execution, eg: npm pack'
      },
      {
        package: '@liquify/schema-stores',
        command: 'schema',
        description: 'Common git related operations for the project'
      },
      {
        package: '@liquify/liquid-language-server',
        command: 'server',
        description: 'Publish to CDN, Netlify, Marketplace etc'
      },
      {
        package: '@liquify/specs',
        command: 'specs',
        description: 'Publish to CDN, Netlify, Marketplace etc'
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
}
