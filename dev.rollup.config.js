import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import livereload from 'rollup-plugin-livereload';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import typescript from 'rollup-plugin-typescript2';

const extensions = [
    '.js', '.jsx', '.ts', '.tsx'
];

export default {

    input: './dev/index.ts',

    output: [
        {
            file: './dev/dist/index.js',
            format: 'iife',
            name: 'Phaser4Example',
            sourcemap: true
        }
    ],

    plugins: [
        resolve({
            extensions
        }),

        del({ targets: './dev/dist/*', runOnce: true }),

        typescript({
            tsconfig: './dev.tsconfig.json'
        }),

        copy({
            targets: [
                { src: 'dev/index.html', dest: 'dev/dist', copyOnce: true }
            ]
        }),

        serve('dev/dist'),

        livereload()

    ]

};
