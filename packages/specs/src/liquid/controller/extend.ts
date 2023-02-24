import { assign } from '../../utils/native';
import { Objects, Filters, Tags } from '../..';
import { Engine } from '../../utils/enums';
import * as specification from '../data';

/**
 * Extend Specification
 *
 * This function allows the specification to be extended
 * with custom support for different references.
 */
export function extend (engine: Engine, spec: {
  objects?: Objects,
  filters?: Filters,
  tags?: Tags
}) {

  if (engine === Engine.shopify) {
    if (spec?.objects) {
      for (const object in spec.objects) {
        if (object in specification.shopify.objects) {
          assign(specification.shopify.objects[object].properties, spec.objects[object].properties);
        } else {
          specification.shopify.objects[object] = spec.objects[object];
        }
      }
    }

    return specification.shopify;
  }

}
