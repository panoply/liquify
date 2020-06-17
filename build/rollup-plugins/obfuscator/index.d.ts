import rollup from "rollup";
import obfuscator from "javascript-obfuscator";

/**
 * Cryptospec Rollup plugin used by the Liquify IDE plugin which will
 * encrypt JSON input files.
 */
export default function obfuscator(
  options: obfuscator.ObfuscatorOptions
): rollup.Plugin;
