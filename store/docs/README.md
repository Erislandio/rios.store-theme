# Store Theme

Store Theme Template.

## Getting Started

### Install all dependencies with

```bash
yarn install
```

### Update App Vendor

Change app vendor in `manifest.json` file:

```json
{
  "vendor": "{{store-account}}",
}
```

## Tutorial

To understand how things work check our tutorial [Build a store using VTEX IO](https://vtex.io/docs/getting-started/build-stores-with-store-framework/1/)

## Dependencies

All store components that you see on this document are open source too. Production ready, you can found those apps in this GitHub organization.

Store framework is the baseline to create any store using _VTEX IO Web Framework_.

- [Store](https://github.com/vtex-apps/store/blob/master/README.md)

Store GraphQL is a middleware to access all VTEX APIs.

- [Store GraphQL](https://github.com/vtex-apps/store-graphql/blob/master/docs/README.md)

### Store Component Apps

- [Header](https://github.com/vtex-apps/store-header/blob/master/docs/README.md)
- [Footer](https://github.com/vtex-apps/store-footer/blob/master/docs/README.md)
- [Slider Layout](https://github.com/vtex-apps/slider-layout/blob/master/docs/README.md)
- [Shelf](https://github.com/vtex-apps/shelf/blob/master/docs/README.md)
- [Telemarketing](https://github.com/vtex-apps/telemarketing/blob/master/docs/README.md)
- [Menu](https://github.com/vtex-apps/menu/blob/master/docs/README.md)
- [Login](https://github.com/vtex-apps/login/blob/master/docs/README.md)
- [Minicart](https://github.com/vtex-apps/minicart/blob/master/docs/README.md)
- [Category Menu](https://github.com/vtex-apps/category-menu/blob/master/docs/README.md)
- [Product Summary](https://github.com/vtex-apps/product-summary/blob/master/docs/README.md)
- [Breadcrumb](https://github.com/vtex-apps/breadcrumb/blob/master/docs/README.md)
- [Search Result](https://github.com/vtex-apps/search-result/blob/master/docs/README.md)
- [Product Details](https://github.com/vtex-apps/product-details/blob/master/docs/README.md)
- [Store Components](https://github.com/vtex-apps/store-components/blob/master/docs/README.md)
- [Order Placed](https://github.com/vtex-apps/order-placed/blob/master/docs/README.md)

### Store Pixel Apps

- [Facebook Pixel](https://github.com/vtex-apps/facebook-pixel/blob/master/docs/README.md)
- [Google Tag Manager](https://github.com/vtex-apps/google-tag-manager/blob/master/docs/README.md)

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

![Commitizen](https://user-images.githubusercontent.com/101892002/211832613-87b83d66-5c0f-4b01-b0c8-405a42556957.png)

## Scripts

- `yarn commit`: A CLI interface using Commitizen to automate commits . See [Commitlint](https://github.com/commitizen/cz-cli)
- `yarn format`: Formats JSON files. See [Prettier](https://prettier.io/)
- `yarn stylelint`: Lint for CSS files. See [stylelint](https://stylelint.io/)
- `yarn stylelint:fix`: Lint for CSS files with automatically fix, where possible. See [stylelint fix](https://stylelint.io/user-guide/usage/options/#fix)
