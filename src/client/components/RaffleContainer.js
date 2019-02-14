import React, { Component } from 'react';
import axios from 'axios';
import get from 'lodash/get';
import { RingLoader } from 'react-spinners';
import { Formik } from 'formik';
import ErrorMessage from './ErrorMessage';
import RaffleForm from './RaffleForm';
import ResetButtons from './ResetButtons';
import Results from './Results';

export default class extends Component {
  static displayName = 'RaffleContainer';

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
      const response = await axios.get('/.netlify/functions/draw', {
        params: {
          meetup,
          count,
          specificEventId,
          meetupApiKey,
        },
      });
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
        <div className="flex flex-grow-1 flex-shrink-0 justify-center items-center items-start-ns mt3 mt4-ns">
          <div className="h4 w4">
            <RingLoader size={128} color="#00449e" />
          </div>
        </div>
      );
    }
    if (this.state.error) {
      return (
        <div className="mt3 mt4-ns">
          <ErrorMessage
            problemText={this.state.error}
            data-testid="error-message"
          />
          <ResetButtons onReset={this.resetResults} onSubmit={handleSubmit} />
        </div>
      );
    }
    if (this.state.winners.length) {
      return (
        <div className="mt3 mt4-ns">
          <Results winners={this.state.winners} data-testid="results" />
          <ResetButtons onReset={this.resetResults} onSubmit={handleSubmit} />
        </div>
      );
    }
    return <RaffleForm />;
  };

  render() {
    return (
      <main className="flex flex-column flex-grow-1 flex-shrink-0 ph3 w-100 mw6-m mw7-l self-center-ns">
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
