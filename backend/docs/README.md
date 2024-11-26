# GraphQL Example

[![Version 0.1.0](https://img.shields.io/badge/version-0.0.0-blue)](/) [![VTEX IO](https://img.shields.io/badge/Node.js-6DA55F.svg?logo=node.js&logoColor=white)](https://developers.vtex.com/vtex-developer-docs/docs/welcome) [![NodeJS](https://img.shields.io/badge/VTEX%20IO-f71963.svg?logo=vtex&logoColor=white)](https://nodejs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![GraphQL](https://img.shields.io/badge/GraphQL-e10098.svg?logo=graphql&logoColor=white)](https://graphql.org/) [![ESLint](https://img.shields.io/badge/ESLint-4B3263?logo=eslint&logoColor=white)](https://eslint.org/) [![Prettier](https://img.shields.io/badge/Prettier-c596c7?logo=prettier&logoColor=white)](https://prettier.io/) [![Jest](https://img.shields.io/badge/Jest-%23C21325?logo=jest&logoColor=white)](https://jestjs.io/) [![Commitlint](https://img.shields.io/badge/Commitlint-121212?logo=commitlint)](https://commitlint.js.org/) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-ff69b4.svg?logo=conventionalcommits&logoColor=white)](https://www.conventionalcommits.org/en/v1.0.0/) [![Node](https://img.shields.io/node/v/husky)](https://nodejs.org/en/)

GraphQL VTEX IO Service Example.

## Getting started

### Install dependencies

Run in your terminal:

```bash
yarn && cd node && yarn
```

### Update App Vendor

Change app vendor in `manifest.json` file:

```json
{
  "vendor": "{{store-account}}"
}
```

## Status Query Example

This app provides an example of http status query by status code, based on the [httpstat.us](https://httpstat.us/) API.

```graphql
query Status($statusCode: String!) {
  status(statusCode: $statusCode) @context(provider: "vendor.app-name") {
    code
    description
  }
}
```

## See

- [VTEX GraphQL Example](https://github.com/vtex-apps/graphql-example)

## Git Commit

### Conventional Commits

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

### Commitizen

You can use the [Commitizen](https://commitizen-tools.github.io/commitizen) CLI interface to create Conventional Commits:

```bash
yarn commit
```

![image](https://user-images.githubusercontent.com/101892002/209986018-000ba5ac-5ed6-4fe1-8974-408492a1642a.png)

## Scripts

- `yarn format`: Formats TypeScript and JSON files using [Prettier](https://prettier.io/).
- `yarn lint`: Lint for TypeScript files with [Eslint](https://eslint.org/).
- `yarn lint:fix`: Lint for TypeScript files with automatically fix, where possible.
- `yarn commit`: A CLI interface using [Commitizen](https://commitizen-tools.github.io/commitizen) to automate commits.
- `yarn test`: Run unit tests using [Jest](https://jestjs.io/).
- `yarn test:coverage`: Run unit tests and generate test coverage information and display in console. See [Jest --coverage](https://jestjs.io/docs/cli#--coverageboolean)
- `yarn test:watch`: Watching test files for changes and re-running tests related to changed files. See [Jest --watch](https://jestjs.io/docs/cli#--watch)
