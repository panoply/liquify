import { Patterns } from './lexical'
export { default as scanner } from './scanner'
export { default as increment } from './increment'

const RegEx = flag => exp => new RegExp(exp.join('|'), flag)

export default function ({
  rootUri,
  specification,
  paths,
  settings,
  linter,
  formatting
}) {

  Object.keys(Regexp).forEach(exp => {

    const matchGroup = /\bGROUP_[0-9]/g

    return new Map(Regexp[exp]).forEach(({ groups, flag = '', capture: [ regex ] }, k) => {

      if (groups) {
        groups.forEach(group => {
          let i = 0
          const match = regex.source.replace(matchGroup, () => Array.isArray(group) ? `${group[i++]}` : `${groups.join('|')}`)
          regexp[k] = new RegExp(match, flag)
        })

      } else {
        const match = regex.source.replace(matchGroup, () => `${groups.join('|')}`)
        regexp[k] = new RegExp(match, flag)

      }

      // console.log(o)
    })
  })

  const regexp = Patterns({
    html: [
      'style',
      'script'
    ],
    includes: [
      'include'
    ]
  })

}
