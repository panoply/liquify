import { EventEmitter } from 'events'

/**
 * @type {EventEmitter}
 */
export const event = new EventEmitter()

/**
 * @type {Parser.Documents}
 */
export const documents = new Map()
