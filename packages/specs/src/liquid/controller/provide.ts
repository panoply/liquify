import { IObject } from '../types/objects';
import { variation, provider } from './data';
import { documentation } from './utils';

/* -------------------------------------------- */
/* EXPORTED SCOPE                               */
/* -------------------------------------------- */

export let cursor: any;

/* -------------------------------------------- */
/* LSP FEATURES                                 */
/* -------------------------------------------- */

export function doTagComplete () {

  return provider.tags;

}

export function doTagHover (token: string) {

  cursor = variation?.tags?.[token];

  if (cursor) return documentation(cursor.description, cursor.reference);

  return null;

}

export function doFilterComplete () {

  return provider.filters;

}

export function doFilterResolve () {

}

export function doFilterHover () {

}

export function doObjectComplete () {

  return provider.objects;

}

export function doObjectHover (token: string) {

  cursor = variation?.objects?.[token];

  if (cursor) return documentation(cursor.description, cursor.reference);

  return null;

}

export function doPropertyHover (token: string, objects: string[]) {

  if (!variation?.objects) return null;

  const prop = objects.indexOf(token);
  const root = variation.objects[objects[0]];

  if (!root) return null;

  let spec: IObject = root?.properties;
  let walk: number = 1;

  while (prop < walk) spec = spec.properties?.[objects[walk++]];

  if (!prop) return null;

  return documentation(spec.description, root.reference);

}

export function doParameterComplete () {

}

export function doParameterHover () {

}

export function doArgumentComplete () {

}

export function doArgumentHover () {

}
