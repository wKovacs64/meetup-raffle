import { SpinnerRoundOutlined } from 'spinners-react';

export default function LoadingSpinner() {
  return (
    <div className="mt-4 flex flex-shrink-0 flex-grow flex-wrap items-center justify-center sm:mt-8 sm:items-start">
      <div className="h-32 w-32 text-primary" data-testid="loading">
        <SpinnerRoundOutlined size={128} color="currentColor" />
      </div>
    </div>
  );
}
