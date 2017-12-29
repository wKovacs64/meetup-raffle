import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, Winner } from '.';

const Results = ({ onReset, onSubmit, error, winners }) => (
  <Fragment>
    {error && <ErrorMessage problemText={error} />}
    {!error &&
      !!winners.length && (
        <div className="flex flex-wrap justify-between justify-around-ns">
          {winners.map(winner => (
            <Winner key={winner.profileURL} winner={winner} />
          ))}
        </div>
      )}
    <div className="flex flex-wrap justify-around pt3 pt4-m pt5-l">
      <button
        className="w-100 w5-ns f5 f4-ns b input-reset ba near-black b--near-black bg-transparent hover-bg-moon-gray pointer ph5 pv3 mv2 shadow-5"
        type="button"
        onClick={onReset}
      >
        Reset
      </button>
      <button
        className="w-100 w5-ns f5 f4-ns b input-reset ba near-black b--near-black bg-transparent hover-bg-moon-gray pointer ph5 pv3 mv2 shadow-5"
        type="button"
        onClick={onSubmit}
      >
        Draw Again
      </button>
    </div>
  </Fragment>
);

Results.propTypes = {
  onReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  winners: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      photoURL: PropTypes.string.isRequired,
      profileURL: PropTypes.string.isRequired,
    }),
  ),
};

Results.defaultProps = {
  error: '',
  winners: [],
};

export default Results;
