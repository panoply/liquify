import type { Hash } from 'types';
import { attrs } from 'attrs';
import * as store from 'store';
import lz from 'lz-string';
import esthetic from 'esthetic';

/**
 * Compress the editors current session
 */
export function encode () {

  attrs.hash = 'M=' + lz.compressToEncodedURIComponent(JSON.stringify(<Hash>{
    options: store.options,
    mode: attrs.mode,
    pane: attrs.pane,
    language: attrs.language,
    languageName: attrs.languageName,
    fontSize: attrs.fontSize,
    autoDetect: attrs.autoDetect,
    stats: attrs.stats,
    input: attrs.input.getValue(),
    output: attrs.output.getValue(),
    rules: esthetic.rules()
  }));

  window.location.hash = attrs.hash;

}

/**
 * Decompress the encoded JSON string URI
 */
export function decode (hash: string): Hash {

  return JSON.parse(lz.decompressFromEncodedURIComponent(hash));

}
