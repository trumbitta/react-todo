/** @format */

// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
};

export const apiBaseHost = 'http://localhost:3333';
export const apiBaseUrl = [apiBaseHost, 'api', 'v1'].join('/');
