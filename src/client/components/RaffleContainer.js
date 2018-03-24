import React, { Component, Fragment } from 'react';
import axios from 'axios';
import get from 'lodash.get';
import { RingLoader } from 'react-spinners';
import { Formik } from 'formik';
import { ErrorMessage, RaffleForm, ResetButtons, Results } from '.';

export default class extends Component {
  static displayName = 'RaffleContainer';

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
        process.env.REACT_APP_DRAW_URL || '/.netlify/functions/draw',
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
        <div className="db-ns flex flex-column justify-center content-center vh-75">
          <div className="center h4 w4">
            <RingLoader size={128} color="#00449e" />
          </div>
        </div>
      );
    }
    if (this.state.error) {
      return (
        <Fragment>
          <ErrorMessage
            problemText={this.state.error}
            data-testid="error-message"
          />
          <ResetButtons onReset={this.resetResults} onSubmit={handleSubmit} />
        </Fragment>
      );
    }
    if (this.state.winners.length) {
      return (
        <Fragment>
          <Results winners={this.state.winners} data-testid="results" />
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
