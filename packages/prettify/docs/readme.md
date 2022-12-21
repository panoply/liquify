# Prettify Documentation

SPX (Single Page XHR) documentation website built using [11ty](https://www.11ty.dev/docs/) and served on Github pages. The generated files are published to the [docs branch](#) that mounts as a subdirectory using git worktree. The documentation is using SPX so feel free to use this strap as a starter for your next project.

[spx.js.org](https://spx.js.org)

### Supports

- Generated using 11ty
- SCSS to CSS Compilation with SASS Dart
- CSS Post Processing via PostCSS + CSSPurge
- TypeScript Transpilation using ESBuild
- SVG Sprites with SVGO
- HTML Minification with HTML Terser

# Development

All dependencies are included within the `package.json` file. ESLint, Prettier and Stylelint as assumed to be installed globally but available as optional dependencies.

```cli
pnpm install
```

### Commands

```cli
pnpm dev                 Starts development in watch mode
pnpm build               Builds documentation for production
pnpm 11ty:build          Triggers an 11ty build
pnpm 11ty:watch          Starts 11ty in watch mode with server
pnpm sass:build          Compiles SASS into CSS
pnpm sass:watch          Start SASS in watch mode
pnpm js:build            Build production JS bundle
pnpm js:watch            Start ESBuild in watch mode
```
