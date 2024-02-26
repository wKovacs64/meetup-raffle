import userPlaceholderUrl from '~/images/user-placeholder.svg';
import type { Winner } from '~/types';

export default function Winners({ winners }: { winners: Winner[] }) {
  return (
    <div className="flex flex-shrink-0 flex-wrap justify-between sm:justify-around">
      {winners.map((winner) => (
        <a
          key={winner.profileURL}
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
                backgroundImage: `url(${winner.photoURL}), url('${userPlaceholderUrl}')`,
              }}
            />
            <div className="flex flex-grow flex-col items-center justify-center bg-white">
              <span className="p-4 text-center">{winner.name}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
