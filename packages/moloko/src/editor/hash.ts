import type { IAttrs, Hash } from 'types';
import { attrs } from 'attrs';
import lz from 'lz-string';

/**
 * Encode
 *
 * Compress the editors current session
 */
export function encode ({
  detectLanguage,
  idx,
  languagesOpen,
  model,
  previewMode,
  previewOpen,
  rules,
  rulesOpen
}: IAttrs) {

  const input = model.input.map((
    {
      language,
      languageName,
      model,
      order,
      uri
    }
  ) => ({
    language,
    languageName,
    order,
    uri,
    model: model.getValue()
  }));

  attrs.hash = 'M=' + lz.compressToEncodedURIComponent(JSON.stringify(<Hash>{
    detectLanguage,
    input,
    idx,
    languagesOpen,
    previewMode,
    previewOpen,
    rules,
    rulesOpen
  }));

  // window.location.hash = attrs.hash;

}

/**
 * Decode
 *
 * Decompress the encoded JSON string URI
 */
export function decode (hash: string): Hash {

  return JSON.parse(lz.decompressFromEncodedURIComponent(hash));

}
