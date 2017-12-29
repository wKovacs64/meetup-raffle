import React, { Fragment } from 'react';
import Head from 'next/head';
import { Header, RaffleContainer } from '../components';

export default () => (
  <Fragment>
    <Head>
      <link rel="stylesheet" href="/static/tachyons.css" />
      <script src="/static/lib.js" />
    </Head>
    <main className="sans-serif near-black">
      <Header />
      <RaffleContainer />
    </main>
  </Fragment>
);
