import type { AppLoadContext, EntryContext } from '@remix-run/node';
import { handleRequest as handleNetlifyRequest } from '@netlify/remix-adapter';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext,
) {
  responseHeaders.set('X-Content-Type-Options', 'nosniff');
  responseHeaders.set('X-Frame-Options', 'DENY');
  responseHeaders.set('X-XSS-Protection', '1; mode=block');
  responseHeaders.set('Expect-CT', 'enforce, max-age=3600');
  responseHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  responseHeaders.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload',
  );
  responseHeaders.set(
    'Content-Security-Policy',
    [
      `base-uri 'none'`,
      `frame-ancestors 'none'`,
      `form-action 'self'`,
      `default-src 'self'`,
      `connect-src 'self' ws: https://secure.meetupstatic.com https://cloudflare-ipfs.com`,
      `img-src 'self' data: https:`,
      `object-src 'none'`,
      `script-src 'self' 'unsafe-inline'`,
      `style-src 'self' 'unsafe-inline'`,
      `worker-src 'self'`,
    ].join('; ') + ';',
  );
  responseHeaders.set(
    'Permissions-Policy',
    [
      'geolocation=()',
      'camera=()',
      'microphone=()',
      'payment=()',
      'usb=()',
    ].join(', '),
  );

  return handleNetlifyRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext,
    loadContext,
  );
}
