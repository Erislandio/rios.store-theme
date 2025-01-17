# Template Emails

[![Version](https://img.shields.io/badge/version-1.0.0-blue)](#) [![VTEX Emails](https://img.shields.io/badge/Emails-f71963.svg?logo=vtex&logoColor=white)](https://github.com/vtex/vtex-emails) [![Gulp](https://img.shields.io/badge/Gulp-cf4647?&logo=gulp&logoColor=white)](https://gulpjs.com/) [![Handlebars](https://img.shields.io/badge/Handlebars.js-f0772b?&logo=handlebarsdotjs&logoColor=black)](https://handlebarsjs.com/) [![Sass](https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=white)](https://sass-lang.com/) [![Stylelint](https://img.shields.io/badge/Stylelint-f2f2f2?logo=stylelint&logoColor=black)](https://stylelint.io/) [![Prettier](https://img.shields.io/badge/Prettier-c596c7?logo=prettier&logoColor=white)](https://prettier.io/) [![Commitlint](https://img.shields.io/badge/Commitlint-121212?logo=commitlint)](https://commitlint.js.org/) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-ff69b4.svg?logo=conventionalcommits&logoColor=white)](https://www.conventionalcommits.org/en/v1.0.0/) [![Node](https://img.shields.io/node/v/sass)](https://nodejs.org/)

Template Emails is an email framework based on [bojler](https://github.com/Slicejack/bojler) for developing transactional email templates for VTEX E-commerces.

## Features

Template Emails inherited [Bojler's features](https://github.com/Slicejack/bojler#features) like:

- SASS support
- Automatic CSS inlining
- Embedded CSS
- Webserver with Live Reload
- Reset styles
- Responsive design

And it has other important features:

- Handlebars compiling
- Tachyons integration
- Partials for code reuse
- VTEX transactional JSONs examples for preview
- i18n for internationalization

## Folders and structure

- `public` compiled files for preview
- `dist` compiled files for exporting
- `source` working folder
  - `data` JSON files containing Orders data
  - `helpers` VTEX's Helpers functions
  - `locales` i18n files
  - `sass` styles
  - `templates` e-mails templates
    - `partials` e-mails parts

### You must NOT add, change or modify

- `helpers` you can use only Handlebars and VTEX's Helpers.

### You can add, change or modify

- `data` you can create folders with different JSON examples as well. They must have a real VTEX JSON structure.
- `locales` use your own communication.
- `sass` use your own style.
- `templates` name your templates your own way. **Each template must have a JSON file with the same name.**
- `partials` use the partials that make sense for you.

## Hands on

### Installation

1. Create a repository using this template. See [Creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) on GitHub.
2. Update the project name in the `package.json`.
3. Install dependencies: run `yarn` or `npm install`.

### Developing

0. Requires node `14.x`.
1. Run `yarn gulp dev` or `npm run gulp dev`.
2. Go to [http://localhost:8000/](http://localhost:8000/).
3. Choose the language folder and open the template that you want to preview.

### Generating an exportable VTEX template

1. Run `yarn gulp dist` or `npm run gulp dist`.
2. Go to `dist` folder, copy the template content and paste it in [VTEX Message Center](https://help.vtex.com/tutorial/understanding-the-message-center--tutorials_84).

### Generating a light preview version for testing

1. Run `yarn gulp preview` or `npm run gulp preview`
2. Go to `public` folder, copy the template content and test it using services like [MailChimp](https://mailchimp.com/).

### Changing JSON data set

1. Stop yarn/npm service.
2. Create a new folder in `source/data`.
3. Change `orderJsonToRead` variable in `gulpfile.js` to the new folder name.
4. Start yarn/npm service.

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

- `yarn dev`: Starts the development server using [Gulp](https://gulpjs.com/).
- `yarn build`: Compile production code using [Gulp](https://gulpjs.com/).
- `yarn commit`: A CLI interface using [Commitizen](https://commitizen-tools.github.io/commitizen/) to automate commits.
- `yarn format`: Formats Sass and JSON files using [Prettier](https://prettier.io/).
- `yarn stylelint`: Lint for Sass files using [Stylelint](https://stylelint.io/).
- `yarn stylelint:fix`: Lint for Sass files with automatically [fix](https://stylelint.io/user-guide/usage/options/#fix), where possible.

## SonarCloud

You can configure SonarCloud bypassing some configuration files and VTEX files.

### Using automatic analysis

- Access **Administration > General Settings > Analysis Scope**.
- In the **Source File Exclusions** section add the following file paths:
  - `*.config.*`
  - `source/helpers/helpers.js`

![Source File Exclusions](https://github.com/quality-digital/template.emails/assets/101892002/d9de8aa8-f220-4802-825f-ba5294531f54)

### Using sonar-project.properties file

Add the following code snippet in the `sonar-project.properties` file:

```properties
sonar.exclusions=*.config.*, source/helpers/helpers.js
```

## To do

- Live reload is not working very well. Sometimes you need to refresh the page manually.
- Recompiling doesn't work for JSON changes. You'll need to stop npm service and start it again.
- Improve Outlook compatibility.
- Improve VTEX inStore scenarios.

## Bugs and feature requests

If you find a bug or need new feature please open a new issue and we will discuss about it.

**Thank you! :)**
