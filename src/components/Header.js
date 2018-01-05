import React from 'react';
import GitHubCorner from 'react-github-corner';

export default () => (
  <header className="ph3 pv3 bg-light-red">
    <GitHubCorner
      href="https://github.com/wKovacs64/meetup-raffle-web"
      octoColor="#f4f4f4"
      bannerColor="#111"
    />
    <div className="dt vh-25-ns center-ns">
      <div className="dtc v-mid">
        <h1 className="f3 f2-m f1-l ma0 lh-title near-white">
          <span role="img" aria-label="meeting">
            🤝
          </span>{' '}
          meetup-raffle{' '}
          <span role="img" aria-label="ticket">
            🎟️
          </span>
        </h1>
        <h3 className="f6 f4-m f3-l ma0 lh-title">
          Draw raffle winners at your Meetup event
        </h3>
      </div>
    </div>
  </header>
);
