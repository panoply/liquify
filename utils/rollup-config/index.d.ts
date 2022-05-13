import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import { terser } from 'rollup-plugin-terser';
import enums from '@liquify/rollup-enums';
import obfuscator from '@liquify/rollup-obfuscator';
import watch from '@liquify/rollup-watch';
export { defineConfig as rollup } from 'rollup';
export { config, env, banner, jsonmin, date } from '@liquify/rollup-utils';
/**
 * Rollup Plugins
 */
export declare const plugin: {
    /**
     * Alias modules in a build.
     *
     * [@rollup/plugin-alias](https://git.io/JuTc9)
     */
    readonly alias: typeof alias;
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
    readonly commonjs: typeof commonjs;
    /**
     * Delete files and folders.
     *
     * [rollup-plugin-delete](https://git.io/JuTz3)
     */
    readonly del: typeof del;
    /**
     * ESBuild integration for minification and TypeScript support.
     *
     * [rollup-plugin-esbuild](https://git.io/J1DEP)
     */
    readonly esbuild: ({ include, exclude, sourceMap: _sourceMap, optimizeDeps, tsconfig, loaders: _loaders, ...esbuildOptions }?: import("rollup-plugin-esbuild").Options) => import("rollup").Plugin;
    /**
     * Show filesize in the cli
     *
     * [rollup-plugin-filesize](https://git.io/JuTzw)
     */
    readonly filesize: (options?: import("rollup-plugin-filesize").FileSizePluginOptions) => import("rollup").Plugin;
    /**
     * Convert JSON files to ES Modules.
     *
     * [@rollup/plugin-json](https://git.io/JuTni)
     */
    readonly json: typeof json;
    /**
     * Use the Node resolution algorithm.
     *
     * [@rollup/plugin-node-resolve](https://git.io/JOqCR)
     */
    readonly resolve: typeof resolve;
    /**
     * Replace occurrences of a set of strings.
     *
     * [@rollup/plugin-replace](https://git.io/JuTcC)
     */
    readonly replace: typeof replace;
    /**
     * Minify using esbuild
     *
     * [rollup-plugin-esbuild](https://git.io/J1DEP)
     */
    readonly esminify: (options?: Omit<import("esbuild").TransformOptions, "sourcemap"> & {
        sourceMap?: boolean;
    }) => import("rollup").Plugin;
    /**
     * Minify code using Terser
     */
    readonly terser: typeof terser;
    /**
     * Obfuscation minification workspace plugin
     */
    readonly obfuscator: typeof obfuscator;
    /**
     * Liquid Language Specs string to enum converter
     */
    readonly enums: typeof enums;
    /**
     * Generate type `.d.ts` definition files.
     */
    readonly dts: import("rollup").PluginImpl<import("rollup-plugin-dts").Options>;
    /**
     * Extend Rollup's watch instance via chokidar
     */
    readonly watch: typeof watch;
};
