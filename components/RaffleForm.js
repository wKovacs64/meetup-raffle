import React from 'react';
import { Formik, Form, Field } from 'formik';
import CountStepper from './CountStepper';

const RaffleFormComponent = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <Form>
    <div>
      <label className="db lh-copy f3 dark-blue" htmlFor="meetup">
        Meetup name (from your URL):
      </label>
      <Field
        className="input-reset f3 ba bw3 pa2 w-third"
        name="meetup"
        placeholder="required"
      />
    </div>
    <div className="mv4">
      <label className="lh-copy f3 dark-blue" htmlFor="count">
        Number of winners:
      </label>
      <Field name="count" component={CountStepper} />
    </div>
    <div>
      <button
        className="dib b input-reset ba near-black b--near-black bg-transparent hover-gray hover-b--gray pointer mv3 ph4 pv3 f4"
        type="submit"
        disabled={isSubmitting}
      >
        Draw
        <style jsx>
          {`
            .hover-b--gray:hover,
            .hover-b--gray:focus {
              border-color: #777;
            }
          `}
        </style>
      </button>
    </div>
  </Form>
);

export default props => (
  <section {...props}>
    <Formik
      component={RaffleFormComponent}
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
        // lib is coming from UMD in /static until lib-js is available on NPM
        // const results = await global.window.lib.wKovacs64['meetup-raffle']({
        //   meetup,
        //   count,
        //   event,
        //   meetupApiKey,
        // });
        // global.window.alert(JSON.stringify(results, null, 2));
        setSubmitting(false);
      }}
    />
  </section>
);
