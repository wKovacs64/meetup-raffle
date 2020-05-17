import React from 'react';
import PropTypes from 'prop-types';
import Winner from './Winner';

const Winners = ({ winners, ...props }) => (
  <React.Fragment>
    {!!winners.length && (
      <div
        className="flex flex-wrap flex-shrink-0 justify-between justify-around-ns"
        {...props}
      >
        {winners.map((winner) => (
          <Winner key={winner.profileURL} winner={winner} />
        ))}
      </div>
    )}
  </React.Fragment>
);

Winners.propTypes = {
  winners: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      photoURL: PropTypes.string,
      profileURL: PropTypes.string.isRequired,
    }),
  ),
};

Winners.defaultProps = {
  winners: [],
};

Winners.displayName = 'Winners';

export default Winners;
