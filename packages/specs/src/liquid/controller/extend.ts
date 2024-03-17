import { isArray, keys, obj } from '../../utils/native';
import { Objects, Filters, Tags } from '../..';
import { Engine, Type, TypeBasic } from '../../utils/enums';
import { shopify, eleventy, jekyll, standard } from '../data';
import { isObject, isString, isNumber, isBoolean, isNull } from '../../utils/typeof';
import { patchFilters, patchObjects, patchTags } from '../../utils/patches';

/**
 * Generate Specification
 *
 * Traverses a data structure and composes a Liquid specification that can be
 * understand by the query engine. Used for cases like the 11ty data cascade,
 * frontmatter and more. Expects an `input` object reference and specification type.
 */
export function generate <T = any> (input: T, spec: any = {}, cycle = 1): T {

  /**
   * Object Keys
   */
  let props: string[];

  /**
   * Whether or not the input is an array type
   */
  let array: boolean = false;

  /**
   * The key reference during traversal
   */
  let k: string;

  /**
   * The value reference during traversal
   */
  let v: any;

  if (isObject(input)) {
    if (isArray(input)) {
      array = true;
      props = keys(input);
    } else {
      props = keys(input);
    }
  }

  for (let i = 0, s = props.length; i < s; i++) {

    k = props[i];
    v = input[k];

    if (isString(v)) {

      if (array) {

        spec.items = TypeBasic.string;

      } else {

        spec[k] = obj();
        spec[k].type = TypeBasic.string;
        spec[k].value = v;

      }

    } else if (isNumber(v)) {

      if (array) {

        spec.items = TypeBasic.number;
        spec.value = v;

      } else {

        spec[k] = obj();
        spec[k].type = TypeBasic.number;
        spec[k].value = v;

      }
    } else if (isBoolean(v)) {

      if (array) {

        spec.items = TypeBasic.boolean;
        spec.value = v;

      } else {

        spec[k] = obj();
        spec[k].type = Type.boolean;
        spec[k].value = v;

      }

    } else if (isNull(v)) {

      if (array) {

        spec.items = TypeBasic.any;
        spec.value = v;

      } else {

        spec[k] = obj();
        spec[k].type = TypeBasic.any;
        spec[k].value = v;
        spec[k].description = 'Value is `null`';

      }

    } else if (isObject(v)) {

      if (isArray(v)) {

        if (isNaN(+k)) {

          spec[k] = obj();
          spec[k].type = TypeBasic.array;
          spec[k].properties = obj();

          generate(v, spec[k], ++cycle);

        } else {

          spec.type = TypeBasic.array;
          spec.properties = obj();
          generate(v, spec.properties, cycle);

        }

      } else {
        if (array) {
          if ('properties' in spec) {

            generate(v, spec.properties, ++cycle);

          } else {

            if (cycle === 1) {
              spec.type = TypeBasic.array;
              spec.properties = {};
            }

            generate(v, spec.properties, cycle);

          }
        } else {

          spec[k] = obj();
          spec[k].type = TypeBasic.object;
          spec[k].properties = obj();

          generate(v, spec[k].properties, ++cycle);

        }
      }
    }
  }

  return <T>spec;

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
