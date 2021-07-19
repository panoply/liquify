/* eslint-disable object-curly-newline */

/* LIQUID QUERIES ----------------------------- */

export {
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
  isWithin
} from './liquid/controller/queries';

/* HTML QUERIES ------------------------------- */

export {
  isVoid,
  provideAttrs,
  provideValues,
  provideTags,
  resolveAttribute,
  resolveTag,
  resolveValue
} from './html/controller/queries';
