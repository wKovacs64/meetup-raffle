import PropTypes from 'prop-types';

export default function Winner({ winner }) {
  return (
    <a
      href={winner.profileURL}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-4 w-32 border border-solid border-primary shadow-lg hover:opacity-50 focus:opacity-50"
    >
      <div className="flex h-full flex-col">
        <div
          className="aspect-square bg-cover bg-center bg-no-repeat"
          role="img"
          // TODO: is there a way to do this with Tailwind? 🤔
          style={{
            backgroundImage: `url(${winner.photoURL}), url('/user-placeholder.svg')`,
          }}
        />
        <div className="flex flex-grow flex-col items-center justify-center bg-white">
          <span className="p-4 text-center">{winner.name}</span>
        </div>
      </div>
    </a>
  );
}

Winner.propTypes = {
  winner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    profileURL: PropTypes.string.isRequired,
  }).isRequired,
};
