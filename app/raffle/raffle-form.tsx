import { useFetcher } from '@remix-run/react';
import { useDevTools } from '~/dev-tools/dev-tools-context';
import LoadingSpinner from '~/raffle/loading-spinner';
import CountStepper from '~/raffle/count-stepper';
import Winners from '~/raffle/winners';
import ResetButtons from '~/raffle/reset-buttons';
import ErrorMessage from '~/raffle/error-message';
import type { UserSettings } from '~/core/cookies..server';
import type { Winner } from '~/types';

type ActionData = { formData: { count: string; meetup: string } } & (
  | { errorMessage: string; winners: never }
  | { errorMessage: never; winners: Winner[] }
);

export default function RaffleForm({ onReset, userSettings }: RaffleFormProps) {
  const [devSettings] = useDevTools();
  const mockCheckboxValue = devSettings?.mock ? 'true' : '';
  const defaultMeetup = userSettings?.meetup ?? '';
  const defaultCount = userSettings?.count ?? '1';
  const drawFetcher = useFetcher<ActionData>();

  const handleRetry = () => {
    if (drawFetcher.data?.formData) {
      drawFetcher.submit(
        { ...drawFetcher.data.formData, mock: mockCheckboxValue },
        { method: 'post' },
      );
    }
  };

  if (drawFetcher.state === 'submitting' || drawFetcher.state === 'loading') {
    return <LoadingSpinner />;
  }

  if (drawFetcher.state === 'idle' && drawFetcher.data) {
    return (
      <div className="mt-4 sm:mt-8">
        {drawFetcher.data?.winners && (
          <Winners winners={drawFetcher.data.winners} />
        )}
        {drawFetcher.data?.errorMessage && (
          <ErrorMessage problemText={drawFetcher.data.errorMessage} />
        )}
        <ResetButtons onReset={onReset} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <main className="mx-auto w-full max-w-3xl px-4">
        <drawFetcher.Form method="post">
          <div className="mt-4 mb-8 sm:mt-8">
            <label
              className="block cursor-pointer text-xl text-primary sm:text-2xl"
              htmlFor="meetup"
            >
              Meetup name (from your URL):
            </label>
            <input
              className="mt-4 w-full border-8 border-gray-300 p-2 text-xl sm:text-2xl"
              type="text"
              id="meetup"
              name="meetup"
              defaultValue={defaultMeetup}
              onFocus={(e) => {
                e.target.select();
              }}
              placeholder="required"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              required
            />
          </div>
          <div className="my-8 flex flex-col items-center sm:flex-row sm:items-end sm:justify-around">
            <CountStepper
              inputId="count"
              inputName="count"
              defaultValue={defaultCount}
              labelText="Number of winners:"
              min={1}
              max={9}
            />
            <div className="my-8 w-full sm:my-0 sm:w-auto">
              <button
                className="w-full border border-solid border-current bg-white py-4 px-16 font-bold shadow-lg hover:bg-gray-300 focus:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 sm:w-64 sm:text-xl"
                type="submit"
              >
                Draw
              </button>
            </div>
          </div>
          <input type="hidden" name="mock" value={mockCheckboxValue} />
        </drawFetcher.Form>
      </main>
    </div>
  );
}

interface RaffleFormProps {
  onReset: () => void;
  userSettings: UserSettings | null;
}
