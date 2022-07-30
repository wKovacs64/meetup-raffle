import * as React from 'react';
import { json, type LoaderArgs, type ActionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { z, ZodError } from '~/vendor/zod.server';
import { meetupRandomizer } from '~/vendor/meetup-randomizer.server';
import { mocksServer } from '~/mocks/mocks-server.server';
import { userSettingsCookie, type UserSettings } from '~/core/cookies..server';
import { getEventFromResponseData } from '~/raffle/get-event-from-response-data';
import { getIdFromEvent } from '~/raffle/get-id-from-event';
import RaffleForm from '~/raffle/raffle-form';
import type { UpcomingEvent, Winner } from '~/types';

export const loader = async ({ request }: LoaderArgs) => {
  const userSettings: UserSettings | null = await userSettingsCookie.parse(
    request.headers.get('Cookie'),
  );

  return json({ userSettings });
};

export default function HomePage() {
  const { userSettings } = useLoaderData<typeof loader>();
  const [key, setKey] = React.useState(0);

  const handleReset = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <RaffleForm key={key} onReset={handleReset} userSettings={userSettings} />
  );
}

export async function action({ request }: ActionArgs) {
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
    mock: z.union([z.literal('true'), z.literal('')]),
  });

  let userSettings = request.headers.get('Cookie') ?? '';

  let formData;
  let meetup;
  let count;
  let shouldMock;

  try {
    formData = Object.fromEntries(await request.formData());
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
