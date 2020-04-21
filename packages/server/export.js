// @ts-check
import { createConnection, ProposedFeatures } from 'vscode-languageserver'
import { LiquidServer } from './provide/server'
import { LiquidDocuments } from './provide/document'
// import { Specification } from './config/specification'

/**
 * Server Connection
 */
export const connection = createConnection(ProposedFeatures.all)

/**
 * Liquid Server - Instance
 */
export const Server = new LiquidServer()

/**
 * Liquid Documents Manager - Instance
 */
export const Documents = new LiquidDocuments()