import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'emotion';

const Winner = ({ winner }) => {
  const bgImg = css`
    background-image: url(${winner.photoURL}), url('/user-placeholder.svg');
  `;

  return (
    <a
      className="flex flex-column dim link ba b--dark-blue dark-blue mb3 w4 shadow-5"
      href={winner.profileURL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={cx('db bg-center cover h4', bgImg)} role="img" />
      <div className="flex flex-grow-1 justify-center items-center bg-white">
        <span className="tc pa3" data-testid="name">
          {winner.name}
        </span>
      </div>
    </a>
  );
};

Winner.propTypes = {
  winner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    profileURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default Winner;
