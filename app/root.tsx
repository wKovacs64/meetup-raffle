import * as React from 'react';
import { Link, useLocation, useMatches } from '@remix-run/react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
// @ts-ignore
import faviconIcoUrl from '../public/favicon.ico';
import icon32Url from '~/images/icon-32x32.png';
import appleTouchIconUrl from '~/images/apple-touch-icon.png';
import appStylesUrl from '~/styles/app.generated.css';
import Header from '~/core/header';
import { DevToolsProvider } from '~/dev-tools/dev-tools-context';
import DevToolsPanel from '~/dev-tools/dev-tools-panel';

// HACK: this is a workaround for Remix issue 3414
import icon192Url from '~/images/icon-192x192.png';
import icon512Url from '~/images/icon-512x512.png';
import ErrorMessage from './raffle/error-message';
// you must "use" the imported URL for this hack or the assets won't be built
console.assert(typeof icon192Url === 'string');
console.assert(typeof icon512Url === 'string');
// END HACK

export const meta: MetaFunction = () => {
  const appName = 'M. Raffle';
  const title = 'Meetup Raffle';
  const description = 'Draw raffle winners at your Meetup event.';
  const themeColor = '#ff4136';
  const socialImageUrl = icon512Url;
  const socialImageAlt = 'A white raffle ticket against a red background';

  return {
    charset: 'utf-8',
    title: title,
    description: description,
    viewport: 'width=device-width,initial-scale=1',
    'og:type': 'website',
    'og:title': title,
    'og:description': description,
    'og:image': socialImageUrl,
    'og:image:alt': socialImageAlt,
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': socialImageUrl,
    'twitter:image:alt': socialImageAlt,
    'application-name': appName,
    'apple-mobile-web-app-title': appName,
    'msapplication-TileColor': themeColor,
    'theme-color': themeColor,
  };
};

export const links: LinksFunction = () => [
  { rel: 'icon', sizes: 'any', href: faviconIcoUrl },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: icon32Url },
  { rel: 'apple-touch-icon', sizes: '180x180', href: appleTouchIconUrl },
  { rel: 'manifest', href: '/manifest.webmanifest' },
  { rel: 'stylesheet', href: appStylesUrl },
];

export default function App() {
  const location = useLocation();
  const matches = useMatches();
  const isMountRef = React.useRef(true);

  // credit: ShafSpecs/remix-pwa
  React.useEffect(() => {
    const isMount = isMountRef.current;
    isMountRef.current = false;
    if ('serviceWorker' in navigator) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller?.postMessage({
          type: 'REMIX_NAVIGATION',
          isMount,
          location,
          matches,
          manifest: window.__remixManifest,
        });
      } else {
        let listener = async () => {
          await navigator.serviceWorker.ready;
          navigator.serviceWorker.controller?.postMessage({
            type: 'REMIX_NAVIGATION',
            isMount,
            location,
            matches,
            manifest: window.__remixManifest,
          });
        };
        navigator.serviceWorker.addEventListener('controllerchange', listener);
        return () => {
          navigator.serviceWorker.removeEventListener(
            'controllerchange',
            listener,
          );
        };
      }
    }
  }, [location, matches]);

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100 text-slate-900">
        <Header />
        <DevToolsProvider>
          <main className="mx-auto w-full max-w-3xl">{children}</main>
          {process.env.NODE_ENV === 'development' && <DevToolsPanel />}
        </DevToolsProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <RootLayout>
      <div className="my-4 sm:my-8">
        <div className="flex flex-col gap-8 sm:gap-16">
          <ErrorMessage
            title="😬"
            subtitle="How embarrassing for us, something unexpected happened:"
            problemText={error.message}
          />
          <Link
            to="."
            className="text-center text-blue-600 underline"
            reloadDocument
          >
            Reload the page to start over.
          </Link>
        </div>
      </div>
    </RootLayout>
  );
}
