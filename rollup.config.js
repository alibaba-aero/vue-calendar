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
            file: 'dist/vue-calendar.cjs.min.js',
            format: 'cjs',
            sourcemap: true, // Optional: Include a sourcemap
            plugins: [terser()], // Minify the CommonJS output
        },
        {
            file: 'dist/vue-calendar.es.js',
            format: 'es',
            plugins: [terser()],
        },
        {
            file: 'dist/vue-calendar.min.js',
            name: 'vue-calendar',
            format: 'umd',
            sourcemap: true,
            plugins: [terser()],
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
            extract: 'vue-calendar.min.css', // Extract CSS into a separate file
            minimize: true, // Minify the CSS
            sourceMap: true, // Generate source maps for CSS
        }),
    ],
};