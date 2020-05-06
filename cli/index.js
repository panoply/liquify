
import chalk from 'chalk'
import specs from './src/specs'
import prompt from './src/publish/commands'
export { default as grammar } from './src/grammar'

module.exports = async (run, config) => {

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
      await prompt()
      // log(chalk`{red Command does not exist}`)
  }

}
