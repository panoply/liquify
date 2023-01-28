import type { Hash } from '@types';
import { attrs } from '@attrs';
import * as store from '@store';
import lz from 'lz-string';

/**
 * Compress the editors current session
 */
export function encode () {

  return;

  const o: Hash = Object.create(null);

  o.options = store.options;
  o.mode = attrs.mode;
  o.pane = attrs.pane;
  o.language = attrs.language;
  o.sample = attrs.sample;
  o.fontSize = attrs.fontSize;
  o.autoDetect = attrs.autoDetect;
  o.languageName = attrs.languageName;
  o.stats = attrs.stats;
  o.input = attrs.input.getValue();
  o.output = attrs.output.getValue();

  attrs.hash = 'M=' + lz.compressToEncodedURIComponent(JSON.stringify(o));

  window.location.hash = attrs.hash;

}

/**
 * Decompress the encoded JSON string URI
 */
export function decode (hash: string): Hash {

  return JSON.parse(lz.decompressFromEncodedURIComponent(hash));

}
