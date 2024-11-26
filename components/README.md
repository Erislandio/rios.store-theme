# React App Template

React App Template for VTEX IO.

## Getting Started

Install all dependencies with:

```bash
yarn install && cd react && yarn install
```

### Update App Vendor

Change app vendor in `manifest.json` file:

```json
{
  "vendor": "{{store-account}}",
}
```

### Update SonarCloud

Update the `sonar.projectKey` and `sonar.organization` properties in the `sonar-project.properties` file to run unit tests with SonarCloud and generate a coverage metric.

```properties
sonar.projectKey=your-project-key
sonar.organization=your-project-organization
```

## Documentation

You can use this template for your component documentation:

- [Documentation Template](./docs/EXAMPLE.md)

## Unit Testing

You can create tests with [VTEX Test Tools](https://github.com/vtex/test-tools) and run with:

- `yarn test`: Run unit tests.
- `yarn test:coverage`: Run unit tests and generate test coverage information and display in console. See [Jest --coverage](https://jestjs.io/docs/cli#--coverageboolean).
- `yarn test:watch`: Watching test files for changes and re-running tests related to changed files. See [Jest --watch](https://jestjs.io/docs/cli#--watch).

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

- `yarn commit`: A CLI interface using Commitizen to automate commits. See [Commitlint](https://github.com/commitizen/cz-cli)
- `yarn format`: Formats TypeScript and JSON files using [Prettier](https://prettier.io/).
- `yarn lint`: Lint for TypeScript files with [Eslint](https://eslint.org/).
- `yarn lint:fix`: Lint for TypeScript files with automatically fix, where possible.
- `yarn stylelint`: Lint for CSS files. See [stylelint](https://stylelint.io/)
- `yarn stylelint:fix`: Lint for CSS files with automatically fix, where possible. See [stylelint fix](https://stylelint.io/user-guide/usage/options/#fix)
- `yarn test`: Run unit tests using [VTEX Test Tools](https://github.com/vtex/test-tools).
- `yarn test:coverage`: Run unit tests and generate test coverage information and display in console. See [Jest --coverage](https://jestjs.io/docs/cli#--coverageboolean)
- `yarn test:watch`: Watching test files for changes and re-running tests related to changed files. See [Jest --watch](https://jestjs.io/docs/cli#--watch)
