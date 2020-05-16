import React from 'react';
import fetch from 'unfetch';
import get from 'lodash/get';
import { RingLoader } from 'react-spinners';
import { Formik } from 'formik';
import { restore, preserve } from '../persistence';
import ErrorMessage from './ErrorMessage';
import RaffleForm from './RaffleForm';
import ResetButtons from './ResetButtons';
import Results from './Results';

const initialFormValues = {
  meetup: '',
  count: '1',
};

const initialResults = {
  error: '',
  winners: [],
};

const RaffleContainer = () => {
  const [count, setCount] = React.useState(initialFormValues.count);
  const [meetup, setMeetup] = React.useState(initialFormValues.meetup);
  const [error, setError] = React.useState(initialResults.error);
  const [winners, setWinners] = React.useState(initialResults.winners);

  const restoreSettings = () => {
    const storedMeetup = restore('meetup');
    if (storedMeetup) {
      setMeetup(storedMeetup);
    }

    const storedCount = restore('count');
    if (storedCount) {
      setCount(storedCount);
    }
  };

  React.useEffect(() => {
    restoreSettings();
  }, []);

  const reset = () => {
    restoreSettings();
    setError(initialResults.error);
    setWinners(initialResults.winners);
  };

  const handleFormikSubmit = async (
    { meetup: meetupValue, count: countValue },
    { setSubmitting },
  ) => {
    setSubmitting(true);
    preserve({ meetup: meetupValue, count: countValue });
    try {
      const drawUrl = new URL('/.netlify/functions/draw', window.location.href);
      drawUrl.search = new URLSearchParams({
        meetup: meetupValue,
        count: countValue,
      }).toString();

      const res = await fetch(drawUrl);
      const data = await res.json();

      if (!res.ok) throw new Error(get(data, 'error.message', res.statusText));
      if (!data.winners) throw new Error('Malformed response received.');

      // success!
      setWinners(data.winners);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex flex-column flex-grow-1 flex-shrink-0 ph3 w-100 mw6-m mw7-l self-center-ns">
      <Formik
        enableReinitialize
        initialValues={{ meetup, count }}
        onSubmit={handleFormikSubmit}
      >
        {({ handleSubmit, isSubmitting, setFieldValue }) => {
          if (isSubmitting) {
            return (
              <div className="flex flex-grow-1 flex-shrink-0 justify-center items-center items-start-ns mt3 mt4-ns">
                <div className="h4 w4">
                  <RingLoader size={128} color="#00449e" />
                </div>
              </div>
            );
          }
          if (error) {
            return (
              <div className="mt3 mt4-ns">
                <ErrorMessage problemText={error} />
                <ResetButtons onReset={reset} onSubmit={handleSubmit} />
              </div>
            );
          }
          if (winners.length) {
            return (
              <div className="mt3 mt4-ns">
                <Results winners={winners} />
                <ResetButtons onReset={reset} onSubmit={handleSubmit} />
              </div>
            );
          }
          return (
            <RaffleForm
              defaultCount={parseInt(count, 10)}
              setFieldValue={setFieldValue}
            />
          );
        }}
      </Formik>
    </main>
  );
};

RaffleContainer.displayName = 'RaffleContainer';

export default RaffleContainer;
