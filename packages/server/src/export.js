// @ts-check
import { createConnection, ProposedFeatures } from 'vscode-languageserver'
import { LiquidServer } from './provide/server'

/**
 * Server Connection
 */
export const connection = createConnection(ProposedFeatures.all)

/**
 * Liquid Server - Instance
 */
export const Server = new LiquidServer()

/**
 * Liquid Service
 */
export { default as Service } from './provide/service'

/**
 * Liquid Documents
 */
export { default as Document } from './provide/document'

/**
 * Liquid Service
 */
export * as Parser from './parser/export'
