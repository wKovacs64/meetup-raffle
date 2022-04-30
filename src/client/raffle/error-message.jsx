import PropTypes from 'prop-types';

export default function ErrorMessage({ title, subtitle, problemText }) {
  return (
    <section>
      <span className="text-xl font-bold">{title}</span>
      <p className="my-4">{subtitle}</p>
      <p className="my-4 bg-accent p-2 font-mono text-white">{problemText}</p>
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
