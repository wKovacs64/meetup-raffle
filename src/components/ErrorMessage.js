import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({
  title,
  titleClasses,
  subtitle,
  subtitleClasses,
  problemText,
  problemTextClasses,
  ...props
}) => (
  <section {...props}>
    <span className={titleClasses}>{title}</span>
    <p className={subtitleClasses}>{subtitle}</p>
    <p className={problemTextClasses}>{problemText}</p>
  </section>
);

ErrorMessage.propTypes = {
  title: PropTypes.string,
  titleClasses: PropTypes.string,
  subtitle: PropTypes.string,
  subtitleClasses: PropTypes.string,
  problemText: PropTypes.string,
  problemTextClasses: PropTypes.string,
};

ErrorMessage.defaultProps = {
  title: 'Oops!',
  titleClasses: 'f4 b',
  subtitle: 'An error was encountered:',
  subtitleClasses: '',
  problemText: 'Unknown.',
  problemTextClasses: 'bg-red white courier pa2',
};

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
