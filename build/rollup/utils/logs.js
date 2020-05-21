const path = require('path')

const isExternal = id =>
  // rollup specific id
  id.startsWith('\0') === false &&
  // relative id
  id.startsWith('.') === false &&
  // absolute id
  path.isAbsolute(id) === false

const getPackageName = id => {
  return (
    id
    .split('/')
    // consider scoped packages
    .slice(0, id.startsWith('@') ? 2 : 1)
    .join('/')
  )
}

const findFullPathPackageName = id => {
  const token = 'node_modules/'
  const index = id.lastIndexOf(token)
  if (index !== -1) {
    return getPackageName(id.slice(index + token.length))
  } else {
    return ''
  }
}

const renderList = (indent, list) =>
  list.map(item => '\n' + '  '.repeat(indent) + item).join('')

const packagesLogger = ({
  showPackages = false,
  showPathImports = false,
  showDependentPackages = false
} = {}) => {
  const packagesSet = new Set()
  const idsSet = new Set()
  const dependentPackagesMap = new Map()

  const renderDependentPackages = (indent, name) => {
    const dependents = Array.from(dependentPackagesMap.get(name)).sort()
    if (dependents.length !== 0) {
      return renderList(indent, dependents)
    } else {
      return ''
    }
  }

  const renderPackages = indent => {
    const packages = Array.from(idsSet).sort()
    return renderList(
      indent,
      packages.map(name => {
        if (showDependentPackages) {
          return name + renderDependentPackages(indent + 1, name)
        }
        return name
      })
    )
  }

  return {
    resolveId (importee, importer) {
      if (isExternal(importee)) {
        const packageName = getPackageName(importee)
        const dependentPackageName = findFullPathPackageName(importer)
        const id = showPathImports ? importee : packageName
        packagesSet.add(packageName)
        idsSet.add(id)

        if (dependentPackagesMap.has(id) === false) {
          dependentPackagesMap.set(id, new Set())
        }
        if (dependentPackageName.length !== 0) {
          dependentPackagesMap.get(id).add(dependentPackageName)
        }
      }
    },
    generateBundle () {
      console.info('\n----------')
      if (showPackages && idsSet.size !== 0) {
        console.info(renderPackages(1))
        console.info('\n----------')
      }
      console.info(`\n  ${packagesSet.size} packages are used in app`)
      console.info('\n----------\n')
    }
  }
}

export default packagesLogger
