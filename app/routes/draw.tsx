import { json, type LoaderArgs } from '@remix-run/node';
import { Link, useLoaderData, useTransition } from '@remix-run/react';
import { z, ZodError } from '~/vendor/zod.server';
import { meetupRandomizer } from '~/vendor/meetup-randomizer.server';
import { mocksServer } from '~/mocks/mocks-server.server';
import { useDevTools } from '~/dev-tools/dev-tools-context';
import { userSettingsCookie } from '~/core/cookies.server';
import { getEventFromResponseData } from '~/raffle/get-event-from-response-data';
import { getIdFromEvent } from '~/raffle/get-id-from-event';
import LoadingSpinner from '~/raffle/loading-spinner';
import Winners from '~/raffle/winners';
import ErrorMessage from '~/raffle/error-message';
import type { UpcomingEvent, Winner } from '~/types';

export async function loader({ request }: LoaderArgs) {
  const formSchema = z.object({
    count: z.string().refine(
      (value) => {
        const valueAsNumber = Number.parseInt(value, 10);
        const isNumber = !Number.isNaN(valueAsNumber);
        const isInRange = valueAsNumber > 0 && valueAsNumber < 10;
        return isNumber && isInRange;
      },
      {
        message: 'Count must be a number between 1 and 9',
      },
    ),
    meetup: z.string().min(1, 'Meetup name is required'),
    mock: z.nullable(z.literal('true')),
  });

  let userSettings = request.headers.get('Cookie') ?? '';

  const { searchParams } = new URL(request.url);
  const formData = {
    meetup: searchParams.get('meetup') ?? '',
    count: searchParams.get('count') ?? '',
    mock: searchParams.get('mock'),
  };

  let meetup;
  let count;
  let shouldMock;

  try {
    const validatedFormData = formSchema.parse(formData);
    count = validatedFormData.count;
    meetup = validatedFormData.meetup;
    shouldMock = Boolean(validatedFormData.mock);
    userSettings = await userSettingsCookie.serialize(
      { meetup, count },
      {
        // 10 years
        expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000),
      },
    );
  } catch (err) {
    if (err instanceof ZodError) console.error(JSON.stringify(err.issues));
    return json(
      {
        formData,
        errorMessage:
          'Sorry, somehow the form was submitted with invalid data.',
      },
      {
        headers: {
          'Set-Cookie': userSettings,
        },
      },
    );
  }

  // start the mocks server (if requested) to intercept Meetup API calls
  if (shouldMock) mocksServer.listen({ onUnhandledRequest: 'bypass' });

  const eventUrl = `https://api.meetup.com/${encodeURIComponent(
    meetup,
  )}/events?status=upcoming&only=id,visibility`;

  const res = await fetch(eventUrl);

  // This case covers invalid Meetup group names as well as invalid event IDs.
  if (res.status === 404) {
    if (shouldMock) mocksServer.close();
    return json(
      {
        formData,
        errorMessage: "Sorry, I couldn't find any information on that.",
      },
      {
        headers: {
          'Set-Cookie': userSettings,
        },
      },
    );
  }

  const data: UpcomingEvent | Array<UpcomingEvent> = await res.json();
  const event = getEventFromResponseData(data);

  if (!event) {
    if (shouldMock) mocksServer.close();
    return json(
      {
        formData,
        errorMessage: "Sorry, I couldn't find any upcoming events.",
      },
      {
        headers: {
          'Set-Cookie': userSettings,
        },
      },
    );
  }

  const eventId = getIdFromEvent(event);

  if (eventId === null) {
    if (shouldMock) mocksServer.close();
    return json(
      {
        formData,
        errorMessage: 'Sorry, their members list is private.',
      },
      {
        headers: {
          'Set-Cookie': userSettings,
        },
      },
    );
  }

  try {
    const winners: Array<Winner> = await meetupRandomizer.run(
      meetup,
      eventId,
      count,
    );

    if (Array.isArray(winners) && winners.length) {
      if (shouldMock) mocksServer.close();
      return json(
        {
          formData,
          winners,
        },
        {
          headers: {
            'Set-Cookie': userSettings,
          },
        },
      );
    }
  } catch (err) {
    const isError = err instanceof Error;
    if (shouldMock) mocksServer.close();
    return json(
      {
        formData,
        errorMessage: isError ? err.message : 'Sorry, something went wrong.',
      },
      {
        headers: {
          'Set-Cookie': userSettings,
        },
      },
    );
  }

  if (shouldMock) mocksServer.close();
  return json(
    {
      formData,
      errorMessage: 'Sorry, we received unexpected data for that request.',
    },
    {
      headers: {
        'Set-Cookie': userSettings,
      },
    },
  );
}

export default function DrawPage({ onRetry }: { onRetry: () => void }) {
  const data = useLoaderData<typeof loader>();
  const [devSettings] = useDevTools();
  const searchParams = new URLSearchParams({
    meetup: data.formData.meetup,
    count: data.formData.count,
    ...(devSettings?.mock && { mock: 'true' }),
  });

  if (useTransition().state === 'loading') return <LoadingSpinner />;

  return (
    <div className="mt-4 sm:mt-8">
      {'winners' in data ? (
        <Winners winners={data.winners} />
      ) : 'errorMessage' in data ? (
        <ErrorMessage problemText={data.errorMessage} />
      ) : null}
      <div className="my-8 flex flex-shrink-0 flex-wrap justify-around">
        <Link
          to=".."
          className="mb-4 w-full border border-solid border-current bg-white py-4 px-16 text-center font-bold shadow-lg hover:bg-gray-300 focus:bg-gray-300 sm:mb-0 sm:w-64 sm:text-xl"
        >
          Start Over
        </Link>
        <Link
          to={`.?${searchParams.toString()}`}
          className="w-full border border-solid border-current bg-white py-4 px-16 text-center font-bold shadow-lg hover:bg-gray-300 focus:bg-gray-300 sm:w-64 sm:text-xl"
        >
          Draw Again
        </Link>
      </div>
    </div>
  );
}
