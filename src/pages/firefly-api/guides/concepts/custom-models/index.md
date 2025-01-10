---
title: Custom Models
description: Use Custom Models to generate image variations that align with your brand
keywords:

contributors:
  - https://github.com/bishoysefin
hideBreadcrumbNav: true
---

# Custom Models

Use Firefly Custom Models to generate brand-aligned image variations at scale.

## Overview

This documentation explains concepts relevant to the Adobe Firefely Custom Models API. With Custom Models, you can capture and replicate distinctive brand aesthetics, characters, objects, or compositional arrangements. Once trained, these models can be referenced when generating new images—helping you scale brand-consistent visuals while reducing manual effort.

## Training Modes

Custom Models can be set to learn different aspects of visual design:

* **Subject Models:** Focus on representing specific characters, products, or objects. For example, if your brand features a mascot, a subject model ensures that this mascot is accurately depicted in any scenario.

* **Style Models:** Emphasize aesthetic qualities like color palettes, patterns, brush stroke techniques, or illustrative cues. This ensures that all generated visuals share a consistent, recognizable style aligned with your brand’s look and feel.

## Asset IDs

Custom Models are stored as assets in a Digital Asset Management (DAM) system, enabling easy organization, versioning, and reuse. Each custom model is assigned a unique Asset ID. This identifier is key to:

- **Referencing in Image Generation:** By providing the Asset ID in your API requests, you ensure that the generated images originate from the appropriate model’s learned characteristics.
- **Version Control and Tracking:** Asset IDs enable you to manage multiple models, track updates, and maintain a clear record of various styles, subjects, or structures you’ve captured over time.
