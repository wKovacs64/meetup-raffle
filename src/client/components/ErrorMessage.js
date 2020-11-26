/** @jsxImportSource theme-ui */
import { Text } from 'theme-ui';
import PropTypes from 'prop-types';

function ErrorMessage({ title, subtitle, problemText, ...props }) {
  return (
    <section {...props}>
      <Text as="span" sx={{ fontSize: 3, fontWeight: 'bold' }}>
        {title}
      </Text>
      <Text as="p" sx={{ my: 3 }}>
        {subtitle}
      </Text>
      <Text
        as="p"
        sx={{
          my: 3,
          p: 2,
          color: 'title',
          bg: 'accent',
          fontFamily: 'monospace',
        }}
      >
        {problemText}
      </Text>
    </section>
  );
}

ErrorMessage.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  problemText: PropTypes.string,
};

ErrorMessage.defaultProps = {
  title: 'Oops!',
  subtitle: 'An error was encountered:',
  problemText: 'Unknown.',
};

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
