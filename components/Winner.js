import React from 'react';
import PropTypes from 'prop-types';

const Winner = ({ winner }) => (
  <a
    className="flex flex-column dim link ba b--dark-blue dark-blue mb3 w4 shadow-5"
    href={winner.profileURL}
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="db bg-center cover h4" role="img">
      <style jsx>
        {`
          background-image: url(${winner.photoURL});
        `}
      </style>
    </span>
    <div className="flex flex-grow-1 justify-center items-center">
      <span className="tc pa3">{winner.name}</span>
    </div>
  </a>
);

Winner.propTypes = {
  winner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    profileURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default Winner;
