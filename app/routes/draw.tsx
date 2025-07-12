import { Link, data, useNavigation } from 'react-router';
import { z, ZodError } from 'zod';
import { meetupRandomizer } from '~/vendor/meetup-randomizer.server';
import { userSettingsCookie } from '~/core/cookies.server';
import { getEventFromResponseData } from '~/raffle/get-event-from-response-data';
import { getIdFromEvent } from '~/raffle/get-id-from-event';
import { LoadingSpinner } from '~/raffle/loading-spinner';
import Winners from '~/raffle/winners';
import ErrorMessage from '~/raffle/error-message';
import type { Winner } from '~/types';
import type { Route } from './+types/draw';

const formSchema = z.object({
  meetup: z.string().min(1),
  count: z.coerce.number().min(1).max(9),
});

export async function loader({ request }: Route.LoaderArgs) {
  let userSettings = request.headers.get('Cookie') ?? '';

  const { searchParams } = new URL(request.url);
  const formData = {
    meetup: searchParams.get('meetup') ?? '',
    count: searchParams.get('count') ?? '',
  };

  let meetup;
  let count;

  try {
    const validatedFormData = formSchema.parse(formData);
    count = validatedFormData.count;
    meetup = validatedFormData.meetup;
    userSettings = await userSettingsCookie.serialize(
      { meetup, count },
      {
        // 10 years
        expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000),
      },
    );
  } catch (err) {
    if (err instanceof ZodError) {
      console.error(z.prettifyError(err));
    }

    return dataWithCookie(
      {
        formData,
        errorMessage: 'Sorry, somehow the form was submitted with invalid data.',
      },
      userSettings,
    );
  }

  const eventUrl = `https://api.meetup.com/${encodeURIComponent(
    meetup,
  )}/events?status=upcoming&only=id,visibility`;

  const res = await fetch(eventUrl);

  // This case covers invalid Meetup group names as well as invalid event IDs.
  if (res.status === 404) {
    return dataWithCookie(
      {
        formData,
        errorMessage: "Sorry, I couldn't find any information on that.",
      },
      userSettings,
    );
  }

  const event = getEventFromResponseData((await res.json()) as unknown);

  if (!event) {
    return dataWithCookie(
      {
        formData,
        errorMessage: "Sorry, I couldn't find any upcoming events.",
      },
      userSettings,
    );
  }

  const eventId = getIdFromEvent(event);

  if (eventId === null) {
    return dataWithCookie(
      {
        formData,
        errorMessage: 'Sorry, their members list is private.',
      },
      userSettings,
    );
  }

  try {
    const winners: Winner[] = await meetupRandomizer.run(meetup, eventId, count);

    if (Array.isArray(winners) && winners.length) {
      return dataWithCookie(
        {
          formData,
          winners,
        },
        userSettings,
      );
    }
  } catch (err) {
    const isError = err instanceof Error;
    return dataWithCookie(
      {
        formData,
        errorMessage: isError ? err.message : 'Sorry, something went wrong.',
      },
      userSettings,
    );
  }

  return dataWithCookie(
    {
      formData,
      errorMessage: 'Sorry, we received unexpected data for that request.',
    },
    userSettings,
  );
}

function dataWithCookie<TData>(theData: Parameters<typeof data<TData>>[0], cookieString: string) {
  return data<TData>(theData, {
    headers: {
      'Set-Cookie': cookieString,
    },
  });
}

export default function DrawPage({ loaderData }: Route.ComponentProps) {
  const searchParams = new URLSearchParams({
    meetup: loaderData.formData.meetup,
    count: loaderData.formData.count,
  });

  if (useNavigation().state === 'loading') return <LoadingSpinner />;

  return (
    <div className="mt-4 sm:mt-8">
      {'winners' in loaderData ? (
        <Winners winners={loaderData.winners} />
      ) : 'errorMessage' in loaderData ? (
        <ErrorMessage problemText={loaderData.errorMessage} />
      ) : null}
      <div className="my-8 flex shrink-0 flex-wrap justify-around">
        <Link
          to=".."
          className="mb-4 w-full border border-solid border-current bg-white px-16 py-4 text-center font-bold shadow-lg hover:bg-gray-300 focus:bg-gray-300 sm:mb-0 sm:w-64 sm:text-xl"
          replace
        >
          Start Over
        </Link>
        <Link
          to={`.?${searchParams.toString()}`}
          className="w-full border border-solid border-current bg-white px-16 py-4 text-center font-bold shadow-lg hover:bg-gray-300 focus:bg-gray-300 sm:w-64 sm:text-xl"
          replace
        >
          Draw Again
        </Link>
      </div>
    </div>
  );
}
