# Phaser 4 - HTML5 Game Framework

Rebooting the Phaser universe from scratch.

![Phaser4](logo.png)

Examples can be found in the [Phaser 4 Examples repo](https://github.com/phaserjs/examples).

Developer updates can be found on the [Phaser Patreon](https://www.patreon.com/join/photonstorm).

Get the latest release from npm:

```
npm install @phaserjs/phaser --save-dev
```

Keep updating it. It's changing multiple times per day.

You can find all packages under the [@phaserjs](https://www.npmjs.com/settings/phaserjs/packages) organization.

## npm development scripts

| script | action |
| ------ | ------ |
| `lint` | Run ESLint across the whole src folder in fix mode |
| `debug` | Build the main Phaser 4 modules, useful for checking for package errors |
| `build` | Build all of the Phaser 4 modules |
| `watch` | Build all modules and enter watch mode |
| `build-dev` | Build the `dev/index.ts` script to run a local test without publishing |
| `watch-dev` | Build and watch the `dev/index.ts` script |
| `build-fastdev` | Build just the `dev/index.ts` without rebuilding the whole of Phaser  |
| `watch-fastdev` | Build and watch the `dev/index.ts` script without rebuilding Phaser |

## VS Code Extensions

If you wish to help with development of Phaser, the following VS Code Extensions are useful:

* [Document This](https://github.com/joelday/vscode-docthis)
* [EditorConfig for VS Code](https://github.com/editorconfig/editorconfig-vscode)
* [ESLint](https://github.com/Microsoft/vscode-eslint)
* [sort-imports](https://github.com/amatiasq/vsc-sort-imports)

## Admin only npm scripts

| script | action |
| ------ | ------ |
| `testdist` | Increment version by patch, run a build but **do not** publish to npm |
| `dist` | Increment version by patch, run a build then publish to npm |
| `distminor` | Increment version by minor, run a build then publish to npm |
| `distmajor` | Increment version by major, run a build then publish to npm |
