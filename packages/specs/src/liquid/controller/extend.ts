import { assign } from '../../utils/native';
import { Objects, Filters, Tags } from '../..';
import { Engine } from '../../utils/enums';
import { shopify, eleventy, jekyll, standard } from '../data';
import merge from 'mergerino';

function patchObjects (model: Objects, spec: Objects, patch: boolean) {
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

function patchFilters (model: Filters, spec: Filters, patch: boolean) {
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

function patchTags (model: Tags, spec: Tags, patch: boolean) {
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

/**
 * Extend Specification
 *
 * This function allows the specification to be extended
 * with custom support for different references. When existing
 * references are passed which are already specified, they will
 * be patched. Pass a value of `false` to `patch` to apply overwrites.
 */
export function extend (engine: Engine, spec: {
  objects?: Objects,
  filters?: Filters,
  tags?: Tags,
}, patch = true) {

  if (engine === Engine.shopify) {

    if (spec?.objects) {
      patchObjects(shopify.objects, spec.objects, patch);
    } else if (spec?.filters) {
      patchFilters(shopify.filters, spec.filters, patch);
    } if (spec?.tags) {
      patchTags(shopify.tags, spec.tags, patch);
    }

    return shopify;

  } else if (engine === Engine.eleventy) {

    if (spec?.objects) {
      patchObjects(eleventy.objects, spec.objects, patch);
    } else if (spec?.filters) {
      patchFilters(eleventy.filters, spec.filters, patch);
    } if (spec?.tags) {
      patchTags(eleventy.tags, spec.tags, patch);
    }

    return eleventy;

  } else if (engine === Engine.jekyll) {

    if (spec?.objects) {
      patchObjects(jekyll.objects, spec.objects, patch);
    } else if (spec?.filters) {
      patchFilters(jekyll.filters, spec.filters, patch);
    } if (spec?.tags) {
      patchTags(jekyll.tags, spec.tags, patch);
    }

    return jekyll;

  } else if (engine === Engine.standard) {

    if (spec?.objects) {
      patchObjects(standard.objects, spec.objects, patch);
    } else if (spec?.filters) {
      patchFilters(standard.filters, spec.filters, patch);
    } if (spec?.tags) {
      patchTags(standard.tags, spec.tags, patch);
    }

    return standard;

  }

}
