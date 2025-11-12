---
title: Firefly Templates
description: Templates and boilerplate text for Firefly Services documentation.
keywords:
  - Firefly Templates
  - Firefly Services
  - Firefly API
  - Firefly API Templates
  - Firefly API Documentation
  - Firefly API Documentation Templates
---

# Firefly templates for content creation

This page explains the templates and boilerplate files that can be used to create content for Firefly Services documentation.

When creating new content, it can be difficult to face a blank page. It can help to start by considering two things: **audience** and **document type**.

Thinking about the audience, account for the user personas you expect to consume your content:

- What's their title and level of technical expertise?
- What task are they trying to accomplish?
- What's their level of familiarity with the topic, and does the content provide the details needed at that level?

Be sure content includes what users need to be successful in their task. When experience levels vary too widely, consider offering separate content catered to each user's expectations.

Thinking about the document type, we don't all need to be technical writers but a good starting point may be to familiarize yourself with helpful categories of content ([like in a Diataxis framework](https://diataxis.fr/start-here/)) and select a template that may best fit the content you're creating.

## Templates

Below are the available templates and instructions about their use.

### User guide

User guides explain how to use a specific feature or API and are collected in the `/guides/` folder of service documentation repos. In the Firefly program, two types of user guides are common: **Feature Guides** and **How-To Guides**.

**Feature guide template**

Firefly's APIs often offer services that are visually exciting. Endpoints or workflows that transform media in compelling ways can be showcased in feature guides. Consider including:

- High-quality examples of the transformed media, before and after
- Parameters and options that are essential to the transformation
- Implementation examples in a variety of helpful languages

**How-to guide template**

How-to guides explain how to accomplish a specific task with a specific API or feature. Consider including:

- A concise overview of the task
- Prerequisites for the task
- Step-by-step instructions
- Implementation examples in a variety of helpful languages

See the [ffs-user-guide.md](ffs-user-guide.md) template.

### Authentication page

Authentication pages explain how to authenticate requests to a specific API and are the typical content of the `index.md` file in the /getting-started/ folder.

This template is detailed boilerplate content that includes what's typical for Firefly Services authentication through Developer Console.
Be sure to update:

 - The title and description of the page
 - The API or feature name
 - The relevant scopes
 - The aliases for the environment variables

See the [ffs-auth-page.md](ffs-auth-page.md) template.

### Tutorial

Tutorials are comprehensive guides that walk users through a specific task with a specific API or feature.
Unlike guides, which  offer guidancew on individual tasks, tutorials provide a more comprehensive overview of the API or feature and the workflows that can be accomplished with it. Assets and media transformations should all be provided in detail so that the process of going through the content is educational rather than merely functional.

**Quickstart tutorial template**

In Firefly Services, quickstart tutorials are common. They are a great way to get users up and running with a specific API or feature quickly.
Consider including:

- Environment setup and configuration
- Credentials and API keys
- Provide the media assets that will be used in the tutorial
- Step-by-step instructions
See the [ffs-tutorial-template.md](ffs-tutorial-template.md) template.