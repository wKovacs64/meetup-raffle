import { json } from '@remix-run/node';
import icon192Url from '~/images/icon-192x192.png';
import icon512Url from '~/images/icon-512x512.png';

export const loader = async () => {
  return json(
    {
      short_name: 'M. Raffle',
      name: 'Meetup Raffle',
      lang: 'en-US',
      start_url: '/',
      display: 'standalone',
      theme_color: '#ff4136',
      background_color: '#f4f4f4',
      icons: [
        {
          src: icon192Url,
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: icon512Url,
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'Content-Type': 'application/manifest+json',
      },
    },
  );
};
