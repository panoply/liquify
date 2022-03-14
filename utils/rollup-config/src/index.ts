import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import esbuild, { minify } from 'rollup-plugin-esbuild';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import filesize from 'rollup-plugin-filesize';
import enums from '@liquify/rollup-enums';
import obfuscator from '@liquify/rollup-obfuscator';
export { defineConfig as rollup } from 'rollup';
export { config, env, banner, jsonmin, date } from '@liquify/rollup-utils';

/**
 * Rollup Plugins
 */
export const plugin = {
  /**
   * Alias modules in a build.
   *
   * [@rollup/plugin-alias](https://git.io/JuTc9)
   */
  get alias () { return alias; },
  /**
   * Copy files and folders, with glob support.
   *
   * [rollup-plugin-copy](https://git.io/JuTux)
   */
  get copy () { return copy; },
  /**
   * Convert CommonJS modules to ES Modules
   *
   * [@rollup/plugin-commonjs](https://git.io/JuTcI)
   */
  get commonjs () { return commonjs; },
  /**
   * Delete files and folders.
   *
   * [rollup-plugin-delete](https://git.io/JuTz3)
   */
  get del () { return del; },
  /**
   * ESBuild integration for minification and TypeScript support.
   *
   * [rollup-plugin-esbuild](https://git.io/J1DEP)
   */
  get esbuild () { return esbuild; },
  /**
   * Show filesize in the cli
   *
   * [rollup-plugin-filesize](https://git.io/JuTzw)
   */
  get filesize () { return filesize; },
  /**
   * Convert JSON files to ES Modules.
   *
   * [@rollup/plugin-json](https://git.io/JuTni)
   */
  get json () { return json; },
  /**
   * Use the Node resolution algorithm.
   *
   * [@rollup/plugin-node-resolve](https://git.io/JOqCR)
   */
  get resolve () { return resolve; },
  /**
   * Replace occurrences of a set of strings.
   *
   * [@rollup/plugin-replace](https://git.io/JuTcC)
   */
  get replace () { return replace; },
  /**
   * Minify using esbuild
   *
   * [rollup-plugin-esbuild](https://git.io/J1DEP)
   */
  get esminify () { return minify; },
  /**
   * Obfuscation minification workspace plugin
   */
  get obfuscator () { return obfuscator; },
  /**
   * Liquid Language Specs string to enum converter
   */
  get enums () { return enums; }

};
