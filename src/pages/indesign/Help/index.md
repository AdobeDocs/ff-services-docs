# Help

## API known limitations

InDesign APIs currently only support these storage types for assets:

  - AWS S3

  - Dropbox

  - Azure

## API retry

 For reliability and stability, we've added a retry mechanism for all API calls. Here are some recommendations around how to handle a retry:

  - Only retry requests that have a 5xx response code. A 5xx error response indicates there was a problem processing the request on the server. DO not retry requests for any other response code.

  - Implement an exponential back-off retry strategy with 3 retry attempts.

## Allowed origins and domains

Only a specific set of origins/domains are supported. 

Please reach out to Adobe in order to whitelist any alternative origins/domains you may be using.
