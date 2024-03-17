import { assign } from './native';
import { Objects, Filters, Tags } from '../types/index';
import merge from 'mergerino';

export function patchObjects (model: Objects, spec: Objects, patch: boolean) {
  for (const object in spec) {
    if (object in model) {
      if (patch) {
        model[object].properties = merge(model[object].properties, spec[object].properties);
      } else {
        assign(model[object].properties, spec[object].properties);
      }
    } else {
      model[object] = spec[object];
    }
  }
}

export function patchFilters (model: Filters, spec: Filters, patch: boolean) {
  for (const filter in spec) {
    if (filter in model) {
      if (patch) {
        model[filter] = merge(model[filter], spec[filter]);
      } else {
        assign(model[filter], spec[filter]);
      }
    } else {
      model[filter] = spec[filter];
    }
  }
}

export function patchTags (model: Tags, spec: Tags, patch: boolean) {
  for (const tag in spec) {
    if (tag in model) {
      if (patch) {
        model[tag] = merge(model[tag], spec[tag]);
      } else {
        assign(model[tag], spec[tag]);
      }
    } else {
      model[tag] = spec[tag];
    }
  }
}
