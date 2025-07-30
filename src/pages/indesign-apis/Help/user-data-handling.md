---
title: User Data Handling - InDesign API
description: Information about how user data is handled in InDesign APIs
---

# User Data Handling

Our primary focus is to ensure transparency in how we handle User Generated Content (UGC). Here is how different types of UGC are managed:

## 1. Input Assets (e.g., files submitted for processing)

- Stored temporarily on the local system during processing.
- Deleted immediately after processing is complete.

## 2. Processed Documents (Output Assets)

- If the user provides a pre-signed URL, the output is uploaded there.
- If not, the system uploads the output to a presigned url backed by our internal azure blob storage and retains it for 12 hours only.

## 3. Metadata

The system stores minimal metadata about:

- **Inputs**: source url and file size.
- **Outputs**: file name, size, and upload location.

This metadata is stored in the database.

## 4. Scripts

- Customer-submitted scripts are stored permanently.
- Users can view and delete their registered scripts at any time.

## 5. Security Measures

All data is stored and processed with appropriate security measures to prevent unauthorized access and ensure confidentiality. 