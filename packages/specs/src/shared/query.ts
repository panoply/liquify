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
  isWithin,
  nextArgument,
  nextParameter,
  prevArgument,
  reset
} from 'liquid/controller/queries';

export {

  LiquidCompletions,
  LiquidTagComplete,
  LiquidTagResolve

} from 'liquid/controller/provide';

/* HTML QUERIES ------------------------------- */

export {
  isVoid,
  HTMLCompletions,
  HTMLAttrsComplete,
  HTMLAttrsResolve,
  HTMLTagComplete,
  HTMLTagResolve,
  HTMLValueComplete,
  HTMLValueResolve
} from 'html/controller/queries';
