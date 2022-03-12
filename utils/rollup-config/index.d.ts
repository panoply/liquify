import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import esbuild, { minify } from 'rollup-plugin-esbuild';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import filesize from 'rollup-plugin-filesize';


export { defineConfig as rollup } from 'rollup';
export { config, env, banner, jsonmin, date } from '@liquify/rollup-utils';

/**
 * Rollup Plugins
 */
export const plugin: {
  /**
   * Alias modules in a build.
   *
   * [@rollup/plugin-alias](https://git.io/JuTc9)
   */
  readonly alias: typeof alias;
  /**
   * Beeps when a build ends with errors.
   *
   * [@rollup/plugin-beep](https://git.io/JuTEW)
   */
  readonly beep: Function;
  /**
   * Copy files and folders, with glob support.
   *
   * [rollup-plugin-copy](https://git.io/JuTux)
   */
  readonly copy: typeof copy;
  /**
   * Convert CommonJS modules to ES Modules
   *
   * [@rollup/plugin-commonjs](https://git.io/JuTcI)
   */
  readonly commonjs: typeof commonjs
  /**
   * Delete files and folders.
   *
   * [rollup-plugin-delete](https://git.io/JuTz3)
   */
  readonly del: typeof del
  /**
   * ESBuild integration for minification and TypeScript support.
   *
   * [rollup-plugin-esbuild](https://git.io/J1DEP)
   */
  readonly esbuild: typeof esbuild
  /**
   * Show filesize in the cli
   *
   * [rollup-plugin-filesize](https://git.io/JuTzw)
   */
  readonly filesize: typeof filesize
  /**
   * Convert JSON files to ES Modules.
   *
   * [@rollup/plugin-json](https://git.io/JuTni)
   */
  readonly json: typeof json
  /**
   * Use the Node resolution algorithm.
   *
   * [@rollup/plugin-node-resolve](https://git.io/JOqCR)
   */
  readonly resolve: typeof resolve
  /**
   * Replace occurrences of a set of strings.
   *
   * [@rollup/plugin-replace](https://git.io/JuTcC)
   */
  readonly replace: typeof replace
  /**
   * Minify using esbuild
   *
   * [rollup-plugin-esbuild](https://git.io/J1DEP)
   */
  readonly esminify: typeof minify

};
