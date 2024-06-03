import { Form } from '@remix-run/react';
import CountStepper from '~/raffle/count-stepper';

export default function RaffleForm({ defaultMeetup, defaultCount }: RaffleFormProps) {
  return (
    <div className="flex flex-col">
      <Form method="get" action="draw">
        <div className="mb-8 mt-4 sm:mt-8">
          <label className="block cursor-pointer text-xl text-primary sm:text-2xl" htmlFor="meetup">
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
              className="w-full border border-solid border-current bg-white px-16 py-4 font-bold shadow-lg hover:bg-gray-300 focus:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 sm:w-64 sm:text-xl"
              type="submit"
            >
              Draw
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

interface RaffleFormProps {
  defaultMeetup: string;
  defaultCount: string;
}
