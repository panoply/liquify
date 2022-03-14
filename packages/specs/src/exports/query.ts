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
  isAllowed,
  nextArgument,
  nextParameter,
  prevArgument,
  reset
} from 'liquid/controller/queries';

/* HTML QUERIES ------------------------------- */

export {

  setHTMLTag,
  isVoid,
  isAttribute,
  isAttributeUniq,
  isAttributeValue,
  isValueRequired,
  isEmbedded,
  isLanguage

} from 'html/controller/queries';
