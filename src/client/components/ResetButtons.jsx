import PropTypes from 'prop-types';

function ResetButtons({ onReset, onRetry }) {
  return (
    <div className="my-8 flex flex-shrink-0 flex-wrap justify-around">
      <button
        className="mb-4 w-full border border-solid border-current bg-white py-4 px-16 font-bold shadow-lg hover:bg-gray-300 focus:bg-gray-300 sm:mb-0 sm:w-64 sm:text-xl"
        type="button"
        onClick={onReset}
      >
        Start Over
      </button>
      <button
        className="w-full border border-solid border-current bg-white py-4 px-16 font-bold shadow-lg hover:bg-gray-300 focus:bg-gray-300 sm:w-64 sm:text-xl"
        type="button"
        onClick={onRetry}
      >
        Draw Again
      </button>
    </div>
  );
}

ResetButtons.propTypes = {
  onReset: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
};

ResetButtons.displayName = 'ResetButtons';

export default ResetButtons;
