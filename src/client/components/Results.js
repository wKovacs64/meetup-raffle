import React from 'react';
import PropTypes from 'prop-types';
import Winner from './Winner';

const Results = ({ winners, ...props }) => (
  <>
    {!!winners.length && (
      <div
        className="flex flex-wrap flex-shrink-0 justify-between justify-around-ns"
        {...props}
      >
        {winners.map(winner => (
          <Winner key={winner.profileURL} winner={winner} />
        ))}
      </div>
    )}
  </>
);

Results.propTypes = {
  winners: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      photoURL: PropTypes.string.isRequired,
      profileURL: PropTypes.string.isRequired,
    }),
  ),
};

Results.defaultProps = {
  winners: [],
};

Results.displayName = 'Results';

export default Results;
