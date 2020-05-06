
const chalk = require('chalk')
const specs = require('./operations/specs')

export default async (run, config) => {

  const { log } = console

  switch (run) {
    case 'specs':
      await specs(config); break
    // case 'schema':
      // await schema(config); break
    // case 'server':
      //  await server(config); break
    // case 'client':
      // await client(config); break
    case 'grammar':
      await grammar(config); break
    default:
      log(chalk`{red Command does not exist}`)
  }

}
