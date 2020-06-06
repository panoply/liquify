// @ts-nocheck

import * as validators from './validate/index'

/**
 * Diagnostic Functions
 *
 * Validation diagnostics are supplied when building an AST representation
 * of an opened/active text document (executing on a per-change basis).
 * Validations are returned as an array of asynchronous functions and assigned
 * to the returning `diagnostics[]` object property of the `Parser()`.
 *
 * @typedef {import('vscode-languageserver-textdocument').TextDocument} TextDocument
 * @typedef {import('../../../release/vscode-liquify/server/node_modules/defs').AST} AST[]
 * @typedef {import('../../../release/vscode-liquify/server/node_modules/defs').AST} ASTnode
 * @typedef {import('../../../release/vscode-liquify/server/node_modules/defs').ASTEmbeddedRegion} ASTEmbeddedRegion
 * @typedef {import('../../../release/vscode-liquify/server/node_modules/defs').ValidationRunnerParams} ValidationRunnerParams
 * @typedef {import('vscode-languageserver').TextEdit} TextEdit
 */

/* ---------------------------------------------------------------- */
/* PUBLIC                                                           */
/* ---------------------------------------------------------------- */

/**
 * Validation Resolver
 *
 * @export
 * @param {TextDocument} document
 */
export function resolve (document) {

  return async (validate) => (
    validate
      ? validate(document)
      : undefined
  )
}

/**
 * Do Validation
 *
 * Validation runner used to validate tokens. This function is
 * executed while generating the document AST and returns and asynchronous
 * function which will be fulfilled and executed post-parse.
 *
 * @param {ASTnode} ASTnode
 * @param {ValidationRunnerParams} [call]
 */
export function doValidate (ASTnode, call = undefined) {

  const diagnostics = []
  const validations = Object.values(validators)
  const { tag, type } = ASTnode

  return async document => new Promise(resolve => {

    if (!call) {

      for (const {
        validate,
        meta: {
          group,
          onCall,
          rules,
          types,
          tags
        }
      } of validations) {
        if (onCall) continue
        if (types.includes(type) && tags.includes(tag)) {
          if (group === 'object' && !ASTnode.objects) continue
          validate(document, ASTnode, rules, diagnostics)
        }
      }

    } else {

      const [ [ $group, $rule ] ] = Object.entries(call)
      const [ { validate, meta: { rules } } ] = validations.filter(({
        meta: { group, onCall, rules }
      }) => ((onCall && group === $group) && Object.keys(rules).includes($rule)))

      if (rules[$rule]) validate(document, ASTnode, rules, diagnostics)

    }

    resolve(...diagnostics)

  }).catch(e => console.log(e))
}
