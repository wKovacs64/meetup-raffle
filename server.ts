import * as build from '@remix-run/dev/server-build';
import { createRequestHandler } from '@netlify/remix-adapter';
import { installGlobals } from '@remix-run/node';
import sourceMapSupport from 'source-map-support';

sourceMapSupport.install();
installGlobals();

export const handler = createRequestHandler({
  // @ts-ignore
  build,
  mode: build.mode,
});
