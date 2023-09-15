import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useNavigation } from '@remix-run/react';
import { userSettingsCookie, type UserSettings } from '~/core/cookies.server';
import LoadingSpinner from '~/raffle/loading-spinner';
import RaffleForm from '~/raffle/raffle-form';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userSettings: UserSettings | null = await userSettingsCookie.parse(
    request.headers.get('Cookie'),
  );

  return json({ userSettings });
};

export default function HomePage() {
  const { userSettings } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  if (navigation.state === 'loading' || navigation.state === 'submitting') {
    return <LoadingSpinner />;
  }

  return (
    <RaffleForm
      defaultMeetup={userSettings?.meetup ?? ''}
      defaultCount={userSettings?.count ?? '1'}
    />
  );
}
