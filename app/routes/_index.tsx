import { useNavigation } from 'react-router';
import { userSettingsCookie, type UserSettings } from '~/core/cookies.server';
import { LoadingSpinner } from '~/raffle/loading-spinner';
import RaffleForm from '~/raffle/raffle-form';
import type { Route } from './+types/_index';

export async function loader({ request }: Route.LoaderArgs) {
  const userSettings = (await userSettingsCookie.parse(
    request.headers.get('Cookie'),
  )) as UserSettings | null;

  return { userSettings };
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { userSettings } = loaderData;
  const navigation = useNavigation();

  if (navigation.state === 'loading' || navigation.state === 'submitting') {
    return <LoadingSpinner />;
  }

  return (
    <RaffleForm
      defaultMeetup={userSettings?.meetup ?? ''}
      defaultCount={String(userSettings?.count ?? 1)}
    />
  );
}
