import React, { Fragment } from 'react';
import Head from 'next/head';
import { Header, Form } from '../components';

export default () => (
  <Fragment>
    <Head>
      <link rel="stylesheet" href="/static/tachyons.css" />
      <script src="/static/lib.js" />
    </Head>
    <main className="sans-serif near-black">
      <Header className="ph3 ph4-m ph6-l pv3 bg-light-red" />
      <Form className="ph3 ph4-m ph6-l pv3 pv4-ns" />
    </main>
  </Fragment>
);
