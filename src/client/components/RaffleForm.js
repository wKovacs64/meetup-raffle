import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field, useField } from 'formik';
import CountStepper from './CountStepper';

const RaffleForm = ({ defaultCount, setFieldValue }) => {
  const [countFieldFormikProps] = useField('count');

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
          onFocus={(e) => e.target.select()}
          placeholder="required"
          required
        />
      </div>
      <div className="flex flex-column flex-row-ns items-end-ns justify-around-ns mv4">
        <CountStepper
          className="self-center"
          inputId="count"
          labelText="Number of winners:"
          min={1}
          max={9}
          defaultValue={parseInt(defaultCount, 10)}
          field={countFieldFormikProps}
          form={{ setFieldValue }}
        />
        <div className="mv4 mv0-ns">
          <button
            className="db center-ns w-100 w5-ns f5 f4-ns b input-reset ba near-black b--near-black bg-white hover-bg-moon-gray pointer ph5 pv3 shadow-5"
            type="submit"
          >
            Draw
          </button>
        </div>
      </div>
    </Form>
  );
};

RaffleForm.displayName = 'RaffleForm';

RaffleForm.propTypes = {
  defaultCount: PropTypes.number,
  setFieldValue: PropTypes.func.isRequired,
};

RaffleForm.defaultProps = {
  defaultCount: 1,
};

export default RaffleForm;
