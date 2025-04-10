# Adobe Firefly Services API Documentation

This repo contains Firefly Services API documentation.

## Where to ask for help

The Slack channel [#ffs-dev-site](https://adobe.enterprise.slack.com/archives/C06N47SC1PE) is our main point of contact for help. Feel free to join the channel and ask any questions.

## For Contributors

For information on how to contribute and collaborate on the docs, see the [CONTRIBUTING.md](.github/CONTRIBUTING.md).

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

## Deployment

Deployments are done by the FFS docs development team. Reach out to schedule content deployments to stage and production.
