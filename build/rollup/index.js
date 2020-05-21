
import findUp from 'find-up'
import { resolve } from 'path'

export const path = p => !p ? resolve(__dirname, p) : p.map(i => resolve(__dirname, i))
