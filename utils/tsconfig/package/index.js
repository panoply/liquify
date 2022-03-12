import alias from '@rollup/plugin-alias';
import beep from '@rollup/plugin-beep';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import esbuild, { minify } from 'rollup-plugin-esbuild';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';
export { defineConfig as rollup } from 'rollup';
export { config, env, banner, jsonmin, date } from '@liquify/rollup-utils';
export const plugin = {
    get alias() { return alias; },
    get beep() { return beep; },
    get copy() { return copy; },
    get commonjs() { return commonjs; },
    get del() { return del; },
    get esbuild() { return esbuild; },
    get filesize() { return filesize; },
    get json() { return json; },
    get resolve() { return resolve; },
    get replace() { return replace; },
    get esminify() { return minify; },
    get terser() { return terser; }
};
