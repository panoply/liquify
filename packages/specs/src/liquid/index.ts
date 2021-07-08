import * as Specification from './export';
import { cursor } from './cursor';
import { Variation, IEngine, ParameterArgument } from './types/common';
import { Types } from './types/types';
import { argument } from './argument';

export let variation: Variation = Specification.standard;

/**
 * Set variation engine
 */
export function engine (name: IEngine) {

  if (variation.engine !== name) {
    variation = Specification[name] as Variation;
    cursor.engine = name;
  }

};

export function tag (name: string) {

  // Reset states for every new tag encountered
  if (cursor.tag) cursor.reset();
  if (!variation.tags?.[name]) return false;

  cursor.tag = variation.tags[name];

  if (cursor.tag?.arguments) cursor.argument = cursor.tag.arguments[0];

  return true;

}

export function object (name: string): boolean {

  if (!variation?.objects?.[name]) return false;

  cursor.object = variation.objects[name];

  return true;

};

export function filter (name: string): boolean {

  // Reset states for every new tag encountered
  if (cursor.filter) argument.reset();
  if (!variation.filters?.[name]) return false;

  cursor.filter = variation.filters[name];

  if (!cursor.filter?.arguments) return false;

  cursor.argument = cursor.filter.arguments[0];
  argument.param = cursor.argument.type === Types.Argument.parameter
    ? cursor.argument as ParameterArgument
    : cursor.argument?.parameter;

  return true;

};

export function propofObject (value: string): boolean {

  if (!cursor.object.properties?.[value]) return false;

  cursor.object = cursor.object.properties[value];
  return true;

}

export function typeofObject (type: Types.Basic): boolean {

  return cursor.object.type === type;
}

export function typeofTag (type: Types.Tag): boolean {

  return cursor.tag.type === type;
}

export function typeofArgument (type: Types.Argument | Types.Basic): boolean {

  return cursor.argument.type === type;

}
