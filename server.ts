import * as build from '@remix-run/dev/server-build';
import { createRequestHandler } from '@netlify/remix-adapter';

const handler = createRequestHandler({
  build,
  mode: build.mode,
});

export default handler;
