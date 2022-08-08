import { json, type LoaderArgs } from '@remix-run/node';
import { useLoaderData, useTransition } from '@remix-run/react';
import { userSettingsCookie, type UserSettings } from '~/core/cookies.server';
import LoadingSpinner from '~/raffle/loading-spinner';
import RaffleForm from '~/raffle/raffle-form';

export const loader = async ({ request }: LoaderArgs) => {
  const userSettings: UserSettings | null = await userSettingsCookie.parse(
    request.headers.get('Cookie'),
  );

  return json({ userSettings });
};

export default function HomePage() {
  const { userSettings } = useLoaderData<typeof loader>();
  const transition = useTransition();

  if (transition.state === 'loading' || transition.state === 'submitting') {
    return <LoadingSpinner />;
  }

  return (
    <RaffleForm
      defaultMeetup={userSettings?.meetup ?? ''}
      defaultCount={userSettings?.count ?? '1'}
    />
  );
}
