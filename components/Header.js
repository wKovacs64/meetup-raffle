import React from 'react';

export default props => (
  <header {...props}>
    <div className="dt vh-25-ns">
      <div className="dtc v-mid">
        <h2 className="f3 f2-ns ma0 lh-title near-white">
          <span role="img" aria-label="meeting">
            🤝
          </span>{' '}
          meetup-raffle{' '}
          <span role="img" aria-label="ticket">
            🎟️
          </span>
        </h2>
        <h3 className="f6 f4-m f3-l ma0 lh-title">
          Draw raffle winners at your Meetup event
        </h3>
      </div>
    </div>
  </header>
);
