[![Netlify Status](https://api.netlify.com/api/v1/badges/dde0cdba-7d6d-4621-8972-2f42b46a7e53/deploy-status)](https://app.netlify.com/sites/liquify/deploys)

# Liquify.dev

Repository for the [Liquify](https://liquify.dev) IDE text editor tool. The website is a static hybrid, built using [11ty](https://11ty.dev) and served up via [Netlify](https://ww.netlify.com).

**Visit [liquify.dev](https://liquify.dev)**

## Services

The website functions and operates by leveraging the following services:

- [Github](https://github.com/)
- [Netlify](https://netlify.com/)

## Development

#### System Requirements

- [VS Code](https://code.visualstudio.com/)
- [Node](http://nodejs.org)
- [Pnpm](https://pnpm.js.org/en/cli/install)

## VS Code

Refer to the `.vscode` directory for workspace settings. Required extensions will be automatically recommended. Launch with the pre-configured preferences.

#### Linting Extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

#### Formatting Extensions

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Liquify](https://marketplace.visualstudio.com/items?itemName=sissel.shopify-liquid)

#### Build Tools

- [11ty](https://11ty.dev)
- [ESBuild](https://esbuild.github.io)
- [Sass Dart](https://sass-lang.com/)
- [PostCSS](https://postcss.org/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)

#### Commands

The development environment provides a bunch of commands. If you're contributing or using this repository as development strap, then run `pnpm dev` for watch and serve (development) and `pnpm build` when building for production.

| Command           | Description                                         |
| ----------------- | --------------------------------------------------- |
| `pnpm dev`        | Starts development environment and 11ty             |
| `pnpm build`      | Builds website, use `--prod` for production version |
| `pnpm deploy`     | Triggers a clean, build and deployment to Netlify   |
| `pnpm sass:watch` | Compiles SASS into CSS in watch mode                |
| `pnpm sass:build` | Compiles CSS for production using PostCSS and purge |
| `pnpm js:watch`   | Compiles TypeScript using ESBuild in watch mode     |
| `pnpm js:build`   | Compiles TypeScript using ESBuild for production    |
| `pnpm clean`      | Runs a `rm -rf` on the public directory             |
| `pnpm 11ty:watch` | Runs default Eleventy command with serve and watch  |
| `pnpm 11ty:build` | Builds docs for production using Eleventy           |

> Compiling supports `--prod` and `--dev` flags, by default `--dev` is applied

#### Directory Structure

The directory structure . This structure is far more logical and visually pleasing opposed to the standard structure shipped with Jekyll.

```
├── .netlify
├── functions
├── public
└── src
   ├── app
   │   ├── components
   │   ├── controllers
   │   └── index.js
   │
   ├── assets
   │   ├── gifs
   │   ├── icons
   │   └── image
   │
   ├── data
   ├── pages
   ├── style
   │   ├── components
   │   ├── controllers
   │   └── stylesheet.scss
   │
   ├── views
   └── index.html
```

#### JavaScript

The project implements [Mithril.js](https://mithril.js.org/), [Stimulus.js](https://stimulusjs.org/) and [SPX](https://spx.js.org/). These 3 modules act in unity to provide a static hybrid PWA browsing experience. This odd and otherwise opinionated combination of Open Source tools results in fast renders and instant per page navigation requests.

#### Styling

The project styling leverages the [@brixtol/bootstrap](https://github.com/BRIXTOL/bootstrap) hard fork framework for grid and utilities. Production builds will have the vast majority of the styles purged in the post-build cycle.

## Author

🥛 [Νίκος Σαβίδης](mailto:nicos@gmx.com) <img align="right" src="https://img.shields.io/badge/-@sisselsiv-1DA1F2?logo=twitter&logoColor=fff" />
