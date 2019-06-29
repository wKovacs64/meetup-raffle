import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'formik';
import CountStepper from './CountStepper';

const RaffleForm = ({ defaultCount }) => (
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
            defaultValue={parseInt(defaultCount, 10)}
            {...formikProps}
          />
        )}
      />
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

RaffleForm.displayName = 'RaffleForm';

RaffleForm.propTypes = {
  defaultCount: PropTypes.number,
};

RaffleForm.defaultProps = {
  defaultCount: 1,
};

export default RaffleForm;
