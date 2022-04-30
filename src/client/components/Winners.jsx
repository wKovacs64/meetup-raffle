import PropTypes from 'prop-types';
import Winner from './Winner';

export default function Winners({ winners }) {
  return (
    <div className="flex flex-shrink-0 flex-wrap justify-between sm:justify-around">
      {winners.map((winner) => (
        <Winner key={winner.profileURL} winner={winner} />
      ))}
    </div>
  );
}

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
