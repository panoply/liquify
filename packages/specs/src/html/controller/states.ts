import * as specification from '../data';
import { HTML5 } from '../';

const html5: HTML5 = Object.assign(Object.create(null), { data: Object.create(null) });

/* -------------------------------------------- */
/* EXPORT SPECS                                 */
/* -------------------------------------------- */

html5.data.variation = specification;
html5.data.completions = undefined;

/* -------------------------------------------- */
/* EXPORT SPECS                                 */
/* -------------------------------------------- */

html5.tag = undefined;
html5.value = undefined;

export { html5 };
