// Can't use official plugin because: https://github.com/rollup/plugins/issues/287 >:-(
// import typescript from '@rollup/plugin-typescript';

import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import dirTree from 'directory-tree';
import filesize from 'rollup-plugin-filesize';
import fs from 'fs-extra';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

// Another crashing plugin that used to work (and hopefully will again!):
// import visualizer from 'rollup-plugin-visualizer';

const extensions = [
    '.js', '.jsx', '.ts', '.tsx'
];

const licenseInfo =
`/**
  * @author       Richard Davey <rich@photonstorm.com>
  * @copyright    2020 Photon Storm Ltd.
  * @license      {@link https://opensource.org/licenses/MIT|MIT License}
  */`;

/**
 * Custom Roll-up Plugin that copies the package.json version to the dist package.json
 */
const DistPackagePlugin = {

    name: 'DistPackagePlugin',

    generateBundle () {

        const devPackage = fs.readJsonSync('./package.json');
        const distPackage = fs.readJsonSync('./dist.package.json');

        distPackage.version = devPackage.version;

        fs.writeJsonSync('./dist/package.json', distPackage, { spaces: 4 });

    }

};

const filterConfig = {
    extensions: /\.ts/,
    exclude: [
        /src\\stats/,
        /src\/stats/
    ]
};

const ESMInputBundle = {};

dirTree('src', filterConfig, (item, path) =>
{
    /*
    item structure:

    { path: 'src\\utils\\base64\\Base64ToArrayBuffer.ts',
    name: 'Base64ToArrayBuffer.ts',
    size: 2019,
    extension: '.ts',
    type: 'file' }
    */

    //  First we need to see if this is an interface and bail out
    //  The quickest test is if the filename starts with a capital I:

    if (item.name.substring(0, 1) === 'I')
    {
        //  Now we need to actually check inside the file *sigh*
        const fileContents = fs.readFileSync(item.path, 'utf8');

        if (fileContents.includes('export interface') || fileContents.includes('export type'))
        {
            // console.log('Ignoring interface ' + item.name);
            return;
        }
    }

    const itemPath = path.dirname(item.path);

    //  Take the item path and put it into an array
    const parts = itemPath.split(path.sep);

    //  Remove the src\ part from the dir array (the first entry)
    parts.shift();

    //  Turn back, always use / as Rollup requires it
    const dir = parts.join('/');

    const name = item.name.substring(0, item.name.length - item.extension.length);

    const entryPoint = (dir === '') ? name : dir + '/' + name;

    ESMInputBundle[entryPoint] = item.path;
});

export default [
    {
        //  UMD Bundle
        input: './src/index.ts',
        output: [
            {
                file: './dist/Phaser4.js',
                format: 'umd',
                name: 'Phaser4',
                sourcemap: true,
                esModule: false,
                plugins: [
                    filesize()
                ]
            }
        ],
        plugins: [

            del({
                targets: [ './dist', './stats.html' ],
                runOnce: true
            }),

            resolve({
                extensions
            }),

            typescript({
                tsconfig: './tsconfig.json'
            }),

            copy({
                targets: [
                    { src: 'LICENSE', dest: 'dist', copyOnce: true },
                    { src: 'logo.png', dest: 'dist', copyOnce: true },
                    { src: 'README.dist.md', dest: 'dist', rename: 'README.md', copyOnce: true }
                ]
            })

            //  Currently crashing in version 4.0.4, let's hope they fix it
            // visualizer({
            //     "title": "Phaser 4 Package Stats",
            //     "sourcemap": false,
            //     "template": "treemap" // "circlepacking"
            // })

        ]
    },
    {
        //  UMD Minified Bundle
        input: './src/index.ts',

        output: [
            {
                file: './dist/Phaser4.min.js',
                format: 'umd',
                name: 'Phaser4',
                sourcemap: false,
                esModule: false,
                plugins: [
                    terser({
                        output: {
                            preamble: licenseInfo,
                            comments: false
                        }
                    }),
                    DistPackagePlugin
                ]
            }
        ],

        plugins: [

            resolve({
                extensions
            }),

            typescript({
                tsconfig: './tsconfig.json'
            })

        ]
    },
    {
        //  ESM Multiple Entry Point Package
        input: ESMInputBundle,

        onwarn: (warning, next) =>
        {
            //  Because the TypeScript plugin will create d.ts files
            //  that already exist, so let's not spam the console
            //  with them.
            if (warning.code === 'FILE_NAME_CONFLICT')
            {
                return;
            }
            else
            {
                next(warning);
            }
        },

        plugins: [

            resolve({
                extensions
            }),

            typescript({
                tsconfig: './tsconfig.json'
            })

        ],

        output: [
            {
                dir: 'dist',
                format: 'esm'
            }
        ]
    }
];
