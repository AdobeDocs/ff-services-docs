# Firefly Services Documentation

This repository contains the main [Firefly Services documentation](https://developer-stage.adobe.com/firefly-services/docs/guides/). It also consumes transcluded content for specific related API tabs in the form of markdown files copied in from other repositories(ie: Firefly API, Ps API). This allows for a separation of concerns while still allowing the content to be navigated and consumed like it's in one repo.

## Transcluded content pages and repos

| Page                                | Repository                                                              |
| ----------------------------------- | ----------------------------------------------------------------------- |
| https://developer-stage.adobe.com/firefly-services/docs/firefly-api/ | [`AdobeDocs/firefly-api-docs`](https://github.com/AdobeDocs/firefly-api-docs) |
| https://developer-stage.adobe.com/firefly-services/docs/photoshop/        | [`AdobeDocs/cis-photoshop-api-docs`](https://github.com/AdobeDocs/cis-photoshop-api-docs)               |

## Steps

**IMPORTANT:** These steps are required to allow you to see your updates to any transcluded content.

1. Ensure you are in the `transclude` branch of this repo.
1. Ensure your latest content is checked into the `main` branch of the repo to be copied from (ie: [`AdobeDocs/firefly-api-docs`](https://github.com/AdobeDocs/firefly-api-docs).
1. If you have already run `yarn install` to test locally, you must first delete the `node_modules` and `yarn.lock` file to ensure the newest content will be fetched from the target repos, then run `yarn install`.
1. Run `yarn run prebuild` to copy in the new content from the associated `node_modules` package.
1. Run `yarn dev` to test it locally and make sure you see your latest changes.
1. Once your updates are ready, commit and push the `transclude` branch to the remote GitHub [Firefly Services](https://github.com/AdobeDocs/ff-services-docs/) repo, then run the [deploy job](https://github.com/AdobeDocs/ff-services-docs/actions/workflows/deploy.yml), ensuring you specify the `transclude` branch.

### Navigation updates

**IMPORTANT:** If your transcluded repo site needs changes to the nav, you'll need to update the specific related config file noted below (vs the `gatsby-config.js` in that repo):

- For [Firefly API](https://developer-stage.adobe.com/firefly-services/docs/firefly-api/) navigation updates - update the [`reference-firefly.js`](./reference-firefly.js)
- For [Photoshop API](https://developer-stage.adobe.com/firefly-services/docs/photoshop/) navigation updates - update the [`reference-photoshop.js`](./reference-photoshop.js)

## Template

This documentation site is based on the [`AdobeDocs/dev-site-documentation-template`](https://github.com/AdobeDocs/dev-site-documentation-template).

View the [demo](https://adobedocs.github.io/dev-site-documentation-template/) running on Github Pages.  

### Where to ask for help

The slack channel #adobeio-onsite-onboarding is our main point of contact for help. Feel free to join the channel and ask any questions.

### How to develop

For local development, run:

```shell
$ yarn install
$ export NODE_OPTIONS=--max_old_space_size=8192
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

For more in-depth [instructions](https://github.com/adobe/aio-theme#getting-started).

### How to test

- To run the configured linters locally (requires [Docker](https://www.docker.com/)):

  ```shell
  yarn lint
  ```

  > NOTE If you cannot use Docker, you can install the linters separately. In `.github/super-linter.env`, see which linters are enabled, and find the tools being used for linting in [Supported Linters](https://github.com/github/super-linter#supported-linters).

- To check internal links locally

  ```shell
  yarn test:links
  ```

- To build and preview locally:

  ```shell
  yarn start
  ```

### How to deploy

For any team that wishes to deploy to the developer.adobe.com and developer-stage.adobe.com websites, they must be in contact with the dev-site team. Teams will be given a path that will follow the pattern `developer.adobe.com/{product}/`. This will allow doc developers to setup their subpaths to look something like:

```text
developer.adobe.com/{product}/docs
developer.adobe.com/{product}/community
developer.adobe.com/{product}/community/code_of_conduct
developer.adobe.com/{product}/community/contribute
```

#### Launching a deploy

You can deploy using the GitHub actions deploy workflow see [deploy instructions](https://github.com/adobe/aio-theme#deploy-to-azure-storage-static-websites).
