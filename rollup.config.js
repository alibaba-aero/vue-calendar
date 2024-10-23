// rollup.config.js
const vue = require('rollup-plugin-vue'); // Vue 2 plugin
const { terser } = require('rollup-plugin-terser');
const resolve = require('@rollup/plugin-node-resolve')

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
        vue(), // Vue 2 support
        resolve()
    ],
};