import React, { Component, Fragment } from 'react';
import axios from 'axios';
import get from 'lodash.get';
import { Formik } from 'formik';
import { ErrorMessage, Loading, RaffleForm, ResetButtons, Results } from '.';

export class RaffleContainer extends Component {
  // eslint-disable-next-line react/sort-comp
  initialResults = {
    error: '',
    winners: [],
  };

  initialFormValues = {
    meetup: '',
    count: 1,
    specificEventId: '',
    meetupApiKey: '',
  };

  state = {
    ...this.initialResults,
    ...this.initialFormValues,
  };

  componentDidMount() {
    const meetup = this.restore('meetup');
    const count = this.restore('count');
    const meetupApiKey = this.restore('meetupApiKey');

    this.setState({
      ...(meetup && { meetup }),
      ...(count && { count }),
      ...(meetupApiKey && { meetupApiKey }),
    });
  }

  resetResults = () => {
    this.setState(this.initialResults);
  };

  restore = key => {
    if (global.window.localStorage) {
      return global.window.localStorage.getItem(key);
    }
    return undefined;
  };

  preserve = data => {
    if (global.window.localStorage) {
      Object.entries(data).forEach(([key, value]) => {
        global.window.localStorage.setItem(key, value);
      });
    }
  };

  handleApiError = err => {
    const error = get(err, 'response.data.error.message', err.message);
    this.setState({ error });
  };

  handleFormikSubmit = async (
    { meetup, count, specificEventId, meetupApiKey },
    { setSubmitting },
  ) => {
    setSubmitting(true);
    this.preserve({
      meetup,
      count,
      meetupApiKey,
    });
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
      const winners = get(response, 'data.winners');
      if (winners) {
        this.setState({ winners });
      } else {
        throw new Error('Malformed response received.');
      }
    } catch (err) {
      this.handleApiError(err);
    }
    setSubmitting(false);
  };

  renderFormik = ({ handleSubmit, isSubmitting }) => {
    if (isSubmitting) {
      return (
        <div className="tc">
          <Loading className="h5 w5 dark-blue" />
        </div>
      );
    }
    if (this.state.error) {
      return (
        <Fragment>
          <ErrorMessage problemText={this.state.error} />
          <ResetButtons onReset={this.resetResults} onSubmit={handleSubmit} />
        </Fragment>
      );
    }
    if (this.state.winners.length) {
      return (
        <Fragment>
          <Results winners={this.state.winners} />
          <ResetButtons onReset={this.resetResults} onSubmit={handleSubmit} />
        </Fragment>
      );
    }
    return <RaffleForm />;
  };

  render() {
    return (
      <main className="ph3 pv3 pv4-ns mw6-m mw7-l center-ns">
        <Formik
          enableReinitialize
          initialValues={{
            meetup: this.state.meetup,
            count: this.state.count,
            specificEventId: this.initialFormValues.specificEventId,
            meetupApiKey: this.state.meetupApiKey,
          }}
          onSubmit={this.handleFormikSubmit}
          render={this.renderFormik}
        />
      </main>
    );
  }
}

export default RaffleContainer;
