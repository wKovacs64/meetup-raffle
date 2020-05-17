/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx, css } from '@emotion/core';

const Winner = ({ winner }) => (
  <a
    className="flex flex-column dim link ba b--dark-blue dark-blue mb3 w4 shadow-5"
    href={winner.profileURL}
    target="_blank"
    rel="noopener noreferrer"
  >
    <span
      className="db bg-center cover h4"
      css={css`
        background-image: url(${winner.photoURL}), url('/user-placeholder.svg');
      `}
      role="img"
    />
    <div className="flex flex-grow-1 justify-center items-center bg-white">
      <span className="tc pa3">{winner.name}</span>
    </div>
  </a>
);

Winner.propTypes = {
  winner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    profileURL: PropTypes.string.isRequired,
  }).isRequired,
};

Winner.displayName = 'Winner';

export default Winner;
