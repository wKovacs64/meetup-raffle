import type { Config } from '@netlify/functions';
import { createRequestHandler } from 'react-router';

const requestHandler = createRequestHandler(
  () => import('virtual:react-router/server-build'),
  import.meta.env.MODE,
);

export default async (request: Request) => {
  return requestHandler(request);
};

export const config: Config = {
  path: '/*',
  preferStatic: true,
};
