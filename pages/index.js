import React, { Fragment } from 'react';
import Head from 'next/head';
import { Header, RaffleContainer } from '../components';

export default () => (
  <Fragment>
    <Head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>meetup-raffle</title>
      <link rel="stylesheet" href="/static/tachyons.min.css" />
    </Head>
    <main className="sans-serif near-black">
      <Header />
      <RaffleContainer />
    </main>
    <script src="/static/lib.min.js" />
  </Fragment>
);
