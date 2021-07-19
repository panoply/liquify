/* eslint-disable object-curly-newline */

/* LIQUID QUERIES ----------------------------- */

export {
  getLiquidCompletions,
  getArgument,
  setFilter,
  setObject,
  setTag,
  setEngine,
  isError,
  isObjectType,
  isOptional,
  isParameter,
  isProperty,
  isRequired,
  isTagType,
  isType,
  isValue,
  isWithin,
  nextArgument,
  nextParameter,
  prevArgument,
  reset
} from './liquid/controller/queries';

/* HTML QUERIES ------------------------------- */

export {
  getHTMLCompletions,
  isVoid,
  provideAttrs,
  provideValues,
  provideTags,
  resolveAttribute,
  resolveTag,
  resolveValue
} from './html/controller/queries';
