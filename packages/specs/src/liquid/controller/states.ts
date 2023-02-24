import * as specification from '../data';
import { Liquid } from '..';
import { Engine } from '../../utils/enums';

export const liquid: Liquid = {
  engine: Engine.standard,
  tag: undefined,
  filter: undefined,
  object: undefined,
  type: undefined,
  argument: undefined,
  value: undefined,
  within: undefined,
  scope: undefined,
  variable: undefined,
  files: new Map(),
  data: {
    variation: specification.standard,
    variables: new Map(),
    completions: undefined
  }
};
