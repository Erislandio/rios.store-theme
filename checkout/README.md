<div align="center">

# Checkout UI Settings

[![Version 1.0.0](https://img.shields.io/badge/version-1.0.0-blue)](#) [![VTEX IO](https://img.shields.io/badge/VTEX%20IO-f71963.svg?logo=vtex&logoColor=white)](https://developers.vtex.com/vtex-developer-docs/docs/welcome) [![Sass](https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=white)](https://sass-lang.com/) [![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![jQuery](https://img.shields.io/badge/jQuery-%230769AD.svg?logo=jquery&logoColor=white)](https://jquery.com/) [![Webpack](https://img.shields.io/badge/Webpack-%238DD6F9?logo=webpack&logoColor=black)](https://webpack.js.org/) [![ESLint](https://img.shields.io/badge/ESLint-4B3263?logo=eslint&logoColor=white)](https://eslint.org/) [![Stylelint](https://img.shields.io/badge/Stylelint-f2f2f2?logo=stylelint&logoColor=black)](https://stylelint.io/) [![Prettier](https://img.shields.io/badge/Prettier-c596c7?logo=prettier&logoColor=white)](https://prettier.io/) [![Jest](https://img.shields.io/badge/-Jest-%23C21325?logo=jest&logoColor=white)](https://jestjs.io/) [![commitlint](https://img.shields.io/badge/Commitlint-121212?logo=commitlint)](https://commitlint.js.org/) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-ff69b4.svg?logo=conventionalcommits&logoColor=white)](https://www.conventionalcommits.org/en/v1.0.0/) [![Node](https://img.shields.io/node/v/husky)](https://nodejs.org/en/)

This app uses the `checkout-ui-custom` builder, which that allow the development of checkout customizations using [Sass](https://sass-lang.com/) and [TypeScript](https://www.typescriptlang.org/).

See [VTEX Checkout UI Settings](https://github.com/vtex-apps/checkout-ui-settings) and [VTEX Checkout UI Custom](https://github.com/vtex-apps/checkout-ui-custom) on GitHub.

</div>

## Getting Started

### Install dependencies

1. Install [Node.js](https://nodejs.org/en/) on version 14 or higher.

2. Install all dependencies with:

```bash
yarn install
```

3. Install VTEX IO CLI:

```bash
yarn global add vtex
```

> :information_source: See: [Installing the VTEX IO CLI](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-vtex-io-cli-install)

### Update App Vendor

Change app vendor in `manifest.json` file according to store account.

```json
{
  "vendor": "{{account-name}}",
  "name": "checkout-ui-settings",
  "version": "1.0.0"
}
```

> :information_source: See: [Manifest](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-manifest)

## Developing locally

1. Create a development workspace:

```bash
vtex use workspace-name
```

> :information_source: See: [Using VTEX IO's CLI: Creating a new workspace](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-vtex-io-cli-usage#creating-a-new-workspace)

2. In your terminal, run the development script:

```bash
yarn start
```

- :information_source: This script concurrently runs the development build process (`webpack`) and the VTEX developing command (`vtex link`).
- :information_source: See: [Using VTEX IO's CLI: Developing locally](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-vtex-io-cli-usage#developing-locally).

> :warning: Do not modify the files in the `checkout-ui-custom` folder as they are automatically generated files used by the builder. For development use the files from the `src` folder.

## Publishing

### Using Automation

1. Create the release branch. Example: ``git checkout -b release/1.0.0``
2. Update app version in `manifest.json` file.
3. Update versioning of `package.json` and version badge on the `README.md` (not required for VTEX deploy).
4. Create a Pull Request for the `main` branch.
5. Merge Pull Request. At the end of the action, the app must be published.

> :warning: The deployment workflow will automatically generate the `checkout6-custom.js` and `checkout6-custom.css` files in the `checkout-ui-custom` folder, according to the `src` folder files, at publish time. Therefore, it is not necessary to commit these files.

### Manually

If automation doesn't work properly, you can do the process manually:

1. Generate production code from `checkout-ui-custom` folder:

```bash
yarn build
```

2. Publish the app.

```bash
vtex publish
vtex deploy
```

> :information_source: See: [Publishing an app](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-publishing-an-app)

# Alias

Aliases help with code organization, making internal project imports cleaner.

By default, there are already two aliases in the project:

- `@constants`: relative to the `src/ts/constants` path, for constant values.
- `@utils`: relative to the `src/ts/utils` path, for helper functions.

## Using Aliases

To add new methods to existing aliases, just create a file, export the content and export it again in the index file. Example:

1. Create a new helper function in `src/ts/utils/new-helper.ts`

```ts
export const sum = (x: number, y: number) => x + y
export const sub = (x: number, y: number) => x - y
```

2. Then, export all the contents in the `src/ts/utils/index.ts` file

```ts
export * from './new-helper'
```

3. Now you can import the new functions into any file like this:

```ts
import { sum, sub } from '@utils'
```

## Creating new Aliases

Let's assume that a new alias called `@new-alias` will be created:

1. Create the following file structure and export all the content in the index file.

```
├── src
│   ├── new-alias-folder
│   │   ├── index.ts
│   │   ├── file-01.ts
│   │   ├── file-02.ts

```

2. Update the `webpack.config.js` file in the `alias` property of the `resolver` property:

```diff
resolve: {
  alias: {
    '@constants': path.resolve(__dirname, 'src/ts/constants'),
    '@utils': path.resolve(__dirname, 'src/ts/utils'),
+   '@new-alias': path.resolve(__dirname, 'src/ts/new-alias-folder'),
  },
},
```

3. Update the `tsconfig.json` file in the `paths` property of the `compilerOptions` property so that the typescript understands the typing:

```diff
"compilerOptions": {
  "target": "ES5",
  "module": "ES2015",
  "baseUrl": ".",
  "paths": {
    "@constants": ["./src/ts/constants"],
    "@utils": ["./src/ts/utils"]
+   "@new-alias": ["./src/ts/new-alias-folder"]
  }
},
```

4. Then, it may be necessary to reinstall the dependencies for the typescript to start understanding the new alias:

```bash
yarn install
```

Finally, import your new alias:

```ts
import { newFunction } from '@new-alias'

```

# Unit Testing

You can create tests with [Jest](https://jestjs.io/docs) and run with:

- `yarn test`: Run unit tests.
- `yarn test:coverage`: Run unit tests and generate test coverage information and display in console. See [Jest --coverage](https://jestjs.io/docs/cli#--coverageboolean).
- `yarn test:watch`: Watching test files for changes and re-running tests related to changed files. See [Jest --watch](https://jestjs.io/docs/cli#--watch).

# Conventional Commits

This repository uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification) for better standardization of commits.

The commit message should be structured as follows:

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Examples:

```text
feat: add shipping calculator
chore(release): 1.0.0
```

Common types according to [Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines) can be:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
- **chore**: Other changes that don't modify src or test files.
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).
- **docs**: Documentation only changes.
- **feat**: A new feature.
- **fix**: A bug fix.
- **perf**: A code change that improves performance.
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **revert**: Reverts a previous commit.
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- **test**: Adding missing tests or correcting existing tests.

## Commitizen

You can use the [Commitizen](https://commitizen-tools.github.io/commitizen) CLI interface to create Conventional Commits:

```bash
yarn commit
```

![image](https://user-images.githubusercontent.com/101892002/209986018-000ba5ac-5ed6-4fe1-8974-408492a1642a.png)

# Scripts

- `yarn build`: Generate the production code.
- `yarn start`: Generate development code, watching files with Webpack.
- `yarn format`: Formats Sass and TypeScript files using [Prettier](https://prettier.io/).
- `yarn lint`: Lint for TypeScript files with [Eslint](https://eslint.org/).
- `yarn lint:fix`: Lint for TypeScript files with automatically fix, where possible.
- `yarn stylelint`: Lint for SCSS files with [Stylelint](https://stylelint.io/).
- `yarn stylelint:fix`: Lint for SCSS files with automatically fix, where possible.
- `yarn commit`: A CLI interface using Commitizen to automate commits. See [Commitlint](https://github.com/commitizen/cz-cli)
