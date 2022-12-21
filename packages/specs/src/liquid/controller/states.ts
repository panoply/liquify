import * as specification from '../data';
import { Liquid } from '..';
import { Engine } from '../../utils/enums';

export const liquid: Liquid = {
  engine: Engine.standard,
  tag: undefined,
  filter: undefined,
  object: undefined,
  argument: undefined,
  value: undefined,
  within: undefined,
  scope: undefined,
  variable: undefined,
  data: {
    variation: specification.standard,
    variables: new Map(),
    completions: undefined
  }
};
