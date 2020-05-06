[![Netlify Status](https://api.netlify.com/api/v1/badges/dde0cdba-7d6d-4621-8972-2f42b46a7e53/deploy-status)](https://app.netlify.com/sites/liquify/deploys)

# Liquify.dev

Repository for the [Liquify](https://liquify.dev) IDE text editor extension/package tool. The website is a static hybrid, built using [11ty](https://11ty.dev) and served up via [Netlify](https://ww.netlify.com). The production version of the site builds into the [website/public](https://github.com/panoply/liquify/tree/public).

## Install

If you're using this as a boilerplate or wish to contribute to the [Liquify](#) project, clone the repository and run `npm install` to install all dependences.

## Services

The website functions and operates by leveraging the following services:

- [Github](https://github.com/)
- [Netlify](https://netlify.com/)

## Deployment

## Development

#### System Requirements

- [VS Code](https://code.visualstudio.com/)
- [Node](http://nodejs.org)
- [PNPM](https://www.npmjs.com/)

## VS Code

Refer to the `.vscode` directory for workspace settings. Required extensions will be automatically reccomended. Launch with the pre-configured preferences.

#### Linting Extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

#### Formatting Extensions

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Liquify](https://marketplace.visualstudio.com/items?itemName=sissel.shopify-liquid)

#### Build Tools

- [11ty](https://11ty.dev)
- [Rollup](https://rollupjs.org/)
- [SASS](https://sass-lang.com/)
- [PostCSS](https://postcss.org/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [Light Server](https://github.com/txchen/light-server)

#### Commands

The development environment provides a bunch of commands. If you're contributing or using this repository as development [strap](#) running `npm run dev` in development and `npm run build --prod` when building for production.

| Command            | Description                                         |
| ------------------ | --------------------------------------------------- |
| `pnpm run dev`     | Starts development build environment                |
| `pnpm run build`   | Builds website, use `--prod` for production version |
| `pnpm run style`   | Compiles SASS into CSS                              |
| `pnpm run scripts` | Compiles JavaScript via Rollup                      |
| `pnpm run clean`   | Runs a `rm -rf` on the public directory             |
| `pnpm run 11ty`    | Runs default Eleventy command                       |
| `pnpm run rollup`  | Runs default Rollup command                         |

> Compiling supports `--prod` and `--dev` flags, by default `--dev` is applied

#### Directory Structure

The directory structure . This structure is far more logical and visually pleasing opposed to the standard stucture shipped with Jekyll.

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

The project implements [Mithril.js](#), [Stimulus.js] and [Turbolinks 5](#) which act in unity to provide a static hybrid PWA browsing experience. This odd and otherwise opinionated combination of Open Source tools results in blazing fast renders and instant per page navigation requests. ES2020 features which compiles down to ES6 via [Babel](#) with type checking being handled by [JSDocs](#).

> The `defs.ts` file located at the root of the `app` directory is used by JSDocs `@typedef` and provides types for more the complex functions.

#### Styling

The project styling leverages the [Bootstrap 4](#) framework Grid and Utilities, everything else is excluded (because fuck jQuery and we only need the flex and grid additions). Flexbox classes applied to grid layouts use a different naming structure (for convenience sake) then those shipped with Bootstrap:

| Bootstrap            | Project |
| -------------------- | ------- |
| `.justify-content-*` | `.jc-*` |
| `.justify-items-*`   | `.ji-*` |
| `.align-content-*`   | `.ac-*` |
| `.align-items-*`     | `.ai-*` |
| `.align-self-*`      | `.as-*` |

<hr>

🥛 <small>Laced with Moloko Plus by [Νίκος Σαβίδης](mailto:nicos@gmx.com)</small>
