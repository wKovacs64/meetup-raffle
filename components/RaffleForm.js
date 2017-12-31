import React from 'react';
import { Form, Field } from 'formik';
import { CountStepper } from '.';

export default () => (
  <Form>
    <div>
      <label className="f4 f3-ns lh-copy dark-blue" htmlFor="meetup">
        Meetup name (from your URL):
      </label>
      <Field
        className="input-reset f4 f3-ns near-black ba bw3 b--moon-gray mt3 pa2 w-100"
        type="text"
        id="meetup"
        name="meetup"
        onFocus={e => e.target.select()}
        placeholder="required"
        required
      />
    </div>
    <div className="mv4">
      <label className="f4 f3-ns lh-copy dark-blue" htmlFor="count">
        Number of winners:
      </label>
      <Field
        name="count"
        render={formikProps => (
          <div className="mt3">
            <CountStepper inputId="count" {...formikProps} />
          </div>
        )}
      />
    </div>
    <div className="mv4">
      <details>
        <summary className="pointer">Advanced Options</summary>
        <div className="mt3">
          <label
            className="f6 f5-ns lh-copy dark-blue"
            htmlFor="specificEventId"
          >
            Specific event ID{' '}
            <em>(defaults to soonest upcoming/in-progress event)</em>:
          </label>
          <Field
            className="input-reset f6 f5-ns near-black ba bw1 b--moon-gray mt3 pa2 w-100"
            type="text"
            id="specificEventId"
            name="specificEventId"
            onFocus={e => e.target.select()}
            placeholder="optional"
          />
        </div>
        <div className="mt3">
          <label className="f6 f5-ns lh-copy dark-blue" htmlFor="meetupApiKey">
            <a
              href="https://secure.meetup.com/meetup_api/key/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Meetup API key
            </a>{' '}
            <em>(enables full names of winners)</em>:
          </label>
          <Field
            className="input-reset f6 f5-ns near-black ba bw1 b--moon-gray mt3 pa2 w-100"
            type="text"
            id="meetupApiKey"
            name="meetupApiKey"
            onFocus={e => e.target.select()}
            placeholder="optional"
          />
        </div>
      </details>
    </div>
    <button
      className="db center-ns w-100 w5-ns f5 f4-ns b input-reset ba near-black b--near-black bg-transparent hover-bg-moon-gray pointer ph5 pv3 shadow-5"
      type="submit"
    >
      Draw
    </button>
  </Form>
);
