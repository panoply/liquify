import { IEngine, Variation } from '../types/common';

export interface Entries {
  label?: string,
  deprecated?: boolean,
  documentation?: {
    kind: 'markdown' | 'plaintext',
    value: string
  },
  data?: {
    snippet?: string,
    singular?: boolean
  }
}

export interface IProvide {
  readonly tags: Entries[]
  readonly filters: Entries[]
  readonly objects: Entries[]
}
