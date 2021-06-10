import rollup from "rollup";
import { ObfuscatorOptions} from "javascript-obfuscator";

/**
 * implements the JavaScript Obfuscator compliler
 * as a rollup plugin.
 */
export default function obfuscator(
  options: ObfuscatorOptions
): rollup.Plugin;
