import GitHubCorner from 'react-github-corner';

export default function Header() {
  return (
    <header className="bg-accent p-4">
      <GitHubCorner
        // bannerColor={theme.colors.text}
        href="https://github.com/wKovacs64/meetup-raffle"
        target="_blank"
        rel="noreferrer noopener"
      />
      <div className="flex items-center sm:h-[25vh] sm:justify-center">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)] sm:text-center sm:text-4xl md:text-5xl">
            <span role="img" aria-hidden>
              🤝
            </span>{' '}
            meetup-raffle{' '}
            <span role="img" aria-hidden>
              🎟️
            </span>
          </h1>
          <h2 className="text-sm font-bold sm:text-xl md:text-2xl">
            Draw raffle winners at your Meetup event
          </h2>
        </div>
      </div>
    </header>
  );
}
