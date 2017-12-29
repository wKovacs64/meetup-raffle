import React, { Fragment } from 'react';

export default props => (
  <Fragment>
    <img {...props} src="/static/loading.svg" alt="Loading" />
    <style jsx>
      {`
        animation: loading infinite 3s linear;
        @keyframes loading {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}
    </style>
  </Fragment>
);
