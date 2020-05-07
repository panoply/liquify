
import specs from './run/specs'
import grammar from './run/grammar'
import prompt from './run/default'

export { default as rollup } from './run/rollup'

export const run = async (run, config) => {

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
