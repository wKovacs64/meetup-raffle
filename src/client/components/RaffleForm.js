import React, { Component } from 'react';
import Collapse from 'react-css-collapse';
import { Form, Field } from 'formik';
import { CountStepper } from '.';

export default class extends Component {
  static displayName = 'RaffleForm';

  state = {
    advancedOpen: false,
  };

  render() {
    return (
      <Form>
        <div className="mt3 mb4 mv4-ns">
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
          <Field
            name="count"
            render={formikProps => (
              <CountStepper
                inputId="count"
                labelText="Number of winners:"
                min={1}
                max={9}
                {...formikProps}
              />
            )}
          />
        </div>
        <div className="mv4">
          <button
            type="button"
            className="link bn bg-transparent pa0 pointer near-black"
            onClick={() =>
              this.setState({ advancedOpen: !this.state.advancedOpen })
            }
            data-testid="advanced-button"
          >
            <span
              className="dib w1"
              role="img"
              aria-label="toggle advanced options"
              data-testid="advanced-button-icon"
            >
              {this.state.advancedOpen ? '▼' : '▶'}
            </span>
            <span className="ph2">Advanced Options</span>
          </button>
          <Collapse isOpen={this.state.advancedOpen}>
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
              <label
                className="f6 f5-ns lh-copy dark-blue"
                htmlFor="meetupApiKey"
              >
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
          </Collapse>
        </div>
        <div className="mv4">
          <button
            className="db center-ns w-100 w5-ns f5 f4-ns b input-reset ba near-black b--near-black bg-white hover-bg-moon-gray pointer ph5 pv3 shadow-5"
            type="submit"
          >
            Draw
          </button>
        </div>
      </Form>
    );
  }
}
