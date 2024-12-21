// rollup.config.js
const vue = require('rollup-plugin-vue'); // Vue 2 plugin
const { terser } = require('rollup-plugin-terser');
const resolve = require('@rollup/plugin-node-resolve');
const  commonjs = require('@rollup/plugin-commonjs');
const postcss = require('rollup-plugin-postcss');

module.exports = {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            plugins: [terser()], // Minify the CommonJS output
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            plugins: [terser()], // Minify the ESM output
        },
        {
            file: 'dist/index.es.js',
            format: 'es', // Unminified ES module
        },
    ],
    plugins: [
        resolve(),
        commonjs(),
        vue({
            css: false, // Prevent inlining CSS, handled by postcss instead
            compileTemplate: true, // Precompile Vue templates to render functions
        }),
        postcss({
            extract: true, // Extract CSS into a separate file
            minimize: true, // Minify the CSS
            sourceMap: true, // Generate source maps for CSS
        }),
    ],
};