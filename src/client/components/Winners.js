/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx, Flex } from 'theme-ui';
import Winner from './Winner';

const Winners = ({ winners, ...props }) => {
  return (
    <Flex
      sx={{
        flexWrap: 'wrap',
        flexShrink: 0,
        justifyContent: ['space-between', 'space-around'],
      }}
      {...props}
    >
      {winners.map((winner) => (
        <Winner key={winner.profileURL} winner={winner} />
      ))}
    </Flex>
  );
};

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
