import * as React from 'react';
import { useRouteError, Link, Links, Outlet, Scripts, ScrollRestoration } from 'react-router';
import appStylesHref from '~/styles/app.css?url';
import faviconIcoUrl from '~/images/favicon.ico';
import icon32Url from '~/images/icon-32x32.png';
import icon512Url from '~/images/icon-512x512.png';
import appleTouchIconUrl from '~/images/apple-touch-icon.png';
import Header from '~/core/header';
import ErrorMessage from '~/raffle/error-message';
import type { Route } from './+types/root';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', sizes: 'any', href: faviconIcoUrl },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: icon32Url },
  { rel: 'apple-touch-icon', sizes: '180x180', href: appleTouchIconUrl },
  { rel: 'manifest', href: '/manifest.webmanifest' },
  { rel: 'stylesheet', href: appStylesHref },
];

const APP_NAME = 'M. Raffle';
const TITLE = 'Meetup Raffle';
const DESCRIPTION = 'Draw raffle winners at your Meetup event.';
const THEME_COLOR = '#ff4136';
const SOCIAL_IMAGE_URL = icon512Url;
const SOCIAL_IMAGE_ALT = 'A white raffle ticket against a red background';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{TITLE}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content={DESCRIPTION} />
        <meta name="application-name" content={APP_NAME} />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />
        <meta name="msapplication-TileColor" content={THEME_COLOR} />
        <meta name="theme-color" content={THEME_COLOR} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={SOCIAL_IMAGE_URL} />
        <meta property="og:image:alt" content={SOCIAL_IMAGE_ALT} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={SOCIAL_IMAGE_URL} />
        <meta name="twitter:image:alt" content={SOCIAL_IMAGE_ALT} />
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
  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      void navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  // TODO: may need `isRouteErrorResponse` here in the future

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
