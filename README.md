# Adobe Firefly Services API Documentation

This repo is the central hub repository for Firefly Services API documentation. Each Firefly Services API has its own repository, which is a spoke repository to this monorepo.

## Where to ask for help

## For contributors

For information on how to contribute and collaborate on the docs, see the [CONTRIBUTING.md](/CONTRIBUTING/CONTRIBUTING.md).

## How to develop

For local development, you'll need Yarn:

```shell
$ yarn install
```

Then to develop locally, run:

```shell
$ yarn clean
$ yarn dev
```

For the developer documentation, read the following sections on how to:

- [Arrange the structure content of your docs](https://github.com/adobe/aio-theme#content-structure)
- [Link to pages](https://github.com/adobe/aio-theme#links)
- [Use assets](https://github.com/adobe/aio-theme#assets)
- [Set global Navigation](https://github.com/adobe/aio-theme#global-navigation)
- [Set side navigation](https://github.com/adobe/aio-theme#side-navigation)
- [Use content blocks](https://github.com/adobe/aio-theme#jsx-blocks)
- [Use Markdown](https://github.com/adobe/aio-theme#writing-enhanced-markdown)

Or review the README on GitHub for [complete details about the microsite theme](https://github.com/adobe/aio-theme#getting-started).

## How to test

Lint status checks run on all PRs before merging.

Configured linters can also run locally (requires [Docker](https://www.docker.com/)):

  ```shell
  yarn lint
  ```

  > NOTE If you cannot use Docker, you can install the linters separately. In `.github/super-linter.env`, see which linters are enabled, and find the tools being used for linting in [Supported Linters](https://github.com/github/super-linter#supported-linters).

To check internal links locally:

  ```shell
  yarn test:links
  ```

To build and preview locally:

  ```shell
  yarn start
  ```

## AI Hub rules CLI (hubrules)

Use the `hubrules` CLI to borrow Cursor rules from this central hub repo into any spoke repo. It clones the hub into `.hub-rules` and symlinks rules into `.cursor/rules`.

### Install

From this repo:

```shell
$ yarn install
$ yarn hubrules --help
```

Or link globally (recommended):

```shell
$ npm link
$ hubrules --help
```

### Commands

Initialize a spoke repo with a link to this central hub repo (required once per repo):

```shell
$ hubrules init --hub-url <git-url> [--branch main] [--path .hub-rules] [--force]
```

List available hub rules:

```shell
$ hubrules list
```

Use a hub rule (creates a symlink in `.cursor/rules`):

```shell
$ hubrules use <agent-name> [--force]
```

Remove a borrowed rule:

```shell
$ hubrules remove <agent-name> [--force]
```

Show current borrowed rules:

```shell
$ hubrules status
```

### Notes

- The config file `.hub-rules.json` is created in the spoke repo root.
- `use` accepts names with or without the `.mdc` suffix.
- Existing non‑symlink or different symlink → error unless --force.
- `--force` overwrites existing rule files.

## Deployment

Deployments are done by the FFS docs development team. Reach out to schedule content deployments to stage and production.
