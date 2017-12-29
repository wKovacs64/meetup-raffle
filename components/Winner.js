import React from 'react';
import PropTypes from 'prop-types';

const Winner = ({ winner }) => (
  <a
    className="dim link ba b--dark-blue dark-blue mb3 w4 shadow-5"
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
    <p className="tc">{winner.name}</p>
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
