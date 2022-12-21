import { ParseError } from '../lexical/errors';
import { config } from '../config';

/**
 * Validate Checksum
 *
 * Determines whether or not validation should
 * apply based of the `ParseError` and settings
 * provided at runtime.
 */
export function validate (error: ParseError) {

  switch (error) {

    /* -------------------------------------------- */
    /* UNKNOWN PROPERTIES                           */
    /* -------------------------------------------- */
    case ParseError.UnknownObject:

      return !config.validate.unknownObjects;

    /* -------------------------------------------- */
    /* UNKNOWN PROPERTIES                           */
    /* -------------------------------------------- */
    case ParseError.UnknownProperty:

      return !config.validate.unknownProperties;

  }

}
