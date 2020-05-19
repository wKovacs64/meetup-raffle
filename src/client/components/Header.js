import React from 'react';
import GitHubCorner from 'react-github-corner';

const Header = () => {
  return (
    <header className="ph3 pv3 bg-light-red">
      <GitHubCorner
        bannerColor="#111"
        href="https://github.com/wKovacs64/meetup-raffle"
        target="_blank"
        rel="noreferrer noopener"
      />
      <div className="dt vh-25-ns center-ns">
        <div className="dtc v-mid">
          <h1 className="f3 f2-m f1-l ma0 lh-title white tc-ns">
            <span role="img" aria-hidden>
              🤝
            </span>{' '}
            meetup-raffle{' '}
            <span role="img" aria-hidden>
              🎟️
            </span>
          </h1>
          <h2 className="f6 f4-m f3-l ma0 lh-title">
            Draw raffle winners at your Meetup event
          </h2>
        </div>
      </div>
    </header>
  );
};

Header.displayName = 'Header';

export default Header;
