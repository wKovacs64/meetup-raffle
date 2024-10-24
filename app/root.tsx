import * as React from 'react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  useRouteError,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { useSWEffect } from '@remix-pwa/sw';
import appStylesHref from '~/styles/app.css?url';
import faviconIcoUrl from '~/images/favicon.ico';
import icon32Url from '~/images/icon-32x32.png';
import icon512Url from '~/images/icon-512x512.png';
import appleTouchIconUrl from '~/images/apple-touch-icon.png';
import Header from '~/core/header';
import ErrorMessage from '~/raffle/error-message';

export const meta: MetaFunction = () => {
  const appName = 'M. Raffle';
  const title = 'Meetup Raffle';
  const description = 'Draw raffle winners at your Meetup event.';
  const themeColor = '#ff4136';
  const socialImageUrl = icon512Url;
  const socialImageAlt = 'A white raffle ticket against a red background';

  return [
    { title },
    { name: 'description', content: description },
    { name: 'application-name', content: appName },
    { name: 'apple-mobile-web-app-title', content: appName },
    { name: 'msapplication-TileColor', content: themeColor },
    { name: 'theme-color', content: themeColor },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: socialImageUrl },
    { property: 'og:image:alt', content: socialImageAlt },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: socialImageUrl },
    { name: 'twitter:image:alt', content: socialImageAlt },
  ];
};

export const links: LinksFunction = () => [
  { rel: 'icon', sizes: 'any', href: faviconIcoUrl },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: icon32Url },
  { rel: 'apple-touch-icon', sizes: '180x180', href: appleTouchIconUrl },
  { rel: 'manifest', href: '/manifest.webmanifest' },
  { rel: 'stylesheet', href: appStylesHref },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100 text-slate-900">
        <Header />
        <main className="mx-auto w-full max-w-3xl px-4">{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useSWEffect();

  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  // TODO: may need `isRouteErrorResponse` here in the future

  // eslint-disable-next-line no-console
  console.error(error);
  const message = error instanceof Error ? error.message : 'Unknown Error';

  return (
    <div className="my-4 sm:my-8">
      <div className="flex flex-col gap-8 sm:gap-16">
        <ErrorMessage
          title="😬"
          subtitle="How embarrassing for us, something unexpected happened:"
          problemText={message}
        />
        <Link to="." className="text-center text-blue-600 underline" reloadDocument>
          Reload the page to start over.
        </Link>
      </div>
    </div>
  );
}
