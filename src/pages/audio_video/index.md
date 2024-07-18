---
title: Overview - Adobe Audio & Video APIs
description: An overview of the Adobe Audio & Video APIs
keywords:
  - Adobe Firefly Services
  - Audio API
  - Video API
  - Firefly Developer documentation
  - Adobe Audio API documentation
  - Adobe Video API documentation
  - Generative AI
  - Enhance Speech API
  - Application development with Firefly
  - Adobe Firefly
  - Firefly software development kit (SDK)
  - JavaScript framework
contributors:
  - https://github.com/hollyschinsky
  - https://github.com/nimithajalal
hideBreadcrumbNav: true
---

<Hero slots="heading, text" background="rgb(88, 93, 232)"/>

# Adobe Audio & Video APIs - Firefly Services

Introducing the Adobe Audio and Video APIs, a powerful suite of tools that equip developers with cutting-edge audio and video editing capabilities.

## Introduction

The Adobe Audio and Video APIs offer a comprehensive suite of tools designed to empower developers with advanced audio and video editing capabilities. These APIs are designed to easily integrate generative AI into your audio and video editing workflows, enabling rich workflow automation. 

## Adobe Audio APIs

The Enhance Speech API, part of the Audio and Video APIs, allows you to enhance voice recordings to studio quality, scale content production with higher quality and faster time to market, and eliminate tedious and manual work in audio production. 

The Adobe Audio APIs in Firefly Services are broadly divided into two categories: 

- Assets
- Speech enhancement

Assets provide you with endpoints such as, 

- **Create an Asset**: Create an asset, an audio file to be enhanced on Amazon S3. 
- **Show the asset**: This endpoint retrieves the details of the asset created using create an asset.
- **Delete an asset**: Allows you to delete the asset created using create an asset. This action will also delete any enhancements made using this asset from S3. 

Speech enhancement provides you with endpoints such as,

- **Create a speech enhancement**: Performs audio enhancement for the created asset. 
- **Get a speech enhancement**: Retrieve information about a speech enhancement for an asset. 

### Features

- Enhance audio
- Support for pre-signed S3 URLs for uploading audio files. 
- Adjust strength for a more natural sound
- Seamless integration of other Firefly services, facilitating a smooth workflow for users.

### Use Cases

- Podcast Editing
- Enhance Music Post Production
- **Audio Restoration**: Create tools for restoring and enhancing old or damaged audio recordings.
- **Interactive Audio Experiences**: Build applications that provide immersive audio experiences, such as interactive storytelling and virtual reality audio.

Check out the [Getting Started Guide](./audio/) for a step-by-step walkthrough of using the Adobe Audio APIs.

## Adobe Video APIs

<InlineAlert slots="text" />

The Adobe Video APIs are currently in private beta, with plans to be released soon.

While the Adobe Audio APIs are currently available and offer robust audio editing capabilities, the Video APIs are on the horizon and promise equally powerful video editing functionalities. 

Stay tuned for the upcoming release of the Adobe Video APIs to expand your multimedia development toolkit further.

## Discover

<DiscoverBlock slots="link, text" width="33%"/>

[Getting Started with Audio Services](./audio/)

A step-by-step guide to getting started with the Adobe Audio APIs.

<DiscoverBlock slots="link, text" width="33%"/>

[Getting Started with Video Services](./video/)

A step-by-step guide to getting started with the Adobe Video APIs (coming soon).

<DiscoverBlock slots="link, text" width="33%"/>

[Try the Audio Services APIs](./audio/api/)

Try the Adobe Audio APIs.

<DiscoverBlock slots="link, text" width="33%"/>

[Try the Video Services APIs](./video/index.md)

Try the Adobe Video APIs (coming soon).

<br/><br/><br/><br/>
