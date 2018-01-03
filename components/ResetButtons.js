import React from 'react';
import PropTypes from 'prop-types';

const ResetButtons = ({ onReset, onSubmit }) => (
  <div className="flex flex-wrap justify-around mt4">
    <button
      className="w-100 w5-ns f5 f4-ns b input-reset ba near-black b--near-black bg-transparent hover-bg-moon-gray pointer ph5 pv3 mb3 mb0-l shadow-5"
      type="button"
      onClick={onReset}
    >
      Reset
    </button>
    <button
      className="w-100 w5-ns f5 f4-ns b input-reset ba near-black b--near-black bg-transparent hover-bg-moon-gray pointer ph5 pv3 mb3 mb0-l shadow-5"
      type="button"
      onClick={onSubmit}
    >
      Draw Again
    </button>
  </div>
);

ResetButtons.propTypes = {
  onReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ResetButtons;
