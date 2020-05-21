/**
 * Plugins - Concats development and production plugins
 * based on process env variable.
 *
 * @param {array} devPlugins
 * @param {array} prodPlugins
 */
export default function (devPlugins, prodPlugins) {

  if (process.env.prod) return [ ...devPlugins, ...prodPlugins ]

  return devPlugins

}
