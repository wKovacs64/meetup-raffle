import React, { Component } from 'react';
import { Formik } from 'formik';
import { Loading, RaffleForm, Results } from '.';

export class RaffleContainer extends Component {
  // eslint-disable-next-line react/sort-comp
  initialState = {
    error: '',
    winners: [],
  };

  state = this.initialState;

  render() {
    return (
      <section className="ph3 pv3 pv4-ns mw6-m mw7-l center-ns">
        <Formik
          initialValues={{
            meetup: 'frontend-devs',
            count: 2,
            event: '',
            meetupApiKey: '',
          }}
          onSubmit={async (
            { meetup, count, event, meetupApiKey },
            { setSubmitting },
          ) => {
            setSubmitting(true);
            // lib is coming from UMD in /static until StdLib's lib-js is on NPM
            try {
              const results = await global.window.lib.wKovacs64[
                'meetup-raffle'
              ]({
                meetup,
                count,
                event,
                meetupApiKey,
              });
              if (results.winners) {
                this.setState({ winners: results.winners });
              } else {
                throw new Error('Malformed results received.');
              }
            } catch (err) {
              this.setState({ error: err.message });
            }
            setSubmitting(false);
          }}
          render={({ handleSubmit, isSubmitting }) => {
            if (isSubmitting) {
              return (
                <div className="tc">
                  <Loading className="h5 w5" />
                </div>
              );
            }
            if (this.state.error || this.state.winners.length) {
              return (
                <Results
                  onReset={() => {
                    this.setState(this.initialState);
                  }}
                  onSubmit={handleSubmit}
                  {...this.state}
                />
              );
            }
            return <RaffleForm />;
          }}
        />
      </section>
    );
  }
}

export default RaffleContainer;
