import React from 'react';
import axios from 'axios';
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

  const handleApiError = (err) => {
    setError(get(err, 'response.data.error.message', err.message));
  };

  const handleFormikSubmit = async (
    { meetup: meetupValue, count: countValue },
    { setSubmitting },
  ) => {
    setSubmitting(true);
    preserve({ meetup: meetupValue, count: countValue });
    try {
      const response = await axios.get('/.netlify/functions/draw', {
        params: { meetup: meetupValue, count: countValue },
      });
      const winnersData = get(response, 'data.winners');
      if (winnersData) {
        setWinners(winnersData);
      } else {
        throw new Error('Malformed response received.');
      }
    } catch (err) {
      handleApiError(err);
    }
    setSubmitting(false);
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
                <ErrorMessage problemText={error} data-testid="error-message" />
                <ResetButtons onReset={reset} onSubmit={handleSubmit} />
              </div>
            );
          }
          if (winners.length) {
            return (
              <div className="mt3 mt4-ns">
                <Results winners={winners} data-testid="results" />
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
