import React, { Component } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import { Loading, RaffleForm, Results } from '.';

export class RaffleContainer extends Component {
  // eslint-disable-next-line react/sort-comp
  initialState = {
    error: '',
    winners: [],
    meetupApiKey: '',
  };

  state = this.initialState;

  componentDidMount() {
    this.setState({
      meetupApiKey: this.getMeetupApiKey() || '',
    });
  }

  resetState = () => {
    this.setState({
      ...this.initialState,
      meetupApiKey: this.state.meetupApiKey, // preserve
    });
  };

  getMeetupApiKey = () => {
    if (global.window.localStorage) {
      return global.window.localStorage.getItem('meetupApiKey');
    }
    return undefined;
  };

  storeMeetupApiKey = meetupApiKey => {
    if (global.window.localStorage) {
      global.window.localStorage.setItem('meetupApiKey', meetupApiKey);
    }
  };

  render() {
    return (
      <section className="ph3 pv3 pv4-ns mw6-m mw7-l center-ns">
        <Formik
          enableReinitialize
          initialValues={{
            meetup: 'frontend-devs',
            count: 2,
            specificEventId: '',
            meetupApiKey: this.state.meetupApiKey,
          }}
          onSubmit={async (
            { meetup, count, specificEventId, meetupApiKey },
            { setSubmitting },
          ) => {
            setSubmitting(true);
            this.storeMeetupApiKey(meetupApiKey);
            try {
              const response = await axios.get(
                'https://wkovacs64.lib.id/meetup-raffle/',
                {
                  params: {
                    meetup,
                    count,
                    specificEventId,
                    meetupApiKey,
                  },
                },
              );
              if (response.data && response.data.winners) {
                this.setState({ winners: response.data.winners });
              } else {
                throw new Error('Malformed response received.');
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
                  <Loading className="h5 w5 dark-blue" />
                </div>
              );
            }
            if (this.state.error || this.state.winners.length) {
              return (
                <Results
                  onReset={this.resetState}
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
