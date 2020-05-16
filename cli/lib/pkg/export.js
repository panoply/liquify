/**
 * EXPORTS
 *
 * Each package script export name must be indentical to the script file name which
 * in-turn must be the same name as the directory in the projects workspace where
 * the package source is located.
 *
 * When a command is executed, it will use the `packages` object defined in the
 * cli `package.json` file and dispatch the the command request to relative script
 * that are defined in this file. Package references defined in the cli `package.json`
 * are automatically applied by using a pnpm hook handled via the `pnpmfile.js`
 * located in projects root directory.
 *
 */

export { default as grammar } from './grammar'
export { default as specs } from './specs'
