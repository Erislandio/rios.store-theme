# Publish and Deploy

This repository uses the [VTEX Toolbelt Action](https://github.com/marketplace/actions/vtex-toolbelt-action) for publishing and deploy automation.

## How it works

The **VTEX Toolbelt Action** enables VTEX CLI actions through [GitHub Actions](https://docs.github.com/actions). In this way, it is possible, through a workflow, to publish an app in the merge of the main branch.

## Getting Started

### Create a VTEX Role

1. Login to the VTEX store account.
2. Navigate to _`VTEX Admin > Account Management > Roles`_. Then, create an access profile with the following roles from **VTEX IO** product:
   - Read Workspace Apps
   - Link App
   - Install App
   - Debug App
   - Read Edition

![Roles](https://user-images.githubusercontent.com/101892002/230420052-0578ecf0-4f08-4f46-bc01-6d65efffca59.png)

#### See

- [Tutorials & Solutions: Roles](https://help.vtex.com/en/tutorial/perfis-de-acesso--7HKK5Uau2H6wxE1rH5oRbc)

### Generate the VTEX Application Key

To create application keys in your account, navigate to _`Account settings > Account management > Application Keys`_ and click on the **Manage my keys** button. This will take you to the **My Keys** page, which lists all internal app keys.

To generate a new application key:

1. Click on the `⊕ Generate new` button.
2. Click on the `+ Add roles` to manage app key permissions, and then add the role created for the VTEX Toolbelt Action.
3. Generate the Application Key.

![Application Key](https://user-images.githubusercontent.com/101892002/230454556-cd504d6b-6ae7-4f54-be9f-fdcbece0fe03.png)

#### See

- [Tutorials & Solutions: Application Keys](<[https://](https://help.vtex.com/en/tutorial/chaves-de-aplicacao--2iffYzlvvz4BDMr6WGUtet)>)

### Create GitHub Secrets

Navigate to _`GitHub > Settings > Secrets and variables > Actions > New repository Secret`_ and create the following GitHub secrets with the values of VTEX Access Key and Token.

- `VTEX_TOOLBELT_KEY`: VTEX App Key.
- `VTEX_TOOLBELT_TOKEN`: VTEX App Token.

#### See

- [Creating encrypted secrets for a repository](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository)

## Release

1. Create a new Release Pull Request for the `main` branch.
2. Update app version in `manifest.json` file.
3. Update versioning of `package.json` and version badge on the `README.md` (not required for VTEX deploy).
4. Request Pull Request approval.
5. Merge Pull Request. At the end of the action, the app must be published.
6. Update apps after merging all required releases. Run in your terminal: `vtex update`.
